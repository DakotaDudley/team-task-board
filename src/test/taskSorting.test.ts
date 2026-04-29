import { describe, it, expect } from "vitest";
import { sortTasksByPriority } from "../logic/taskSorting";
import type { Task } from "../types/task";

function makeTask(id: string, priority: Task["priority"], completed = false): Task {
  return {
    id,
    title: `Task ${id}`,
    completed,
    priority,
    dueDate: null,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ─── Create task: newly created tasks appear in priority order ────────────────
// These tests confirm the sort that runs after every create/complete action.
// sort uses gives alphabetical order (high, low,
// medium) instead of the required logical order (high, medium, low).
describe("Create task — priority sort order after adding tasks", () => {
  it("sorts High before Medium before Low", () => {
    const tasks = [
      makeTask("1", "low"),
      makeTask("2", "medium"),
      makeTask("3", "high"),
    ];
    const result = sortTasksByPriority(tasks);
    expect(result[0].priority).toBe("high");
    expect(result[1].priority).toBe("medium");
    expect(result[2].priority).toBe("low");
  });

  it("preserves insertion order within the same priority", () => {
    const tasks = [
      makeTask("A", "high"),
      makeTask("B", "high"),
      makeTask("C", "medium"),
    ];
    const result = sortTasksByPriority(tasks);
    expect(result.map((t) => t.id)).toEqual(["A", "B", "C"]);
  });

  it("does not mutate the original array", () => {
    const tasks = [makeTask("1", "low"), makeTask("2", "high")];
    sortTasksByPriority(tasks);
    expect(tasks[0].priority).toBe("low"); // unchanged
  });
});

// ─── Mark complete — completed tasks still sort correctly ─────────────────────
describe("Mark complete — sort order is unaffected by completion state", () => {
  it("completed high-priority task still sorts before incomplete low-priority", () => {
    const tasks = [
      makeTask("low-active", "low", false),
      makeTask("high-done", "high", true),
    ];
    const result = sortTasksByPriority(tasks);
    expect(result[0].id).toBe("high-done");
  });
});
