# Mini-Store POS Learning Project

A from-scratch learning project for developing the skills needed to design, build, validate, deploy, and present professional business-process web applications.

This repository is intentionally separate from the existing production Mini-Store POS. The production application may inform business requirements, operational lessons, and quality expectations, but its source code must not be copied into this project.

## Purpose

The immediate goal is to build a Mini-Store POS application while learning the syntax, semantics, tools, and decision-making involved in modern web development.

The broader goal is to develop a repeatable approach for creating MVPs that solve real business and workflow problems, including inventory systems, audit trackers, appointment tools, job-order systems, customer follow-up applications, training records, approval workflows, and operational dashboards.

## Learning Approach

This project uses a top-down, vertical-slice approach:

1. Start with a recognizable business application.
2. Identify the next useful workflow.
3. Learn the concepts required to make that workflow work.
4. Implement it in small, understandable steps.
5. Verify the visible behavior and technical result.
6. Commit the completed learning milestone.
7. Reflect on how the same pattern applies elsewhere.

The developer should be able to explain why each committed line exists at a level appropriate to the current learning stage.

## Role of AI

AI should primarily act as a requirements challenger, tutor, source of progressively stronger hints, debugging partner, code reviewer, test-case generator, and security or data-integrity reviewer.

Routine learning code should be written and understood by the developer. Assistance should normally progress from conceptual hints to focused examples before a complete solution is provided.

## Application Scope

The application has three primary areas:

1. **Sales** — transacting sales
2. **Inventory** — receiving and updating stock (locally, "procurement")
3. **Records** — ledger of sales and inventory transactions

The professional three-tab application shell is the starting interface. Product Master Management — listing the store's initial sellable products — inside the Inventory tab is the first business workflow.

A Product describes what the store sells. It is distinct from the quantity currently in stock. Later workflows such as Procurement, Sales, Refunds, Voids, and Inventory Adjustments should explain why stock changes.

## Target Technology Stack

The stack below describes the intended architecture. Technologies should be introduced only when the active milestone creates a practical need for them.

### Client / User Interface

~~~text
Semantic HTML
Plain CSS
React
TypeScript
~~~

Responsibilities include application structure, accessibility, professional tablet-first presentation, navigation, interaction, forms, validation feedback, and temporary interface state.

### Application Framework

~~~text
React
~~~

React organizes the interface into components and derives the visible screen from application state.

### Business Logic

~~~text
TypeScript services
Dexie transactions for persistent local operations
~~~

Core selling, procurement, and inventory rules remain local-first and must not depend on network availability.

### Backend / API

~~~text
Google Apps Script HTTP endpoint for synchronization only
~~~

No backend is required for core POS transactions. Google Apps Script is introduced later as a non-blocking synchronization endpoint.

### Authentication and Authorization

~~~text
Not required for the initial single-device family-operated application
~~~

Authentication or roles should not be added without a new operating requirement.

### Operational Database

~~~text
IndexedDB through Dexie
~~~

IndexedDB is the local operational source of truth. Dexie provides the application-facing database and transaction layer.

### Local Storage and Offline Capability

~~~text
IndexedDB
PWA application-shell caching
Service worker
~~~

Core workflows must remain usable without internet access.

### Synchronization

~~~text
Persistent local synchronization queue
Non-blocking batch synchronization
Explicit acknowledgement before queue removal
~~~

Network failure must not roll back or invalidate a successful local business transaction.

### External Integrations

~~~text
Google Apps Script
Google Sheets
~~~

Google Sheets is intended for reporting, historical replication, and potential recovery support. It is not the operational POS database.

### Build and Package Tooling

~~~text
Vite
npm
TypeScript compiler
ESLint
~~~

Vite provides the development server and production build. npm manages project packages and scripts. TypeScript checks data and code contracts. ESLint identifies problematic source-code patterns.

### Hosting and Runtime

~~~text
GitHub Pages — static application hosting
Browser/PWA — operational runtime
Google Apps Script — synchronization runtime
~~~

### Deployment and CI/CD

~~~text
GitHub Actions
~~~

Deployment automation should build and verify the application before publishing it to GitHub Pages.

### Testing and Quality

~~~text
TypeScript
ESLint
Manual workflow verification
Automated tests introduced when business rules require them
~~~

### Version Control and Repository

~~~text
Git — version-control system
GitHub — remote repository and collaboration platform
~~~

GitHub is the durable source of truth. Local development environments are working copies.

### Development Environment

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

This README is a **static project-orientation document**. It describes the project purpose, learning rules, intended scope, target stack, and session-grounding procedure.

Do not use this README as a development-progress log.

Development progress belongs in chronological checkpoint documents stored under:

~~~text
docs/checkpoints/
~~~

Checkpoint documents should record what was implemented, what was verified, current errors, important decisions, relevant files, unfinished work, the exact resume point, and one concrete next action.

Create a new checkpoint rather than overwriting an earlier checkpoint. Checkpoint descriptions are historical reference only; current repository code remains authoritative.

Permanent documentation may be added under **docs/** when stable architecture, business rules, database rules, or learning protocols require more detail. Permanent documents should not be rewritten merely to record routine progress.

## Source-of-Truth Order

When sources disagree, use this priority:

1. current repository code;
2. permanent repository documentation;
3. latest applicable checkpoint;
4. Git history; and
5. AI conversation history.

Conversation memory must never override the repository.

## New-Session Grounding Prompt

Copy and use the following prompt at the beginning of a new AI development session:

~~~text
We are continuing development of my Mini-Store POS Learning Project.

Repository:
kentvillamora-dev/mini-store-pos-learning

This is a from-scratch learning project. Do not copy or reconstruct source
code from my separate production Mini-Store POS repository.

Before giving development instructions or proposing code changes, ground
yourself in the current GitHub repository.

Please follow this startup procedure:

1. Read README.md completely and follow its project, learning, Git, and
   documentation rules.
2. Inspect the permanent documentation under docs/, if present.
3. Inspect docs/checkpoints/, if present, and identify the latest applicable
   checkpoint using its date, contents, and relationship to the current task.
4. Read that checkpoint completely to determine:
   - what has been completed;
   - what has been verified working;
   - known issues or errors;
   - where development stopped; and
   - the exact next action.
5. Inspect the actual current source files relevant to that next action.
6. Reconcile the checkpoint and documentation against the live code. The
   repository code is authoritative if there is a discrepancy.
7. Do not reconstruct source code from conversation memory, historical
   snippets, checkpoint examples, or the separate production POS.
8. Do not make any code changes yet.

After completing the review, provide a concise Session Grounding Report
containing:

- current repository branch and latest commit reviewed;
- latest applicable checkpoint, or state that none exists;
- current development state;
- current build/error state, if documented;
- relevant source files inspected;
- discrepancies between documentation, checkpoint, and live code;
- exact next action specified by the checkpoint, or the smallest safe next
  action if no checkpoint exists; and
- whether it is safe to resume development.

Learning rules:

- Teach through small, practical steps.
- Explain both syntax and semantics when introducing a concept.
- Prefer hints, pseudocode, and focused examples before complete solutions.
- Do not write routine learning code for me unless I explicitly request it.
- Explain what each terminal command does, why it is needed, the expected
  result, and how to verify success.
- Preserve professional global styling as part of the application shell.
- Keep the implementation independent from the production POS codebase.
- Include clear verification instructions for every meaningful step.
- Use Git deliberately: inspect, verify, stage intentionally, review, commit,
  push, and confirm local/remote integrity.

Wait for my confirmation after the Session Grounding Report before proceeding
with the next development step.
~~~

## Guiding Principle

> Build a credible solution to an immediate workflow need, understand each layer required to make it work, and carry the resulting method into other business applications.