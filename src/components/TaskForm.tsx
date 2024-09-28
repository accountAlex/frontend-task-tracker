// TaskForm.tsx
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Select, MenuItem } from "@mui/material";
import { Task } from "../types";

type TaskFormProps = {
  task?: Task | null; // Задача для редактирования или null для новой задачи
  onSave: (task: Task) => void;
  onCancel: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [startDate, setStartDate] = useState(task?.startDate || "");
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [status, setStatus] = useState(task?.status || "To Do");
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || "");

  const handleSave = () => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      startDate,
      deadline,
      status,
      assignedTo,
    } as Task;
    onSave(updatedTask);
  };

  return (
    <Box
      sx={{ marginBottom: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Заголовок задачи"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Описание"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Дата начала"
        type="datetime-local"
        variant="outlined"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Дедлайн"
        type="datetime-local"
        variant="outlined"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value as string)}
      >
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
      <TextField
        label="Кому назначено"
        variant="outlined"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={handleSave}>
          Сохранить
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Отмена
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
