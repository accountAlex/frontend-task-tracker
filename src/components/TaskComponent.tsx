// TaskComponent.tsx
import React from "react";
import { Typography, Box } from "@mui/material";
import { Task } from "../types";

type TaskComponentProps = {
  task: Task;
};

const TaskComponent: React.FC<TaskComponentProps> = ({ task }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">{task.title}</Typography>
      <Typography variant="body2">{task.description}</Typography>
      <Typography variant="caption">Дата начала: {task.startDate}</Typography>
      <Typography variant="caption">Дедлайн: {task.deadline}</Typography>
      <Typography variant="caption">Статус: {task.status}</Typography>
    </Box>
  );
};

export default TaskComponent;
