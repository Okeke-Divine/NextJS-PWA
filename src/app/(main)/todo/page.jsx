"use client"

import { useState, useRef, useEffect } from "react"
import PageLayout from "@/components/shared/page-layout"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ConfirmDialog from "@/components/my-app/confirm-dialogue"
import SubmitButton from "@/components/my-app/submit-button"
import { Trash } from "lucide-react"

export default function Todo() {
  const [tasks, setTasks] = useState([])
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [loadingDeleteId, setLoadingDeleteId] = useState(null)
  const inputRef = useRef(null)

  // Fetch tasks
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

    setLoadingAdd(true)
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
    setLoadingAdd(false)
  }

  // Delete task
  const handleDelete = async (id) => {
    setLoadingDeleteId(id)

    const res = await fetch("/api/task/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })

    if (res.ok) {
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } else {
      console.error("Failed to delete task")
    }

    setLoadingDeleteId(null)
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
        <SubmitButton isLoading={loadingAdd}>Add</SubmitButton>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full font-semibold">Task</TableHead>
            <TableHead className="w-10 text-right font-semibold">[Action]</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(({ id, task }) => (
            <TableRow key={id}>
              <TableCell>{task}</TableCell>
              <TableCell className="text-right">
                <ConfirmDialog
                  title="Delete Task"
                  description={`Are you sure you want to delete "${task}"?`}
                  confirmText="Delete"
                  cancelText="Cancel"
                  onConfirm={() => handleDelete(id)}
                  trigger={
                    <SubmitButton
                      isLoading={loadingDeleteId === id}
                      variant="ghost"
                      size="icon"
                      icon={<Trash className="h-4 w-4" />}
                    />
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  )
}
