import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Fade,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const Task = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <Card
      my={5}
      maxW={"container.lg"}
      bg={task.completed ? "green.100" : "red.100"}
    >
      <CardHeader>
        <Heading>{task.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{task.description}</Text>
        <Text>Due Date: {task.dueDate}</Text>
        <Text>completed: {task.completed ? "true" : "false"}</Text>
        <Flex gap={5}>
          <Button colorScheme="blue" onClick={() => onToggle(task.id)}>
            Toggle Completion
          </Button>
          <Button colorScheme="red" onClick={() => onDelete(task.id)}>
            Delete
          </Button>
          <Button onClick={() => onEdit(task.id)}>Edit</Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Task;
