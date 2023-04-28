import React, { useState } from 'react';
import { useTasksContext } from "../hooks/useTasksContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import EditTaskForm from './EditTaskForm';

function TaskDetails({task}) {

  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useTasksContext()
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      // localhost
      // const response = await fetch('/api/tasks/' + task._id, {
      // deployed
      const response = await fetch('https://taskmaster-server.herokuapp.com/api/tasks/' + task._id, {
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

  const handleSave = (updatedTask) => {
    dispatch({type: 'UPDATE_TASK', payload: updatedTask})
    setShowEdit(false);
  }

  return (
    <div className="relative shadow-md w-4/5 right-20 bg-white rounded ml-2 my-5 p-5 z-0">
      <h3 className="mb-2.5 text-xl font-bold">{task.title}</h3>
      <p className="text-[#555] m-0 "><strong>Description: </strong>{task.description}</p>
      <p className='text-[#555]'><strong>Completed: </strong>{task.completed ? "Yes" : "No"}</p>
      <p className='text-[#555]'>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>

      <form className='absolute top-2.5 right-2.5 cursor-pointer p-1.5 rounded text-[#fff]' onSubmit={handleDelete}>
        <button className='bg-[#1aac83] border-0 p-2.5 rounded cursor-pointer' type="submit" disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </form>
      <form className='absolute top-16 right-2.5 cursor-pointer p-1.5 rounded text-[#fff]' >
        <button className='bg-[#1aac83] border-0 p-2.5 rounded cursor-pointer' 
          onClick={(event) => {
            event.preventDefault();
            setShowEdit(true)}}>Edit
        </button>
      </form>
      {showEdit && <EditTaskForm className="z-10" task={task} onSave={handleSave} onClose={() => setShowEdit(false)} />}
    </div>
  )
}

export default TaskDetails;
