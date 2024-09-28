import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate для перенаправления
import { v4 as uuidv4 } from "uuid"; // Используем uuid для генерации ID проектов
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios"; // Импортируем axios для работы с API

type Project = {
  id: string;
  name: string;
};

type MainComponentProps = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const MainComponent: React.FC<MainComponentProps> = ({
  projects,
  setProjects,
}) => {
  const [open, setOpen] = useState<boolean>(false); // Для управления открытием модального окна
  const [projectName, setProjectName] = useState<string>(""); // Для хранения названия нового проекта
  const navigate = useNavigate(); // Используем навигацию для перенаправления

  // Открытие модального окна для создания проекта
  const handleOpen = () => setOpen(true);

  // Закрытие модального окна и сброс данных
  const handleClose = () => {
    setOpen(false);
    setProjectName("");
  };

  // Функция создания нового проекта
  const handleCreateProject = () => {
    if (projectName.trim() === "") return; // Проверка на пустое название проекта

    const newProject: Project = {
      id: uuidv4(), // Генерация уникального ID для проекта
      name: projectName,
    };

    // Сохранение проекта на сервере
    axios
      .post("/api/projects", newProject) // Запрос на сервер для создания проекта
      .then((response) => {
        const createdProject = response.data; // Получаем созданный проект с сервера
        setProjects([...projects, createdProject]); // Обновляем состояние проектов
        handleClose(); // Закрываем модальное окно
        navigate(`/project/${createdProject.id}`); // Перенаправляем на страницу доски проекта
      })
      .catch((error) => {
        console.error("Ошибка при создании проекта:", error); // Логируем ошибку
      });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 4,
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom color="textPrimary">
        Мои проекты
      </Typography>
      <Grid container spacing={3}>
        {/* Карточка для создания нового проекта */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={handleOpen} // Открываем модальное окно при клике на карточку
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1f2d3d",
              color: "#ffffff",
              boxShadow: 3,
              cursor: "pointer",
              transition: "transform 0.2s, background-color 0.2s",
              "&:hover": {
                backgroundColor: "#274c4d",
                transform: "scale(1.05)",
              },
            }}
          >
            <Typography variant="h2" color="primary">
              +
            </Typography>
          </Card>
        </Grid>

        {/* Отображение существующих проектов */}
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              onClick={() => navigate(`/project/${project.id}`)} // Перенаправляем на страницу проекта при клике
              sx={{
                backgroundColor: "#1f2d3d",
                cursor: "pointer",
                boxShadow: 3,
                transition: "transform 0.2s, background-color 0.2s",
                "&:hover": {
                  backgroundColor: "#274c4d",
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  color="primary"
                  gutterBottom
                >
                  {project.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Модальное окно для создания нового проекта */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Создать новый проект
          </Typography>
          <TextField
            fullWidth
            label="Название проекта"
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Отменить
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateProject}
            >
              Создать
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default MainComponent;
