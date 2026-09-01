# Mini-Store POS Learning Project

A from-scratch learning project for developing the skills needed to design, build, validate, deploy, and present professional business-process web applications.

This repository is intentionally separate from the existing production Mini-Store POS. The earlier application may provide real-world context, operating lessons, and examples of problems that had to be solved, but its source code, architecture, workflows, data model, and business logic are **not** implementation requirements for this project.

## Purpose

The primary goal is to **learn how to build** a modern business-process web application.

The Mini-Store POS provides a practical problem domain in which to learn HTML, CSS, React, TypeScript, data persistence, offline behavior, testing, deployment, Git, and architectural decision-making. The project should evolve as understanding improves.

The objective is therefore not to reproduce the existing Mini-Store POS feature-for-feature or line-for-line. A different structure, workflow, data model, or technical solution is acceptable — and often desirable — when it results from deliberate learning and can be explained and verified.

The broader goal is to develop a repeatable approach for creating MVPs that solve real business and workflow problems, including inventory systems, audit trackers, appointment tools, job-order systems, customer follow-up applications, training records, approval workflows, and operational dashboards.

## Durable Project Constraints

Although the implementation is intentionally open-ended, the learning project should remain grounded in the real operating environment for which the application is intended.

### User demographic

The application is intended for a small family-operated mini-store in the Davao Region, Philippines. Primary users may be **50 years old or older**, may not be technically inclined, and should not need software training to complete routine store tasks.

This means interface decisions should favor:

- clear wording;
- large and dependable touch targets;
- readable typography and values;
- obvious transaction state;
- few decisions per step;
- minimal repetitive data entry;
- predictable placement of common actions; and
- low cognitive load over feature density.

### Hardware benchmark

The normal operating terminal is one dedicated Android tablet. The hardware benchmark is an **HONOR Pad X8a-class tablet**, approximately:

```text
11-inch display
4 GB RAM
128 GB storage
Wi-Fi
```

Landscape/tablet use is the primary design target.

The application should therefore be designed and tested first for realistic tablet constraints rather than assuming desktop-class hardware, a keyboard/mouse workflow, or unlimited screen space and resources.

### Operating environment

The store may have intermittent internet connectivity. The application should remain practical for day-to-day store operation during connectivity interruptions.

Recurring operating cost should remain as close to zero as practical, and the project should avoid infrastructure or services whose cost and complexity are not justified by a demonstrated need.

No receipt printer, multi-branch operation, or enterprise staff-management system should be assumed unless a future learning milestone establishes a genuine requirement.

More detailed background from the earlier application is retained only as **reference context** in [`docs/REFERENCE_CONTEXT.md`](docs/REFERENCE_CONTEXT.md). It is not a specification for what this learning project must become.

## Learning Approach

This project uses a top-down, practical, vertical-slice approach:

1. Start with a recognizable business need.
2. Decide the smallest useful behavior to build next.
3. Identify the concepts required to make it work.
4. Learn those concepts at the point they become useful.
5. Implement the behavior in small, understandable steps.
6. Verify both visible behavior and technical results.
7. Commit the completed learning milestone.
8. Reflect on what the same concept would look like in another application.

The developer should be able to explain why each committed line exists at a level appropriate to the current learning stage.

## Role of AI

AI should primarily act as a requirements challenger, tutor, debugging partner, code reviewer, test-case generator, and security or data-integrity reviewer.

Development guidance should proceed one implementation step at a time. After each step, AI should wait for the developer to confirm completion or ask questions before presenting the next step. This pacing is intended to provide space to understand the syntax, semantics, and purpose of each change before moving forward.

AI must not retrieve, copy, or reconstruct implementation code from the separate production Mini-Store POS repository.

When earlier-product behavior is discussed, treat it as a case study: ask what problem it solved, whether the same requirement still exists, and whether a simpler or clearer solution can be built from first principles.

## Current Application Direction

The current learning application uses a simple three-tab shell:

1. **Sales**
2. **Inventory**
3. **Records**

This reflects the application's present learning state, not an immutable product specification. Navigation, workflows, terminology, and business rules may be revised when the learning process produces a better-supported design.

The first business workflow is Product Master Management inside the Inventory area: creating and maintaining the store's sellable product catalog.

## Design Principle

Professional presentation is part of the application shell, not a final cosmetic step.

Global styling should remain coherent as features are learned and added. The interface should be tablet-first, restrained, highly legible, and suitable for older/nontechnical users. Avoid visually noisy or bright-blue-heavy treatment that competes with operational information.

## Technology Direction

The technologies below represent the current intended learning stack. They should be introduced when a practical milestone creates the need for them rather than all at once.

### Client / User Interface

~~~text
Semantic HTML
Plain CSS
React
TypeScript
~~~

### Local data and offline capability

~~~text
IndexedDB
Dexie
PWA / service worker
~~~

The exact data model and persistence architecture should be designed during the relevant learning milestones rather than copied from the earlier application.

### Optional synchronization / reporting direction

~~~text
Google Apps Script
Google Sheets
~~~

These are candidate low-cost tools based on the operating context. Their exact role should be justified when synchronization or reporting becomes an active learning problem.

### Build and development tooling

~~~text
Vite
npm
TypeScript compiler
ESLint
~~~

### Hosting and version control

~~~text
Git
GitHub
GitHub Actions
GitHub Pages
~~~

### Development environment

~~~text
Samsung Android tablet
→ Termux
→ code-server
→ browser-based VS Code interface
→ local Git repository
~~~

GitHub Codespaces may be used as a backup development environment.

## Git Working Principles

- Inspect repository state before acting.
- Work on one logical change at a time.
- Review changed files before staging.
- Stage files intentionally.
- Run the appropriate verification before committing.
- Write concise, meaningful commit messages.
- Push only understood and verified work.
- Compare local and remote state after pushing.
- Keep generated dependencies, build output, environment files, and secrets out of version control.

## Documentation and Continuity Model

This README is a **static project-orientation document**. It describes the learning purpose, durable operating constraints, current technology direction, Git principles, and session-grounding procedure.

Do not use this README as a development-progress log.

Permanent documentation under `docs/` should capture only information that genuinely needs to persist across sessions, such as:

- operating and user constraints;
- learning/documentation rules;
- architectural decisions made during this learning project; and
- reference context that may help explain why a problem matters.

Reference material from the previous Mini-Store POS must be clearly labeled as **context, not requirements**.

Development progress belongs in chronological checkpoint documents under:

~~~text
docs/checkpoints/
~~~

Checkpoint documents should record what was implemented, what was verified, current errors, important decisions, relevant files, unfinished work, the exact resume point, and one concrete next action.

Create a new checkpoint rather than overwriting an earlier checkpoint. Checkpoint descriptions are historical reference only; current repository code remains authoritative.

See [`docs/DOCUMENTATION_GUIDE.md`](docs/DOCUMENTATION_GUIDE.md) for the documentation maintenance rules.

## Source-of-Truth Order

For **what has actually been built**, use this priority:

1. current repository code;
2. current learning-project documentation and explicit decisions;
3. latest applicable checkpoint;
4. Git history; and
5. AI conversation history.

Earlier production-app behavior is not a source of truth for the learning implementation.

The most important distinction is:

> **Operating constraints define the problem. The learning process defines the solution.**

## New-Session Grounding Prompt

Copy and use the following prompt at the beginning of a new AI development session:

~~~text
We are continuing development of my Mini-Store POS Learning Project.

Repository:
kentvillamora-dev/mini-store-pos-learning

This is a from-scratch learning project. Do not copy or reconstruct source code, architecture, workflows, or business logic from my separate production Mini-Store POS repository.

The durable constraints are the operating environment, hardware benchmark, and user demographic documented in this repository. The implementation may evolve as I learn; the goal is to learn how to build, not reproduce the old application exactly.

Before giving development instructions or proposing code changes, ground yourself in the current GitHub repository.

Please follow this startup procedure:

1. Read README.md completely and follow its project, learning, Git, and documentation rules.
2. Inspect the permanent documentation under docs/, if present.
3. Inspect docs/checkpoints/, if present, and identify the latest applicable checkpoint using its date, contents, and relationship to the current task.
4. Read that checkpoint completely to determine:
   - what has been completed;
   - what has been verified working;
   - known issues or errors;
   - where development stopped; and
   - the exact next action.
5. Inspect the actual current source files relevant to that next action.
6. Reconcile the checkpoint and documentation against the live code. The repository code is authoritative for what is currently implemented.
7. Treat documentation about the previous Mini-Store POS only as reference context unless this learning repository explicitly adopts a decision.
8. Do not reconstruct source code or implementation decisions from conversation memory, historical snippets, or the production POS.
9. Do not make any code changes yet.

After completing the review, provide a concise Session Grounding Report
containing:

- current repository branch and latest commit reviewed;
- latest applicable checkpoint, or state that none exists;
- current development state;
- current build/error state, if documented;
- relevant source files inspected;
- discrepancies between documentation, checkpoint, and live code;
- exact next action specified by the checkpoint, or the smallest safe next action if no checkpoint exists; and
- whether it is safe to resume development.

Learning rules:

- Teach through small, practical steps.
- Give only one implementation step at a time. Wait for me to confirm completion or ask questions before presenting the next step.
- Explain both syntax and semantics when introducing a concept.
- Explain what each terminal command does, why it is needed, the expected result, and how to verify success.
- Preserve professional global styling as part of the application shell.
- Keep the implementation independent from the production POS codebase.
- Challenge inherited assumptions when a simpler or clearer solution may be better for learning or for the actual users.
- Include clear verification instructions for every meaningful step.
- Use Git deliberately: inspect, verify, stage intentionally, review, commit, push, and confirm local/remote integrity.

Wait for my confirmation after the Session Grounding Report before proceeding
with the next development step.
~~~

## Guiding Principle

> Learn to solve the real user's problem from first principles; do not merely reproduce yesterday's solution.
