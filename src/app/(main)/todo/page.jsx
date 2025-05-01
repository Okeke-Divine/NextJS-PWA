"use client"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

export default function Todo() {
  const [tasks, setTasks] = useState([])
  const inputRef = useRef(null)

  // Fetch tasks on mount
  useEffect(() => {
    fetch(`/api/task/all`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to load tasks:", err))
  }, [])

  // Add task
  const handleSubmit = async (e) => {
    e.preventDefault()
    const value = inputRef.current?.value.trim()
    if (!value) return

    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify({ task: value }),
    })

    if (res.ok) {
      const newTask = await res.json()
      setTasks((prev) => [newTask, ...prev])
      inputRef.current.value = ""
    } else {
      console.error("Task creation failed")
    }
  }

  // Delete task
  const handleDelete = async (id) => {
    const res = await fetch("/api/task/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })

    if (res.ok) {
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } else {
      console.error("Failed to delete task")
    }
  }

  return (
    <>
      <div className="px-10 py-16">
        <form className="form-control flex gap-2" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="input border p-2 rounded"
            placeholder="Add new task"
          />
          <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>

        <ul className="mt-8 space-y-4">
          {tasks.map(({ id, task }) => (
            <li key={id} className="flex justify-between items-center border-b pb-2">
              <span>{task}</span>
              <button
                onClick={() => handleDelete(id)}
                className="btn bg-red-500 text-white px-4 py-1 rounded ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
