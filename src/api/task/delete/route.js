// app/api/task/delete/route.js
import prisma from '@/lib/db'

export async function DELETE(req) {
  const { id } = await req.json()

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 })
  }

  try {
    await prisma.task.delete({ where: { id } })
    return new Response(null, { status: 204 })
  } catch (err) {
    return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 })
  }
}
