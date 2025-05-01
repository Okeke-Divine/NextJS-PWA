import Link from "next/link"

export default function Home(){
  return (
    <>
    There's nothing here. Navigate to <Link className="text-blue-500 font-bold" href="/todo">Todos</Link> instead.
    </>
  )
}