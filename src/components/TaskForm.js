import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const TaskForm = ({ onAdd, editingTask }) => {
  const initialState = {
    title: "",
    description: "",
    dueDate: "",
    id: "",
    completed: false,
  };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: editingTask.dueDate,
        id: editingTask.id,
        completed: editingTask.completed,
      });
    }
  }, [editingTask]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.dueDate) {
      alert("Please fill in title and due date.");
      return;
    }

    onAdd({ ...formData, id: new Date().getTime() });
    setFormData(initialState);
  };
  const inputChangeHanlder = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formData);

  return (
    <div>
      <FormControl>
        <FormLabel>title</FormLabel>
        <Input
          value={formData.title}
          onChange={inputChangeHanlder}
          name="title"
          type="text"
        />
      </FormControl>
      <FormControl>
        <FormLabel>description</FormLabel>
        <Input
          value={formData.description}
          onChange={inputChangeHanlder}
          name="description"
          type="text"
        />
      </FormControl>
      <FormControl>
        <FormLabel>due date</FormLabel>
        <Input
          value={formData.dueDate}
          onChange={inputChangeHanlder}
          name="dueDate"
          type="date"
        />
      </FormControl>
      <Center>
        <Button onClick={onSubmit} mt="5" colorScheme="blue">
          Add Task
        </Button>
      </Center>
    </div>
  );
};

export default TaskForm;
