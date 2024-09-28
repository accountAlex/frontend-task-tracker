// types.ts
export type Project = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  creationDate: string; // ISO строка
  startDate: string; // ISO строка, дата начала
  deadline: string; // ISO строка
  status: string; // статус задачи
  assignedBy: string;
  assignedTo: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Data = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
};
