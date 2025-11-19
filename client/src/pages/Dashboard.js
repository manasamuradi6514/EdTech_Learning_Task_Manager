import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    userId: user?.id,
  });

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch {
      alert("Error fetching tasks");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask);
      fetchTasks();
      setNewTask({ title: "", description: "", userId: user.id });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding task");
    }
  };

  const updateTask = async (id, progress) => {
    try {
      await API.put(`/tasks/${id}`, { progress });
      fetchTasks();
    } catch (err) {
      alert("Not allowed to update");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Not allowed to delete");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.email} ({user?.role})</h2>

      {user.role === "student" && (
        <p>Teacher Assigned: {user.teacherId}</p>
      )}

      <button onClick={logout}>Logout</button>

      <h3>Add Task</h3>
      <form onSubmit={addTask}>
        <input
          placeholder="Task Title"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          placeholder="Description"
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button>Add</button>
      </form>

      <h3>Your Tasks</h3>
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Progress: {task.progress}</p>

          <select
            onChange={(e) => updateTask(task._id, e.target.value)}
            defaultValue={task.progress}
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}