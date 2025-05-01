"use client"

import { useState, useRef, useEffect } from "react"
import PageLayout from "@/components/shared/page-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash } from "lucide-react"

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
    <PageLayout title="Todo">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Add new task"
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full uppercase font-semibold">Task</TableHead>
            <TableHead className="w-10 text-right uppercase font-semibold">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(({ id, task }) => (
            <TableRow key={id}>
              <TableCell>{task}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(id)}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  )
}
