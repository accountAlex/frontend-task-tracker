// TaskComponent.tsx
import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { useDrag } from "react-dnd";
import { Task, Data } from "../types";

type TaskComponentProps = {
  task: Task;
  columnId: string;
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
};

const TaskComponent: React.FC<TaskComponentProps> = ({
  task,
  columnId,
  data,
  setData,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { task, sourceColumnId: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag}
      sx={{
        marginBottom: 2,
        padding: 2,
        backgroundColor: "#2a3b4d",
        color: "#ffffff",
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
        transition: "opacity 0.2s",
        boxShadow: 1,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        {task.title}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {task.description}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" color="textSecondary">
          Дедлайн: {new Date(task.deadline).toLocaleDateString()}
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block">
          От: {task.assignedBy}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Кому: {task.assignedTo}
        </Typography>
      </Box>
    </Card>
  );
};

export default TaskComponent;
