import React, { useState } from 'react'
import { useTodo } from '../context'

const TodoForm = () => {

    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if (!todo) return

        addTodo({ todo, complete: false })
        setTodo("")
    }

    return (
        <form className="flex" onSubmit={add}>
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full group ring-1 ring-white/20 focus:ring-green-500 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 ring-1 ring-green-500">
                Add
            </button>
        </form>
    )
}

export default TodoForm