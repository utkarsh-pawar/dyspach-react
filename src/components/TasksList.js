import React, { useState } from "react";
import Task from "./Task";
import { Flex, Select } from "@chakra-ui/react";

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  const [filter, setFilter] = useState("all");
  return (
    <div>
      {tasks.length > 0
        ? tasks.map((task) => (
            <Task
              key={task.title}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))
        : "No tasks"}
    </div>
  );
};

export default TaskList;
