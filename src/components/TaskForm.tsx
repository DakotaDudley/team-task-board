import { useState } from "react";
import type { TaskInput, TaskPriority } from "../types/task";
import { validateTaskInput } from "../logic/taskValidation";

type Props = {
  onCreate: (input: TaskInput) => Promise<void> | void;
  disabled?: boolean;
};

export function TaskForm({ onCreate, disabled }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const input: TaskInput = {
      title,
      priority,
      dueDate: dueDate || null,
    };

    const result = validateTaskInput(input);
    if (!result.valid) {
      setError(result.error);
      return;
    }

    await onCreate(input);
    setTitle("");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs doing?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Task title"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        aria-label="Priority"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date"
      />
      <button type="submit" disabled={disabled}>
        Add task
      </button>
      {error && <div className="form-error">{error}</div>}
    </form>
  );
}
