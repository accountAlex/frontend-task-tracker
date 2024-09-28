// ProjectBoard.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Box, Grid, Card, Typography, Button, TextField } from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Project = {
  id: string;
  name: string;
};

type Task = {
  id: string;
  content: string;
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

const ProjectBoard: React.FC<ProjectBoardProps> = ({ projects }) => {
  const { projectId } = useParams<{ projectId: string }>();

  const [data, setData] = useState<Data | null>(null);
  const [taskContent, setTaskContent] = useState<string>("");

  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    if (projectId) {
      const initialData: Data = {
        tasks: {},
        columns: {
          "column-1": {
            id: "column-1",
            title: "To Do",
            taskIds: [],
          },
          "column-2": {
            id: "column-2",
            title: "In Progress",
            taskIds: [],
          },
          "column-3": {
            id: "column-3",
            title: "Done",
            taskIds: [],
          },
        },
        columnOrder: ["column-1", "column-2", "column-3"],
      };
      setData(initialData);
    }
  }, [projectId]);

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

  const addTask = () => {
    if (taskContent.trim() === "") return;

    const newTaskId = `task-${uuidv4()}`;
    const newTask: Task = { id: newTaskId, content: taskContent };

    const columnId = "column-1";

    const column = data.columns[columnId];
    if (!column) {
      console.error("Cannot find column to add task");
      return;
    }

    const newTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const newTaskIds = [newTaskId, ...column.taskIds];
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

    setTaskContent("");
  };

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

        <Box sx={{ marginBottom: 4, display: "flex", gap: 2 }}>
          <TextField
            label="Название задачи"
            variant="outlined"
            fullWidth
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={addTask}>
            Добавить задачу
          </Button>
        </Box>

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

// Компонент Колонки
type ColumnComponentProps = {
  column: Column;
  tasks: Task[];
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
};

const ColumnComponent: React.FC<ColumnComponentProps> = ({
  column,
  tasks,
  data,
  setData,
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

// Компонент Задачи
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
      <Typography variant="body1">{task.content}</Typography>
    </Card>
  );
};
