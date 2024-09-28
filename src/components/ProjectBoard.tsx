import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import TaskComponent from "./TaskComponent.tsx"; // Импортируем TaskComponent

// Типы
type Project = {
  id: string;
  name: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  deadline: string;
  status: string;
  assignedBy: string;
  assignedTo: string;
};

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

type Data = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
};

type ProjectBoardProps = {
  projects: Project[];
};

// Компонент для добавления задачи
const AddTaskForm = ({ onAddTask }: { onAddTask: (task: Task) => void }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [status, setStatus] = useState<string>("To Do");
  const [assignedTo, setAssignedTo] = useState<string>("");

  const handleAddTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription,
      startDate: startDate,
      deadline: deadline,
      status: status,
      assignedBy: "User A", // Текущий пользователь
      assignedTo: assignedTo,
    };
    onAddTask(newTask);
    setTaskTitle("");
    setTaskDescription("");
    setStartDate("");
    setDeadline("");
    setAssignedTo("");
    setStatus("To Do");
  };

  return (
    <Box sx={{ marginBottom: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        label="Заголовок задачи"
        variant="outlined"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <TextField
        label="Описание"
        variant="outlined"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        multiline
        rows={2}
      />
      <TextField
        label="Дата начала"
        type="datetime-local"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <TextField
        label="Дедлайн"
        type="datetime-local"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <Select value={status} onChange={(e) => setStatus(e.target.value)}>
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
      <TextField
        label="Кому дано"
        variant="outlined"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Добавить задачу
      </Button>
    </Box>
  );
};

// Компонент Колонки
const ColumnComponent = ({
  column,
  tasks,
  data,
  setData,
}: {
  column: Column;
  tasks: Task[];
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
}) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: any) => {
      const sourceColumnId = item.sourceColumnId;
      const taskId = item.task.id;

      if (sourceColumnId === column.id) return; // Если перетаскиваем в ту же колонку

      const sourceColumn = data.columns[sourceColumnId];
      const destColumn = data.columns[column.id];

      const newSourceTaskIds = sourceColumn.taskIds.filter(
        (id) => id !== taskId
      );
      const newDestTaskIds = [taskId, ...destColumn.taskIds];

      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceColumnId]: {
            ...sourceColumn,
            taskIds: newSourceTaskIds,
          },
          [column.id]: {
            ...destColumn,
            taskIds: newDestTaskIds,
          },
        },
      });
    },
  });

  return (
    <Card
      ref={drop}
      sx={{
        backgroundColor: "#1f2d3d",
        padding: 2,
        borderRadius: 2,
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        {column.title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {tasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            columnId={column.id}
            data={data}
            setData={setData}
          />
        ))}
      </Box>
    </Card>
  );
};

const ProjectBoard: React.FC<ProjectBoardProps> = ({ projects }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [data, setData] = useState<Data | null>(null);

  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    if (project) {
      const projectName = project.name; // Берем название проекта

      // Загрузка задач с сервера для конкретного проекта по названию
      axios.get(`/api/projects/${projectName}/tasks`).then((response) => {
        const tasksFromServer = response.data;
        const initialData: Data = {
          tasks: tasksFromServer.reduce(
            (acc: { [key: string]: Task }, task: Task) => {
              acc[task.id] = task;
              return acc;
            },
            {}
          ),
          columns: {
            "column-1": {
              id: "column-1",
              title: "To Do",
              taskIds: tasksFromServer
                .filter((task: Task) => task.status === "To Do")
                .map((task: Task) => task.id),
            },
            "column-2": {
              id: "column-2",
              title: "In Progress",
              taskIds: tasksFromServer
                .filter((task: Task) => task.status === "In Progress")
                .map((task: Task) => task.id),
            },
            "column-3": {
              id: "column-3",
              title: "Done",
              taskIds: tasksFromServer
                .filter((task: Task) => task.status === "Done")
                .map((task: Task) => task.id),
            },
          },
          columnOrder: ["column-1", "column-2", "column-3"],
        };
        setData(initialData);
      });
    }
  }, [project]);

  const addTaskToColumn = (newTask: Task) => {
    if (!data || !project) return;

    const projectName = project.name;

    // Сохраняем новую задачу на сервере по названию проекта
    axios
      .post(`/api/projects/${projectName}/tasks`, newTask)
      .then((response) => {
        const savedTask = response.data;
        const columnId = "column-1"; // Добавляем задачу в колонку "To Do"
        const column = data.columns[columnId];

        const newTasks = {
          ...data.tasks,
          [savedTask.id]: savedTask,
        };

        const newTaskIds = [savedTask.id, ...column.taskIds];
        const newColumn: Column = {
          ...column,
          taskIds: newTaskIds,
        };

        setData({
          ...data,
          tasks: newTasks,
          columns: {
            ...data.columns,
            [newColumn.id]: newColumn,
          },
        });
      })
      .catch((error) => {
        console.error("Ошибка при добавлении задачи:", error);
      });
  };

  if (!projectId || !project) {
    return (
      <Box sx={{ padding: 4, color: "error.main", fontSize: "20px" }}>
        Проект не найден
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ padding: 4, color: "primary.main", fontSize: "20px" }}>
        Загрузка...
      </Box>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          flexGrow: 1,
          padding: 4,
          backgroundColor: "#121212",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom color="textPrimary">
          {project.name}
        </Typography>

        <AddTaskForm onAddTask={addTaskToColumn} />

        <Grid container spacing={3}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Grid item xs={12} md={4} key={column.id}>
                <ColumnComponent
                  column={column}
                  tasks={tasks}
                  data={data}
                  setData={setData}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default ProjectBoard;
