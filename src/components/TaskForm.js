import React from 'react'
import { useState } from 'react'
import { useTasksContext } from "../hooks/useTasksContext";

function TaskForm() {

    const {dispatch} = useTasksContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = {title, description, completed}

        // localhost
        // const response = await fetch('/api/tasks', {
        // Heroku
        const response = await fetch('https://taskmaster-server.herokuapp.com/api/tasks', {
            method: 'POST', 
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.OK) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setCompleted(false)
            setError(null)
            console.log(`new task added ${json}`)
            dispatch({type: "CREATE_TASK", payload: json})
        }
    }

    return (
        <form className="fixed top-36 right-1/4 bg-white shadow-md rounded px-8 mt-1 pt-6 pb-6" onSubmit={handleSubmit}>
            <h3 className="text-black font-bold text-xl mb-2">Add a New Task</h3>

            <label className=' text-black block'>Task Title:</label>
            <input className="text-black block box-border p-2.5 mt-2.5 mb-5 w-full h-7 rounded border border-black" type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />

            <label className='text-black block'>Task Description:</label>
            <input className="text-black block box-border p-2.5 mt-2.5 mb-5 w-full h-7 rounded border border-black" type="text" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            />

            <div className="flex items-center mb-5">
                <label className="text-black block w-36">Task Completed:</label>
                <input type="checkbox" checked={completed} 
                onChange={(e) => setCompleted(e.target.checked)}
                value={completed}
                />
            </div>

            <button className='bg-[#1aac83] text-[#fff] border-0 p-2.5 rounded cursor-pointer'>Add Task</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default TaskForm