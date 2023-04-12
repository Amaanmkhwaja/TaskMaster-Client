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
    const fetchTasks = async () => {
      try {
        // localhost
        const response = await fetch('/api/tasks')
        // deployed
        // const response = await fetch('https://taskmaster-server.herokuapp.com/api/tasks')
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
    <div className='home'>
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