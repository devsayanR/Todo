import React, { useEffect, useState } from 'react'
import { useTodo } from '../context';
import { FaRegSave, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";

const TodoItem = ({ todo }) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    useEffect(() => {
        let timer;
        if (todo.complete) {
            timer = setTimeout(() => {
                deleteTodo(todo.id);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [todo.complete, deleteTodo, todo.id]);

    return (
        <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 duration-300 text-white ${todo.complete ? "bg-[#c6e9a7]" : "bg-yellow-800"}`} >
            <div className='flex items-center justify-center'>
                <input
                    type="checkbox"
                    className="cursor-pointer border-none outline-none toggle toggle-xs sm:toggle-sm"
                    checked={todo.complete}
                    onChange={toggleCompleted}
                />
            </div>

            <input
                type="text"
                autoFocus={true}
                className={`border-none outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 pr-8" : "border-transparent"
                    } ${todo.complete ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-md justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:hidden text-black border-none outline-none"
                onClick={() => {
                    if (todo.complete) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.complete}
            > {isTodoEditable ? <FaRegSave /> : <FaEdit />} </button>

            {/* Delete Todo Button */}
            {
                todo.complete ? (
                    <button
                        disabled={true}
                        title='It will be deleted automatically after 5 minutes'
                        className="inline-flex w-8 h-8 text-black rounded-lg text-lg border-none outline-none justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                        onClick={() => deleteTodo(todo.id)}
                    > <MdAutoDelete /> </button>
                ) : (
                    <button
                        className="inline-flex w-8 h-8 text-black rounded-lg text-lg border-none outline-none justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                        onClick={() => deleteTodo(todo.id)}
                    > <MdDelete /> </button>
                )
            }
        </div >
    );
}

export default TodoItem