import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('/api/tasks', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    return data;
  }

  // Fetch Task
  // const fetchTask = async (id) => {
  //   const res = await fetch(`https://tasksdb-8787.restdb.io/rest/tasks/${id}`, {
  //     headers: {
  //       'x-apikey': '6242f60967937c128d7c92d8'
  //     }
  //   });
  //   const data = await res.json();

  //   return data;
  // }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([...tasks, data]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = tasks.find((el) => el.id === id);
    const updTask = { reminder: !taskToToggle.reminder };

    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task));
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
