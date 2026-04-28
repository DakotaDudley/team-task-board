export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate: string | null;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskInput = {
  title: string;
  priority: TaskPriority;
  dueDate: string | null;
};

export type FilterMode = "all" | "active" | "completed";
