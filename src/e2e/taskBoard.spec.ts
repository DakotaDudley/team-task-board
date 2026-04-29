import { test, expect, Page } from "@playwright/test";

// ─── helpers ──────────────────────────────────────────────────────────────────
async function clearStorage(page: Page) {
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector(".app");
}

async function addTask(
  page: Page,
  title: string,
  priority: "low" | "medium" | "high" = "medium"
) {
  await page.getByLabel("Task title").fill(title);
  await page.getByLabel("Priority").selectOption(priority);
  await page.getByRole("button", { name: /add task/i }).click();
  await page.waitForSelector(".task-item");
}

// ─── Create task ──────────────────────────────────────────────────────────────
test.describe("Create task", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await clearStorage(page);
  });

  test("task appears in the list after submitting the form", async ({ page }) => {
    await addTask(page, "Write unit tests");
    await expect(page.getByText("Write unit tests")).toBeVisible();
  });

  test("shows a success banner after creating a task", async ({ page }) => {
    await addTask(page, "Write unit tests");
    await expect(page.locator(".banner.success")).toBeVisible();
  });

  test("form clears after a successful create", async ({ page }) => {
    await addTask(page, "Write unit tests");
    await expect(page.getByLabel("Task title")).toHaveValue("");
  });

  test("shows an inline error for an empty title — no banner", async ({ page }) => {
    await page.getByRole("button", { name: /add task/i }).click();
    await expect(page.locator(".form-error")).toBeVisible();
    await expect(page.locator(".banner")).not.toBeVisible();
  });

  // Whitespace-only title passes validation
  test("shows an inline error for a whitespace-only title", async ({ page }) => {
    await page.getByLabel("Task title").fill("   ");
    await page.getByRole("button", { name: /add task/i }).click();
    await expect(page.locator(".form-error")).toBeVisible();
  });
});

// ─── Mark task complete ───────────────────────────────────────────────────────
test.describe("Mark task complete", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await clearStorage(page);
    await addTask(page, "Task to complete");
  });

  test("checking the checkbox adds the completed style", async ({ page }) => {
    await page.getByRole("checkbox").click();
    await expect(page.locator(".task-item.completed")).toBeVisible();
  });

  test("unchecking the checkbox removes the completed style", async ({ page }) => {
    await page.getByRole("checkbox").click();
    await expect(page.locator(".task-item.completed")).toBeVisible();
    await page.getByRole("checkbox").click();
    await expect(page.locator(".task-item.completed")).not.toBeVisible();
  });

  // Toggle only updates component state — never calls updateTask/localStorage
  test("completed state persists after a page refresh", async ({ page }) => {
    await page.getByRole("checkbox").click();
    await expect(page.locator(".task-item.completed")).toBeVisible();

    await page.reload();
    await page.waitForSelector(".app");

    await expect(page.locator(".task-item.completed")).toBeVisible();
  });

  test("uncompleted state also persists after a page refresh", async ({ page }) => {
    // Complete it, then uncheck, then refresh — should still be incomplete
    await page.getByRole("checkbox").click();
    await page.getByRole("checkbox").click();
    await expect(page.locator(".task-item.completed")).not.toBeVisible();

    await page.reload();
    await page.waitForSelector(".app");

    await expect(page.locator(".task-item.completed")).not.toBeVisible();
  });
});

// ─── Persistence across refreshes ────────────────────────────────────────────
test.describe("Persistence across page refreshes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await clearStorage(page);
  });

  test("created task survives a refresh", async ({ page }) => {
    await addTask(page, "Survives refresh");
    await page.reload();
    await page.waitForSelector(".app");
    await expect(page.getByText("Survives refresh")).toBeVisible();
  });

  test("empty state on first load with no saved data", async ({ page }) => {
    await expect(page.getByText(/no tasks to show/i)).toBeVisible();
  });

  // deleteTask never calls writeToStorage — deleted tasks return on refresh
  test("deleted task stays gone after a refresh", async ({ page }) => {
    await addTask(page, "Delete and refresh");
    await page.getByRole("button", { name: /delete/i }).click();
    await expect(page.getByText(/no tasks to show/i)).toBeVisible();

    await page.reload();
    await page.waitForSelector(".app");

    await expect(page.getByText("Delete and refresh")).not.toBeVisible();
  });

  test("task title and priority are still correct after a refresh", async ({ page }) => {
    await addTask(page, "High priority work", "high");
    await page.reload();
    await page.waitForSelector(".app");

    await expect(page.getByText("High priority work")).toBeVisible();
    await expect(page.locator(".task-item .priority")).toContainText("high");
  });
});
