import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useRouter } from "next/router";
import style from "../styles/TaskList.module.css";

interface Task {
  _id: string;
  title: string;
  completed: Boolean;
  user: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, settitle] = useState<string>("");
  const router = useRouter();

 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user._doc._id;
    const token = localStorage.getItem("token");
    const fetchTasks = async () => {
      await api.get(`/tasks/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response)=>{
        setTasks(response.data)
      })
    };
    fetchTasks()
  }, []);

  const handleCreateTask = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user._doc._id;
  const token = localStorage.getItem("token");
    await api.post(
      "/tasks",
      { title: title, userId },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((response)=>{
      settitle('')
      const fetchTasks = async () => {
        await api.get(`/tasks/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((response)=>{
          setTasks(response.data)
        })
      };
      fetchTasks()    })
    router.push("/");
  };

  const handleMarkAsDone = async (id: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user._doc._id;
  const token = localStorage.getItem("token");
    await api
      .post(
        `/tasks/toggle/${id}`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert("Task marked as completed");
        const fetchTasks = async () => {
          await api.get(`/tasks/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response)=>{
            setTasks(response.data)
          })
        };
        fetchTasks()
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to update Tasks");
      });
    router.push("/");
  };

  const handleDeleteTask = async (id: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user._doc._id;
  const token = localStorage.getItem("token");
    await api
      .delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response.data.deletedCount > 0) {
          alert("Task deleted successfully");
        }
        const fetchTasks = async () => {
          await api.get(`/tasks/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response)=>{
            setTasks(response.data)
          })
        };
        fetchTasks()
      });
    router.push("/");
  };

  return (
    <div className={style.taskList}>
      <h2>Task List</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => settitle(e.target.value)}
        placeholder="Task Title"
      />
      <button onClick={handleCreateTask}>Create Task</button>

      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <button onClick={() => handleMarkAsDone(task._id)}>
                {task.completed ? "Done" : "Mark completed"}
              </button>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <h4>Add new Tasks</h4>
      )}
    </div>
  );
}
