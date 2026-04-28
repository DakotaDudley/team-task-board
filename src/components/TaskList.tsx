import type { Task } from "../types/task";
import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Task[];
  onEdit: (id: string, updates: Partial<Task>) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
};

export function TaskList({ tasks, onEdit, onDelete }: Props) {
  if (tasks.length === 0) {
    return <div className="empty">No tasks to show.</div>;
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
