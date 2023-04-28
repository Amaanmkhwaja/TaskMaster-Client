import React, { useState } from 'react'
import { useTasksContext } from '../hooks/useTasksContext'

const EditTaskForm = ({ task, onClose }) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [completed, setCompleted] = useState(task.completed)
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useTasksContext()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // localhost
      // const response = await fetch(`/api/tasks/${task._id}`, {
      // deployed
      const response = await fetch(`https://taskmaster-server.herokuapp.com/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          completed
        })
      })

      const updatedTask = await response.json()

      if (response.ok) {
        dispatch({ type: 'EDIT_TASK', payload: updatedTask })
        onClose()
      } else {
        throw new Error("Couldn't update task")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='absolute top-0 -left-80 bg-white p-5 rounded shadow-md' onSubmit={handleSubmit}>
      <h3 className="text-black font-bold text-xl mb-2">Edit Task</h3>
      <label className=' text-black block'>Task Title:</label>
      <input className="text-black block box-border p-2.5 mt-2.5 mb-5 w-full h-7 rounded border border-black" type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
      />


      <label className=' text-black block'>Task Description:</label>
      <input className="text-black block box-border p-2.5 mt-2.5 mb-5 w-full h-7 rounded border border-black" type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
      />


      <div className="flex items-center mb-5">
          <label className="text-black block w-36">Task Completed:</label>
          <input type="checkbox" checked={completed} 
              onChange={(e) => setCompleted(e.target.checked)}
              value={completed}
          />
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-[#1aac83] text-white px-4 py-2 rounded mr-2 cursor-pointer'
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
        <button
          type='button'
          className='bg-gray-500 text-white px-4 py-2 rounded cursor-pointer'
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditTaskForm