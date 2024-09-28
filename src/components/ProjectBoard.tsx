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
  Modal,
  Select,
  MenuItem,
} from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

// Компонент задачи
type TaskComponentProps = {
  task: Task;
  columnId: string;
  moveTask: (
    taskId: string,
    sourceColumnId: string,
    destColumnId: string
  ) => void;
  onEdit: (task: Task) => void;
};

const TaskComponent: React.FC<TaskComponentProps> = ({
  task,
  columnId,
  moveTask,
  onEdit,
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
      <Typography variant="h6">{task.title}</Typography>
      <Typography variant="body2" color="textSecondary">
        {task.description}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Дата начала: {new Date(task.startDate).toLocaleString()}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Дедлайн: {new Date(task.deadline).toLocaleString()}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Статус: {task.status}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Кому дано: {task.assignedTo}
      </Typography>
      <Button
        onClick={() => onEdit(task)}
        sx={{ marginTop: 1 }}
        color="secondary"
      >
        Редактировать
      </Button>
    </Card>
  );
};

// Компонент колонки
type ColumnComponentProps = {
  column: Column;
  tasks: Task[];
  moveTask: (
    taskId: string,
    sourceColumnId: string,
    destColumnId: string
  ) => void;
  onEdit: (task: Task) => void;
};

const ColumnComponent: React.FC<ColumnComponentProps> = ({
  column,
  tasks,
  moveTask,
  onEdit,
}) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: any) => {
      const taskId = item.task.id;
      const sourceColumnId = item.sourceColumnId;
      if (sourceColumnId !== column.id) {
        moveTask(taskId, sourceColumnId, column.id);
      }
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
            moveTask={moveTask}
            onEdit={onEdit}
          />
        ))}
      </Box>
    </Card>
  );
};

// Компонент редактирования задачи
type EditTaskProps = {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onClose: () => void;
};

const EditTaskForm: React.FC<EditTaskProps> = ({ task, onSave, onClose }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [startDate, setStartDate] = useState(task.startDate);
  const [deadline, setDeadline] = useState(task.deadline);
  const [status, setStatus] = useState(task.status);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);

  const handleSave = () => {
    const updatedTask: Task = {
      ...task,
      title: taskTitle,
      description: taskDescription,
      startDate: startDate,
      deadline: deadline,
      status: status,
      assignedTo: assignedTo,
    };
    onSave(updatedTask);
  };

  return (
    <Box>
      <TextField
        label="Заголовок задачи"
        variant="outlined"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Описание"
        variant="outlined"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Дата начала"
        type="datetime-local"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Дедлайн"
        type="datetime-local"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value as string)}
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
      <TextField
        label="Кому дано"
        variant="outlined"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        onClick={handleSave}
        variant="contained"
        color="primary"
        sx={{ marginRight: 2 }}
      >
        Сохранить
      </Button>
      <Button onClick={onClose} variant="outlined" color="error">
        Отмена
      </Button>
    </Box>
  );
};

// Основной компонент доски
const ProjectBoard: React.FC<ProjectBoardProps> = ({ projects }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [data, setData] = useState<Data | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Поля для создания новой задачи
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [status, setStatus] = useState<string>("To Do");
  const [assignedTo, setAssignedTo] = useState<string>("");

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

  const addTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      title: taskTitle,
      description: taskDescription,
      startDate: startDate,
      deadline: deadline,
      status: status,
      assignedBy: "User A", // Замените на актуальные данные
      assignedTo: assignedTo,
    };

    const columnId = "column-1"; // По умолчанию задача попадает в колонку "To Do"
    const column = data!.columns[columnId];
    const newTaskIds = [newTask.id, ...column.taskIds];
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    setData({
      ...data!,
      tasks: {
        ...data!.tasks,
        [newTask.id]: newTask,
      },
      columns: {
        ...data!.columns,
        [newColumn.id]: newColumn,
      },
    });

    // Сбрасываем поля формы
    setTaskTitle("");
    setTaskDescription("");
    setStartDate("");
    setDeadline("");
    setStatus("To Do");
    setAssignedTo("");

    setIsCreateModalOpen(false);
  };

  const moveTask = (
    taskId: string,
    sourceColumnId: string,
    destColumnId: string
  ) => {
    const sourceColumn = data!.columns[sourceColumnId];
    const destColumn = data!.columns[destColumnId];

    const newSourceTaskIds = sourceColumn.taskIds.filter((id) => id !== taskId);
    const newDestTaskIds = [taskId, ...destColumn.taskIds];

    setData({
      ...data!,
      columns: {
        ...data!.columns,
        [sourceColumnId]: {
          ...sourceColumn,
          taskIds: newSourceTaskIds,
        },
        [destColumnId]: {
          ...destColumn,
          taskIds: newDestTaskIds,
        },
      },
    });
  };

  const handleTaskEdit = (updatedTask: Task) => {
    const updatedTasks = {
      ...data!.tasks,
      [updatedTask.id]: updatedTask,
    };

    setData({
      ...data!,
      tasks: updatedTasks,
    });

    setIsEditModalOpen(false);
    setTaskToEdit(null);
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
          {project?.name}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsCreateModalOpen(true)}
          sx={{ marginBottom: 3 }}
        >
          Добавить задачу
        </Button>

        <Grid container spacing={3}>
          {data?.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Grid item xs={12} md={4} key={column.id}>
                <ColumnComponent
                  column={column}
                  tasks={tasks}
                  moveTask={moveTask}
                  onEdit={(task) => {
                    setTaskToEdit(task);
                    setIsEditModalOpen(true);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>

        {/* Модальное окно для создания задачи */}
        <Modal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        >
          <Box
            sx={{
              width: "400px",
              margin: "100px auto",
              backgroundColor: "#1f2d3d",
              padding: 4,
              borderRadius: 2,
            }}
          >
            <TextField
              label="Заголовок задачи"
              variant="outlined"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Описание"
              variant="outlined"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Дата начала"
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Дедлайн"
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as string)}
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
            <TextField
              label="Кому дано"
              variant="outlined"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button
              onClick={addTask}
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
            >
              Добавить задачу
            </Button>
          </Box>
        </Modal>

        {/* Модальное окно для редактирования задачи */}
        <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <Box
            sx={{
              width: "400px",
              margin: "100px auto",
              backgroundColor: "#1f2d3d",
              padding: 4,
              borderRadius: 2,
            }}
          >
            {taskToEdit && (
              <EditTaskForm
                task={taskToEdit}
                onSave={handleTaskEdit}
                onClose={() => setIsEditModalOpen(false)}
              />
            )}
          </Box>
        </Modal>
      </Box>
    </DndProvider>
  );
};

export default ProjectBoard;
