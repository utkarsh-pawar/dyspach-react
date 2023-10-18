import { Container, Heading, Select } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import TaskList from "./components/TasksList";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const taskAddHandler = async (data) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...task, ...data } : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [...prev, { ...data, id: Date.now() }]);
    }
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTasks(storedTasks);
  }, []);
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
  const deleteHandler = (id) => {
    const filteredTasks = tasks.filter((task) => task.id != id);
    setTasks(filteredTasks);
  };
  const editHandler = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
  };
  console.log(editingTask);
  const toggleHandler = (id) => {
    setTasks((prev) => {
      return prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
    });
  };

  return (
    <Container maxW={"container.xl"} centerContent="true">
      <Heading>Task Tracker</Heading>
      <TaskForm onAdd={taskAddHandler} editingTask={editingTask} />
      <Select
        maxW={"md"}
        my={5}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="all" selected disabled>
          select option
        </option>
        <option value="all" selected>
          all
        </option>
        <option value="c">completed</option>
        <option value="nc">not completed</option>
      </Select>
      <TaskList
        tasks={
          filter == "c"
            ? tasks.filter((task) => task.completed == true)
            : filter == "nc"
            ? tasks.filter((task) => task.completed == false)
            : tasks
        }
        onToggle={toggleHandler}
        onDelete={deleteHandler}
        onEdit={editHandler}
      />
    </Container>
  );
};

export default App;
