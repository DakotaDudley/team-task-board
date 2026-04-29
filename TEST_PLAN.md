TEST CASES — Team Task Board
Scope: Create Task, Mark Complete, Persistence Across Refreshes

1. Create a task with a valid title
  Steps:    Enter a title, click Add Task
  Expected: Task appears in the list

2. Success banner appears after creating a task
  Steps:    Enter a title, click Add Task
  Expected: Green success banner is visible

3. Form clears after a successful create
  Steps:    Enter a title, click Add Task
  Expected: Title field is empty after submit

4. Empty title is rejected
  Steps:    Leave title blank, click Add Task
  Expected: Inline error message appears, no task created

5. Whitespace-only title is rejected
  Steps:    Enter spaces only in title, click Add Task
  Expected: Inline error message appears, no task created
  Actual:   Task is created — BUG

6. Valid priority values are accepted (low, medium, high)
  Steps:    Select each priority option, enter a title, click Add Task
  Expected: Task is created for each priority

7. Past due date is rejected
  Steps:    Enter a title, set due date to a past date, click Add Task
  Expected: Inline error message appears, no task created
  Actual:   Task is created with past date — BUG

8. Future due date is accepted
  Steps:    Enter a title, set due date to a future date, click Add Task
  Expected: Task is created successfully

9. No due date is accepted
  Steps:    Enter a title, leave due date blank, click Add Task
  Expected: Task is created successfully

10. Checking the checkbox marks the task complete
  Steps:    Add a task, click the checkbox
  Expected: Task shows completed

11. Unchecking the checkbox marks the task incomplete
  Steps:    Add a task, check it, uncheck it
  Expected: Completed styling is removed

12. Created task is still there after a page refresh
  Steps:    Add a task, refresh the page
  Expected: Task is still visible in the list

13. Completed state persists after a page refresh
  Steps:    Add a task, check it, refresh the page
  Expected: Task is still showing as completed
  Actual:   Task resets to incomplete — BUG

14. State persists after a page refresh
  Steps:    Add a task, check it, uncheck it, refresh the page
  Expected: Task is still showing as incomplete
  Actual:   May not reflect correct state — BUG

15. Deleted task stays gone after a page refresh
  Steps:    Add a task, delete it, refresh the page
  Expected: Task is not in the list
  Actual:   Task reappears after refresh — BUG