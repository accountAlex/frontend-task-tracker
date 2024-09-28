// ColumnComponent.tsx
import React from "react";
import { Box, Card, Typography } from "@mui/material";
import TaskComponent from "./TaskComponent.tsx";
import { Task, Column } from "../types";

type ColumnComponentProps = {
  column: Column;
  tasks: Task[];
};

const ColumnComponent: React.FC<ColumnComponentProps> = ({ column, tasks }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {column.title}
      </Typography>
      {tasks.map((task) => (
        <Card key={task.id} sx={{ marginBottom: 2 }}>
          <TaskComponent task={task} />
        </Card>
      ))}
    </Box>
  );
};

export default ColumnComponent;
