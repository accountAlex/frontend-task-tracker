import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

const CreateProjectForm = () => {
  const [projectGroup, setProjectGroup] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [projectStatus, setProjectStatus] = useState("NEW");

  const handleSubmit = () => {
    const projectData = {
      projectGroup,
      name,
      description,
      ownerUsername,
      repositoryName,
      deadline,
      projectStatus,
    };

    axios
      .post("/api/projects", projectData)
      .then((response) => {
        console.log("Проект создан:", response.data);
        setProjectGroup("");
        setName("");
        setDescription("");
        setOwnerUsername("");
        setRepositoryName("");
        setDeadline("");
        setProjectStatus("NEW");
      })
      .catch((error) => {
        console.error("Ошибка создания проекта:", error);
      });
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#2a3b4d", color: "#ffffff" }}>
      <Typography variant="h4" gutterBottom>
        Создать новый проект
      </Typography>
      <TextField
        label="Группа проекта"
        variant="outlined"
        fullWidth
        value={projectGroup}
        onChange={(e) => setProjectGroup(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Название проекта"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        label="Имя владельца"
        variant="outlined"
        fullWidth
        value={ownerUsername}
        onChange={(e) => setOwnerUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Название репозитория"
        variant="outlined"
        fullWidth
        value={repositoryName}
        onChange={(e) => setRepositoryName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Крайний срок"
        type="date"
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
        value={projectStatus}
        onChange={(e) => setProjectStatus(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      >
        <MenuItem value="NEW">Новый</MenuItem>
        <MenuItem value="IN_WORK">В работе</MenuItem>
        <MenuItem value="COMPLETED">Завершён</MenuItem>
        <MenuItem value="DELAYED">Отложен</MenuItem>
        <MenuItem value="BLOCKED">Заблокирован</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Создать проект
      </Button>
    </Box>
  );
};

export default CreateProjectForm;
