# Team Task Board

## Your assignment

You are given a small Team Task Board app.

The intended behavior of every feature above is documented as a small set of Jira-style tickets here: [Jira Tickets](https://github.com/Cymmetric-Pixel/team-task-board-jira)

Your goals:

1. Review the app and understand its behavior.
2. Choose and configure an appropriate unit testing setup.
3. Choose and configure a UI / component / integration testing approach if useful.
4. Choose and configure an e2e testing approach.
5. Add meaningful tests for pure business logic.
6. Add tests for important user-facing behavior.
7. Add at least one e2e test for a critical user journey.
8. Create a CI pipeline that runs the relevant checks automatically.
9. Investigate the app and report bugs you find in a BUGS_REPORT.md file.

## Guidelines

- You may use AI tools, but you are responsible for the final decisions.
- You are expected to add the pieces you think are appropriate, justify them, and explain the tradeoffs.
- You can use Gitlab or Github for the CI pipeline.


## Install

```bash
npm install
```

## Run the app

```bash
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

---------------------------------------------------------------------------------------------------------------------------------------------------

### Running tests

```bash
npm run test:unit
npm run test:e2e
```

### Tradeoffs

I am currently covering the happy path and hitting 2 critical bugs that I think take priority. 

What I cover:
    - Delete not persisting
    - Completion not persisting

What I am currently leaving uncovered:
    - Edit tasks
    - Search 
    - Filter tabs
    - Error banner 
These are still documented within BUGS_REPORT.md
The unpicked bugs and issues are lower severity or have a workaround.

### Gaps

1. No maximum title length defined, a user could paste an entire essay into the title field.
2. TTB-9 says that banners should auto-dismiss after "roughly 3 seconds", roughly isn't a testable number.
3. No ticket for error states on the initial load.