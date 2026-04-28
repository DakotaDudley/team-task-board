import type { TaskInput, TaskPriority } from "../types/task";

export type ValidationResult =
  | { valid: true }
  | { valid: false; error: string };

const VALID_PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

export function validateTaskInput(input: TaskInput): ValidationResult {
  if (input.title.length === 0) {
    return { valid: false, error: "Title is required." };
  }

  if (!VALID_PRIORITIES.includes(input.priority)) {
    return { valid: false, error: "Priority must be low, medium, or high." };
  }

  if (input.dueDate) {
    const parsed = new Date(input.dueDate);
    if (Number.isNaN(parsed.getTime())) {
      return { valid: false, error: "Due date is invalid." };
    }
  }

  return { valid: true };
}
