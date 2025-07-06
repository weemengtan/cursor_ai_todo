"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit3, Check, X, Plus, Loader2 } from "lucide-react"
import { useTodos, type Task } from "@/lib/useTodos"
import FirebaseDebug from "@/components/FirebaseDebug"

export default function TodoApp() {
  const {
    tasks,
    loading,
    error,
    addTask,
    deleteTask,
    toggleComplete,
    startEditing,
    saveEdit,
    cancelEdit,
  } = useTodos()

  const [newTask, setNewTask] = useState("")
  const [editingText, setEditingText] = useState("")

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      await addTask(newTask)
      setNewTask("")
    }
  }

  const handleStartEditing = async (task: Task) => {
    await startEditing(task.id)
    setEditingText(task.text)
  }

  const handleSaveEdit = async (id: string) => {
    if (editingText.trim() !== "") {
      await saveEdit(id, editingText)
      setEditingText("")
    }
  }

  const handleCancelEdit = async (id: string) => {
    await cancelEdit(id)
    setEditingText("")
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading your todos...</p>
        </div>
      </div>
    )
  }

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
        {/* Debug Panel - Remove this in production */}
        <FirebaseDebug />
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">My Tasks</CardTitle>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-2">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
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
                    handleAddTask()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleAddTask} className="px-4">
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
                                handleSaveEdit(task.id)
                              } else if (e.key === "Escape") {
                                handleCancelEdit(task.id)
                              }
                            }}
                            className="flex-1"
                            autoFocus
                          />
                          <Button size="sm" onClick={() => handleSaveEdit(task.id)} className="px-2">
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleCancelEdit(task.id)} className="px-2">
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
                          onClick={() => handleStartEditing(task)}
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
            <div className="text-sm text-gray-500">Built with React, Firebase & shadcn/ui</div>
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
