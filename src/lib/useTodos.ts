import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  editing: boolean;
  createdAt: Date;
}

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to real-time updates
  useEffect(() => {
    console.log('🔄 Setting up Firestore listener...');
    
    try {
      const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
      
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          console.log('📡 Firestore update received:', querySnapshot.size, 'documents');
          const todos: Task[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            todos.push({
              id: doc.id,
              text: data.text,
              completed: data.completed,
              editing: data.editing || false,
              createdAt: data.createdAt?.toDate() || new Date(),
            });
          });
          setTasks(todos);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('❌ Error fetching todos:', err);
          setError(`Failed to load todos: ${err.message}`);
          setLoading(false);
        }
      );

      return () => {
        console.log('🔄 Cleaning up Firestore listener...');
        unsubscribe();
      };
    } catch (err) {
      console.error('❌ Error setting up Firestore listener:', err);
      setError(`Failed to connect to database: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }, []);

  const addTask = async (text: string) => {
    try {
      console.log('➕ Adding task:', text);
      setError(null);
      
      const docRef = await addDoc(collection(db, 'todos'), {
        text: text.trim(),
        completed: false,
        editing: false,
        createdAt: new Date(),
      });
      
      console.log('✅ Task added successfully with ID:', docRef.id);
    } catch (err) {
      console.error('❌ Error adding todo:', err);
      setError(`Failed to add todo: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      console.log('✏️ Updating task:', id, updates);
      setError(null);
      const taskRef = doc(db, 'todos', id);
      await updateDoc(taskRef, updates);
      console.log('✅ Task updated successfully');
    } catch (err) {
      console.error('❌ Error updating todo:', err);
      setError(`Failed to update todo: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      console.log('🗑️ Deleting task:', id);
      setError(null);
      const taskRef = doc(db, 'todos', id);
      await deleteDoc(taskRef);
      console.log('✅ Task deleted successfully');
    } catch (err) {
      console.error('❌ Error deleting todo:', err);
      setError(`Failed to delete todo: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const toggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  const startEditing = async (id: string) => {
    await updateTask(id, { editing: true });
  };

  const saveEdit = async (id: string, text: string) => {
    if (text.trim() !== '') {
      await updateTask(id, { text: text.trim(), editing: false });
    }
  };

  const cancelEdit = async (id: string) => {
    await updateTask(id, { editing: false });
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    startEditing,
    saveEdit,
    cancelEdit,
  };
} 