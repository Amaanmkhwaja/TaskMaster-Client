import React from 'react'
import { useState } from 'react'

function TaskForm() {

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
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Task</h3>

            <label>Task Title:</label>
            <input type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />

            <label>Task Description:</label>
            <input type="text" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            />

            <div className="task-completed">
                <label>Task Completed:</label>
                <input type="checkbox" checked={completed} 
                onChange={(e) => setCompleted(e.target.checked)}
                value={completed}
                />
            </div>

            <button>Add Task</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default TaskForm