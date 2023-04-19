import React, { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';

function EditTaskForm({ task, onClose }) {
  const { dispatch } = useTasksContext();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, completed };
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'UPDATE_TASK', payload: data });
      onClose();
    }
  };

  return (
    <div className="edit-task">
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="completed">Completed:</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditTaskForm;