import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { validateTaskInput } from "../logic/taskValidation";

function makeInput(overrides = {}) {
  return {
    title: "Do the thing",
    priority: "medium" as const,
    dueDate: null,
    ...overrides,
  };
}

// ─── Create task: title validation ───────────────────────────────────────────
describe("Create task — title validation", () => {
  it("accepts a valid title", () => {
    expect(validateTaskInput(makeInput({ title: "Buy milk" })).valid).toBe(true);
  });

  it("rejects an empty title", () => {
    const result = validateTaskInput(makeInput({ title: "" }));
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toBeTruthy();
  });

  //Whitespace-only title passes because title.length > 0
  it("rejects a whitespace-only title", () => {
    const result = validateTaskInput(makeInput({ title: "   " }));
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toBeTruthy();
  });
});

// ─── Create task: priority validation ────────────────────────────────────────
describe("Create task — priority validation", () => {
  it("accepts low, medium, high", () => {
    expect(validateTaskInput(makeInput({ priority: "low" })).valid).toBe(true);
    expect(validateTaskInput(makeInput({ priority: "medium" })).valid).toBe(true);
    expect(validateTaskInput(makeInput({ priority: "high" })).valid).toBe(true);
  });

  it("rejects an invalid priority", () => {
    // @ts-expect-error intentional bad value
    expect(validateTaskInput(makeInput({ priority: "urgent" })).valid).toBe(false);
  });
});

// ─── Create task: due date validation ────────────────────────────────────────
describe("Create task — due date validation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("accepts no due date (null)", () => {
    expect(validateTaskInput(makeInput({ dueDate: null })).valid).toBe(true);
  });

  it("accepts today as the due date", () => {
    expect(validateTaskInput(makeInput({ dueDate: "2025-06-15" })).valid).toBe(true);
  });

  it("accepts a future date", () => {
    expect(validateTaskInput(makeInput({ dueDate: "2025-12-31" })).valid).toBe(true);
  });

  // validation only checks parseability, not that the date is today-or-later
  it("rejects a past due date", () => {
    const result = validateTaskInput(makeInput({ dueDate: "2020-01-01" }));
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toMatch(/past|future|today/i);
  });

  it("rejects a non-date string", () => {
    expect(validateTaskInput(makeInput({ dueDate: "not-a-date" })).valid).toBe(false);
  });
});
