import React from 'react'
import { useState, useEffect} from 'react'
import { useTasksContext } from "../hooks/useTasksContext";

// components
import TaskDetails from '../components/taskDetails'
import TaskForm from '../components/TaskForm'

function Home() {

  const [loading, setLoading] = useState(true);
  const { tasks, dispatch } = useTasksContext()

  useEffect(() => {

    const getUser = JSON.parse(localStorage.getItem("user"));
    const {uid} = getUser

    const fetchTasks = async () => {
      try {
        // localhost
        // const response = await fetch(`/api/tasks/${uid}`)
        // deployed
        const response = await fetch(`https://taskmaster-server.herokuapp.com/api/tasks/${uid}`)
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_TASKS', payload: json });
          setLoading(false);
        } else {
          throw new Error('Failed to fetch tasks');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [dispatch]);

  return (
    <div className='grid grid-cols-3fr-1fr gap-24 mt-8'>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <div className='tasks'>
            {tasks && tasks.map((task) => (
              <TaskDetails key={task._id} task={task} />
            ))}
          </div>
          <TaskForm/>
        </>
      )}
    </div>
  )
}

export default Home