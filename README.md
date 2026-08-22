# Mini-Store POS Learning Project

A from-scratch learning project for developing the skills needed to design, build, validate, deploy, and present professional business-process web applications.

This repository is intentionally separate from the existing production Mini-Store POS. The production application and the reference product specification may inform business requirements, operating constraints, architectural lessons, and quality expectations, but production source code must not be copied or reconstructed in this project.

## Purpose

The immediate goal is to rebuild the capabilities of a practical Mini-Store POS while learning the syntax, semantics, tools, architecture, and decision-making involved in modern web development.

The goal is not line-for-line reproduction of an existing application. Each capability should be reconstructed independently in small vertical slices so the developer understands why the implementation works and can transfer the same methods to other business applications.

The broader goal is to develop a repeatable approach for creating MVPs that solve real business and workflow problems, including inventory systems, audit trackers, appointment tools, job-order systems, customer follow-up applications, training records, approval workflows, and operational dashboards.

## Reference Product Context

The application being used as the learning target is a low-cost, offline-first Progressive Web App for a small family-operated mini-store in the Davao Region, Philippines.

Its operating environment shapes the design:

- one dedicated Android tablet is the normal POS terminal;
- an HONOR Pad X8a-class device, approximately 11 inches with 4 GB RAM / 128 GB storage and Wi-Fi, is the hardware benchmark;
- landscape/tablet use is the primary layout target;
- primary users may be 50+ and should not need technical knowledge;
- internet connectivity may be intermittent;
- normal selling and inventory work must remain possible without internet access;
- no receipt printer is required for the initial product;
- recurring operating cost should remain as close to zero as practical; and
- the interface should favor touch, legibility, obvious transaction state, few decisions per step, and minimal repetitive entry.

The defining architectural principle is that the store must remain operational without internet access. Local IndexedDB data is therefore the operational source of truth. Cloud services are secondary synchronization, reporting, and recovery infrastructure rather than a dependency for normal transactions.

Detailed product behavior, architecture, business rules, rebuild phases, acceptance criteria, non-goals, and unresolved decisions are maintained in [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md).

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

The reference product specification is a requirements and architecture guide, not permission for AI to generate the entire application. AI must not retrieve, copy, or reconstruct implementation code from the separate production POS repository.

## Application Scope

The application has exactly three primary areas:

1. **Sales** — product selection, cart management, and sales transactions.
2. **Inventory** — product and supplier master data, receiving stock, opening inventory, procurement, pricing, and inventory controls.
3. **Records** — durable records and ledgers for sales, inventory, procurement, products, suppliers, and related operational history.

The professional three-tab application shell is the starting interface. Product Master Management — creating and maintaining the store's sellable product catalog — inside the Inventory tab is the first business workflow.

A Product describes what the store sells. It is distinct from the quantity currently in stock. Stock changes should ultimately be explainable through durable business transactions and inventory movements rather than unexplained edits to a quantity field.

Later vertical slices introduce procurement, opening inventory, sales, voids/refunds, inventory reconciliation, pricing, offline PWA behavior, and non-blocking synchronization. These capabilities should be introduced only when the active learning milestone reaches them.

## Product Principles

The reference application is governed by a small set of durable principles:

- **Offline first.** Core business workflows must not require a network connection.
- **Local data is operationally authoritative.** IndexedDB/Dexie is the live transaction store.
- **No silent data loss.** Durable business records should be preserved and reversed or voided where appropriate rather than casually deleted.
- **Stock changes must be explainable.** Inventory movements form the audit trail; cached stock is an operational convenience.
- **Transactions should be atomic.** Related records and stock changes should succeed or fail together.
- **Simple beats clever.** The application serves a family mini-store, not an enterprise ERP.
- **Tablet-first UX.** Touch targets, typography, layout, and workflows should suit the benchmark tablet and its users.
- **Exactly three top-level tabs.** Sales, Inventory, and Records remain the stable navigation model.
- **Restrained professional styling.** Avoid bright-blue-heavy treatment; favor clear hierarchy, legibility, and deliberate use of accent color.
- **Low recurring cost matters.** Added infrastructure must justify its operational cost and complexity.

## Rebuild Boundary

This repository rebuilds **capabilities and understanding**, not production source code.

When a workflow from the reference product is reached:

1. understand the operating problem and business rule;
2. define the smallest useful data and UI contract;
3. learn the concepts required to implement it;
4. implement the smallest independent vertical slice;
5. build and test it;
6. inspect the resulting behavior and persisted data where applicable; and
7. continue only after the developer can explain the important implementation choices.

Do not silently invent unresolved business rules. Record decisions explicitly when reconstruction reaches them.

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

This README is a **static project-orientation document**. It describes the project purpose, learning rules, reference operating context, intended scope, target stack, and session-grounding procedure.

Do not use this README as a development-progress log or as the detailed product specification.

Permanent product and architecture documentation belongs under:

~~~text
docs/
~~~

The principal reference is:

~~~text
docs/PRODUCT_SPEC.md
~~~

It records stable product requirements, business rules, architecture, rebuild phases, acceptance criteria, non-goals, and unresolved decisions. Permanent documentation should be updated when a stable project decision changes, not merely to record routine progress.

Development progress belongs in chronological checkpoint documents stored under:

~~~text
docs/checkpoints/
~~~

Checkpoint documents should record what was implemented, what was verified, current errors, important decisions, relevant files, unfinished work, the exact resume point, and one concrete next action.

Create a new checkpoint rather than overwriting an earlier checkpoint. Checkpoint descriptions are historical reference only; current repository code remains authoritative.

## Source-of-Truth Order

When sources disagree, use this priority:

1. current repository code for what is actually implemented;
2. permanent repository documentation for intended product behavior and stable decisions;
3. latest applicable checkpoint for development state and resume point;
4. Git history; and
5. AI conversation history.

Conversation memory must never override the repository.

A difference between live code and the product specification is not automatically an error: the learning project may simply not have reached that capability yet. When implemented behavior intentionally changes a stable product rule, reconcile the permanent documentation explicitly.

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
   repository code is authoritative for what is currently implemented.
7. Treat permanent product documentation as requirements context, not as
   permission to copy or reconstruct production source code.
8. Do not reconstruct source code from conversation memory, historical
   snippets, checkpoint examples, or the separate production POS.
9. Do not make any code changes yet.

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
