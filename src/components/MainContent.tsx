// MainComponent.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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
  const [open, setOpen] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProjectName("");
  };

  const handleCreateProject = () => {
    if (projectName.trim() === "") return;

    const newProject: Project = {
      id: uuidv4(),
      name: projectName,
    };

    setProjects([...projects, newProject]);
    handleClose();
    navigate(`/project/${newProject.id}`);
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
            onClick={handleOpen}
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
              onClick={() => navigate(`/project/${project.id}`)}
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
                {/* Добавьте дополнительную информацию о проекте здесь */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Модальное окно для создания нового проекта */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-project-modal"
        aria-describedby="modal-to-create-new-project"
      >
        <Box sx={modalStyle}>
          <Typography
            id="create-project-modal"
            variant="h6"
            component="h2"
            gutterBottom
          >
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
