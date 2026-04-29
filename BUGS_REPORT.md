## BUG-001 -- Deleting a task is not persisted upon refresh
**Severity** CRITICAL
**Steps to reproduce**
1. Add a task
2. Click **Delete**
3. Refresh the page
4. The deleted task reappears

**ADDITIONAL** User is unable to delete multiple tasks due to the page refresh upon each deletion. Previously deleted task shows up due to the persistence issue. 

## BUG-002 -- Priority is sorted alphabetically instead of High > Medium > Low
**Severity** HIGH
**Steps to reproduce**
1. Add a task for each priority (High, Medium, Low)
2. View list order

## BUG-003 -- Marking tasks complete does not persist upon page refresh
**Severity** CRITICAL
**Steps to reproduce**
1. Add a task
2. Mark task complete 
3. Refresh page
4. Task is back in active status

**ADDITIONAL** Due to task completion not persisting, tasks are not being filtered.

## BUG-004 -- Inputting previous dates into the date field is allowed
**Severity** MEDIUM
**Steps to reproduce**
1. Fill in title of Task form
2. Input any past date into the due date field
3. Task is created with the past due date

## BUG-005 -- Priority dropdown arrow spacing is not consistent with the date input field
**Severity** LOW
**Steps to reproduce**
1. Nav to home page
2. View priority field within Task Form
3. View arrow

## BUG-006 -- Inputting long text without spacing in tasks cause text to run off screen 
**Severity** MEDIUM
**Steps to reproduce**
1. Add a task with a long title without spacing (500+ Characters)
2. View text running off screen

**ADDITIONAL** This also causes the Priority/Edit/Delete buttons to run off page

## BUG-007 --  Seach is case sensitive
**Severity** LOW
**Steps to reproduce**
1. Add task with all caps
2. Search for same task with only lowercase
3. View results

## BUG-007 --  Whitespace only tiitle passes validation
**Severity** HIGH
**Steps to reproduce**
1. Input only spaces into the title field
2. select add task
3. view added blank task