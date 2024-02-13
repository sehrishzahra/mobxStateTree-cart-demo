import React, { useState } from 'react'
import { todos } from '../mst/todos'
import { observer } from 'mobx-react-lite'
import { TiTick } from "react-icons/ti";

function Home() {
    const [task, setTask] = useState<string>('')
    const [id, setId] = useState<number>(0)
    const [note, setNote] = useState<String>('')
    const addTask = () => {
        if (task) {
            setId(id + 1)
            const obj = {
                id: id,
                task: task,
                status: false
            }
            todos.setTask(obj)
            setTask('')
            setNote('')
        } else {
            setNote('Enter something First')
        }
    }

    const deleteTask = (id: number) => {
        console.log(id)
        todos.delTask(id)
    }

    const completeTask = (id: number) => {
        todos.ComTask(id)
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <h2 className='mt-5 p-5 text-lg font-semibold'>My Todo List</h2>
            <div className="flex gap-3 mb-5 items-center">
                <input className='pl-2 border-gray-500 border h-10 outline-none rounded-lg' placeholder='Write...' type="text" value={task} onChange={(e) => setTask(e.target.value)} />
                <button className='bg-blue-500 text-white p-2 rounded-md hover:opacity-75' onClick={() => addTask()}>Add</button>
                {note && <p className='text-red-700 text-md'>**{note}**</p>}
            </div>
            <div className="flex flex-col">
                <div className="flex items-start gap-10 font-semibold border-b border-b-1 border-gray-800 pb-3">
                    <h3 className=''> Sr</h3>
                    <h3 className='mr-28'>Task</h3>
                    <h3>Status</h3>
                    <h3></h3>
                </div>
                {todos.allTodos.map((todo, index) => (
                    <div className="mt-3 flex p-2 gap-12 items-center border-b-1 h-10 w-full" key={todo.id}>
                        <p className='font-semibold '>{index + 1}</p>
                        <p className='w-28'>{todo.task}</p>
                        <div className="">
                            {todo.status ? <p className='text-blue-700 text-2xl border border-gray-200'><TiTick /></p> : <p>Incomplete</p>}
                        </div>

                        <div className="flex gap-2 ">
                            <p><button className=' rounded-lg bg-red-600 text-white p-2 hover:opacity-75' onClick={() => deleteTask(todo.id)}>Delete</button></p>
                            <p><button className=' rounded-lg bg-green-600 text-white p-2 hover:opacity-75' onClick={() => completeTask(todo.id)} >Mark as Complete</button></p>
                        </div>
                    </div>
                ))}
                {todos.allTodos.length < 1 && <p className='text-center p-10'>No Tasks</p>}

            </div>
        </div>
    )
}

export default observer(Home)