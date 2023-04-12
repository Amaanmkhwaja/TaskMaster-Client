import React, { useState } from 'react';
import { useTasksContext } from "../hooks/useTasksContext";

function TaskDetails({task}) {

  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useTasksContext()

  const handleDelete = async (event) => {

    event.preventDefault()
    setIsLoading(true)

    try {
      // localhost
      // const response = await fetch('/api/tasks/' + task._id, {
      //deployed
      const response = await fetch('https://taskmaster-server.herokuapp.com/api/tasks/', {
        method: 'DELETE'
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'DELETE_TASK', payload: json})
      }
      else {
        throw new Error("couldn't delete task")
      }
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='task-details'>
      <h2>{task.title}</h2>
      <p><strong>Description: </strong>{task.description}</p>
      <p><strong>Completed: </strong>{task.completed ? "Yes" : "No"}</p>
      <p>{task.createdAt}</p>
      <form onSubmit={handleDelete}>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </form>
    </div>
  )
}

export default TaskDetails