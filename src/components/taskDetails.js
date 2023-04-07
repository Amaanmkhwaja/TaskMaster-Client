import React from 'react'

function TaskDetails({task}) {
  return (
    <div className='task-details'>
        <h2>{task.title}</h2>
        <p><strong>Description: </strong>{task.description}</p>
        <p><strong>Completed: </strong>{task.completed ? "Yes" : "No"}</p>
        <p>{task.createdAt}</p>
    </div>
  )
}

export default TaskDetails