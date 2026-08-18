# Mini-Store POS Learning Project

A from-scratch learning project for developing the skills needed to design, build, validate, deploy, and present professional business-process web applications.

This repository is intentionally separate from the existing production Mini-Store POS. The production app may inform business requirements and quality expectations, but its source code will not be copied into this project.

## Why This Project Exists

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

AI will primarily act as a requirements challenger, tutor, debugging partner, code reviewer, test-case generator, and security or data-integrity reviewer.

Routine learning code should be written and understood by the developer. Assistance should normally progress from conceptual hints to focused examples before a complete solution is provided.

## Initial Application Structure

The application will have three primary tabs:

1. **Sales**
2. **Procurement**
3. **Inventory**

The first milestone will create a professional and responsive application shell. Sales and Procurement may initially contain placeholder content while Inventory becomes the first functional area.

## Milestone 1 — Professional Application Shell

The first user-visible build will include:

- a clear application identity;
- three working primary tabs;
- an unmistakable active-tab state;
- semantic HTML structure;
- professional global styling;
- readable typography;
- consistent spacing and controls;
- tablet-first responsive behavior;
- keyboard-visible focus states; and
- a successful production build.

The shell should be credible enough for an early client demonstration even before its business workflows are complete.

## First Business Workflow

After the application shell, the first complete vertical slice will be **Product Master Management** inside Inventory:

```text
Open Inventory
→ View existing Products
→ Choose Add Product
→ Enter required information
→ Validate the information
→ Save the Product
→ See the Product in the list
```

A Product describes what the store sells. It is not the same as the quantity currently in stock. Later workflows such as Procurement, Sales, Refunds, Voids, and Inventory Adjustments should explain why stock changes.

## Technology Direction

Technologies will be introduced when a milestone creates a practical need for them.

- **Vite** — development server and production build
- **React** — component-based user interface
- **TypeScript** — explicit data shapes and safer code
- **Plain CSS** — visual design and responsive layout
- **Dexie / IndexedDB** — offline browser persistence
- **Git and GitHub** — version control and source history
- **GitHub Pages / Actions** — deployment
- **PWA capabilities** — installation and offline application shell
- **Google Apps Script / Sheets** — later synchronization and reporting

The project will not begin with a CSS framework, global state library, separate backend, or copied production code.

## Development Environment

Primary development environment:

```text
Samsung Android tablet
→ Termux
→ code-server
→ browser-based VS Code interface
→ local Git repository
```

GitHub Codespaces may be used as a backup. GitHub remains the durable source of truth, while each development environment is a working copy that must be checked against the remote repository.

## Git Learning Goals

This project will be used to practice responsible Git habits:

- inspect repository state before acting;
- work on one logical change at a time;
- review changed files before staging;
- verify work before committing;
- stage files intentionally;
- write concise, meaningful commit messages;
- push only understood and verified work;
- compare local and remote state; and
- keep generated files and secrets out of version control.

## Deferred Features

The first milestone deliberately excludes Product forms, database persistence, Categories, Suppliers, Procurement transactions, Sales, inventory movements, authentication, PWA caching, Google Sheets synchronization, barcode scanning, and advanced visual effects.

## Current Status

**Planning complete. Repository created; initial project setup is next.**

Next milestone:

> Verify the Termux development environment, initialize a Vite React TypeScript project, inspect the generated files, and begin the semantic HTML structure for the professional three-tab application shell.

## Guiding Principle

> Build a credible solution to an immediate workflow need, understand each layer required to make it work, and carry the resulting method into other business applications.
