import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, Box } from "@mui/material";
import axios from "axios";

const EditTask = ({ task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [startDate, setStartDate] = useState(task.startDate);
  const [deadline, setDeadline] = useState(task.deadline);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      startDate,
      deadline,
      status,
      priority,
      assignedTo,
    };

    axios
      .put(`/api/tasks/${task.id}`, updatedTask)
      .then((response) => {
        console.log("Задача обновлена:", response.data);
        onSave(updatedTask);
      })
      .catch((error) => {
        console.error("Ошибка обновления задачи:", error);
      });
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#2a3b4d", color: "#ffffff" }}>
      <TextField
        label="Название задачи"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Описание"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
        multiline
        rows={3}
      />
      <TextField
        label="Дата начала"
        type="datetime-local"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Дедлайн"
        type="datetime-local"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="LOW">Низкий</MenuItem>
        <MenuItem value="MEDIUM">Средний</MenuItem>
        <MenuItem value="HIGH">Высокий</MenuItem>
      </Select>
      <TextField
        label="Кому назначено"
        variant="outlined"
        fullWidth
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Сохранить
      </Button>
    </Box>
  );
};

export default EditTask;
