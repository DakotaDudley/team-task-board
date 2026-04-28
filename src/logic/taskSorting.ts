import type { Task } from "../types/task";

export function sortTasksByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => a.priority.localeCompare(b.priority));
}
