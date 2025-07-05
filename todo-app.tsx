"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit3, Check, X, Plus } from "lucide-react"

interface Task {
  id: number
  text: string
  completed: boolean
  editing: boolean
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Learn React", completed: true, editing: false },
    { id: 2, text: "Build a todo app", completed: false, editing: false },
    { id: 3, text: "Deploy to production", completed: false, editing: false },
  ])
  const [newTask, setNewTask] = useState("")
  const [editingText, setEditingText] = useState("")

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj: Task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        editing: false,
      }
      setTasks([...tasks, newTaskObj])
      setNewTask("")
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const startEditing = (id: number, currentText: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, editing: true } : task)))
    setEditingText(currentText)
  }

  const saveEdit = (id: number) => {
    if (editingText.trim() !== "") {
      setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editingText.trim(), editing: false } : task)))
      setEditingText("")
    }
  }

  const cancelEdit = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, editing: false } : task)))
    setEditingText("")
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Todo List App</h1>
            <p className="text-gray-600 mt-2">Stay organized and get things done</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">My Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Task */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTask()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={addTask} className="px-4">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">No tasks yet!</p>
                  <p className="text-sm">Add your first task above to get started.</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                      task.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleComplete(task.id)}
                    />

                    <div className="flex-1">
                      {task.editing ? (
                        <div className="flex gap-2">
                          <Input
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                saveEdit(task.id)
                              } else if (e.key === "Escape") {
                                cancelEdit(task.id)
                              }
                            }}
                            className="flex-1"
                            autoFocus
                          />
                          <Button size="sm" onClick={() => saveEdit(task.id)} className="px-2">
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => cancelEdit(task.id)} className="px-2">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`cursor-pointer ${
                            task.completed ? "line-through text-gray-500" : "text-gray-900"
                          }`}
                        >
                          {task.text}
                        </label>
                      )}
                    </div>

                    {!task.editing && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditing(task.id, task.text)}
                          className="px-2 hover:bg-blue-50"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteTask(task.id)}
                          className="px-2 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{completedCount}</span> of <span className="font-medium">{totalCount}</span>{" "}
              tasks completed
            </div>
            <div className="text-sm text-gray-500">Built with React & shadcn/ui</div>
          </div>
          {totalCount > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
