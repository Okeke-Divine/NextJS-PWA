import prisma from '@/lib/db'

export async function POST(req) {
  const { task } = await req.json()
  if (!task) return new Response("Task is required", { status: 400 })

  const newTask = await prisma.task.create({ data: { task } })

  return Response.json(newTask, { status: 201 })
}
