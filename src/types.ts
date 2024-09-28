// types.ts

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO строка
  deadline: string; // ISO строка
  status: string;
  assignedTo: string;
};

export type Data = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
};

export type Project = {
  id: string;
  name: string;
};
