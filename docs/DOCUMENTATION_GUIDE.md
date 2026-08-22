# Documentation Guide

## Purpose

This document defines where project knowledge belongs so the Mini-Store POS Learning Project remains easy to ground, review, and continue across development sessions.

The central documentation rule is:

> **The hardware, user demographic, and operating environment are durable constraints. The application's structure and solution may evolve as learning progresses.**

## Documentation Layers

### `README.md` — Project Orientation

Use the README for stable, high-level context:

- the primary learning goal;
- user demographic constraints;
- hardware benchmark;
- operating-environment constraints;
- learning approach;
- current technology direction;
- Git working principles;
- source-of-truth rules; and
- the new-session grounding prompt.

Do **not** use the README as a progress log or as a fixed specification of workflows, business logic, or architecture.

### `docs/REFERENCE_CONTEXT.md` — Earlier-App Context

Use this document to preserve useful context from the previous Mini-Store POS.

The durable parts are primarily:

- intended users;
- benchmark hardware;
- store environment;
- connectivity realities;
- cost constraints; and
- examples of real operational problems encountered previously.

Earlier workflows, feature lists, database structures, business rules, navigation, and architecture are **reference examples only**. They are not requirements for the learning project.

When earlier behavior is relevant, start from the underlying user problem and design a solution from first principles.

### `docs/checkpoints/` — Development Continuity

Use checkpoints for chronological development state.

Each new checkpoint should record:

1. date and milestone/topic;
2. what was implemented;
3. what was verified working;
4. build/lint/test state;
5. known issues or errors;
6. important decisions made;
7. relevant files;
8. unfinished work;
9. exact resume point; and
10. one concrete next action.

Do not overwrite historical checkpoints merely because later work makes them outdated. Their purpose is to record what was known at that point in time.

## Source-of-Truth Rules

For what currently exists in the application:

1. current repository code;
2. explicit decisions documented in this learning repository;
3. latest applicable checkpoint;
4. Git history; and
5. conversation history.

For design constraints, distinguish between **problem constraints** and **solution choices**.

### Durable problem constraints

Treat these as stable unless the actual operating environment changes:

- intended user demographic;
- benchmark hardware;
- tablet-first usage;
- intermittent connectivity;
- low recurring-cost objective; and
- real mini-store operating context.

### Evolving solution choices

These may change freely when the learning process supports a better design:

- navigation;
- workflows;
- terminology;
- business rules;
- data model;
- database schema;
- component/service organization;
- synchronization approach;
- deployment architecture; and
- feature scope.

Do not treat a difference from the previous production application as a defect.

## Learning-Project Boundary

The separate production Mini-Store POS may provide examples of problems, operating lessons, and quality expectations. Its source code and architecture are not sources for this repository.

Do not copy or reconstruct production implementation code.

When considering a previous solution, ask:

1. What user problem was it solving?
2. Does that problem still matter here?
3. What concept do we need to learn to solve it?
4. Can we design a simpler or clearer solution from first principles?
5. How will we verify that the result works for the intended users and hardware?

## Documentation Reconciliation

Before creating a new checkpoint at the end of a meaningful milestone:

1. inspect the live code and Git state;
2. verify build/lint/tests appropriate to the milestone;
3. identify any new learning-project decisions;
4. update permanent documentation only if a durable constraint or documentation rule changed;
5. record evolving implementation/design decisions in the checkpoint when appropriate;
6. create a new checkpoint describing actual development state; and
7. verify the checkpoint and any permanent-document updates are committed and pushed.

Avoid turning temporary implementation decisions into permanent requirements prematurely.
