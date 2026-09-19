# Checkpoint — Pre-Restart Implementation Baseline

**Date:** 2026-09-19
**Session focus:** Preserve the first implementation iteration and establish an intentional clean restart while retaining project documentation and Git history.

## Decision

The Mini-Store POS Learning Project will restart its application implementation **inside the existing repository**.

This is an intentional learning and design decision, not a rollback and not a new project.

The repository, Git history, permanent documentation, and checkpoint history are retained. The current application implementation represents the end of the first learning iteration and will remain recoverable through Git history after the source files are reset.

## Why the implementation is restarting

The first implementation iteration successfully exposed several important design questions that were not clear when development began.

In particular, the project now has a clearer understanding of:

- the distinction between view-owned UI and shared product-domain behavior;
- the distinction between bundled default product data and persistent operational data;
- product lifecycle and decommissioning;
- immutable historical business records;
- initialization versus an intentionally empty product list;
- maintenance operations such as creating a new product list or reverting to defaults;
- disaster recovery from Google Sheets backup;
- the relationship between simple user actions such as Restock/Modify and the business/audit events they may create; and
- the need to organize source files according to responsibility and ownership rather than allowing early implementation structure to become permanent by inertia.

Rather than continue refactoring an implementation built before these decisions were understood, the project will rebuild the application incrementally from a clean source baseline.

## Documentation preserved

All existing project documentation remains part of the project history.

Permanent documentation currently includes README.md, docs/DOCUMENTATION_GUIDE.md, docs/REFERENCE_CONTEXT.md, and docs/APPLICATION_DESIGN.md.

docs/APPLICATION_DESIGN.md was added immediately before this checkpoint to capture durable application-level decisions established during the design discussion.

The existing files under docs/checkpoints/ remain historical records of the first implementation iteration. They should not be deleted merely because the implementation is restarting.

## Authority after the restart

The restart does **not** make the old source implementation a blueprint for rebuilding the application.

When rebuilding:

1. current permanent project documentation and explicit current decisions define the intended direction;
2. new source code should be developed from first principles as part of the learning process;
3. previous checkpoints may explain historical reasoning but do not require reproduction of the old implementation;
4. old source code remains available through Git history for historical reference, not for copying forward by default; and
5. the separate production Mini-Store POS repository remains outside the learning project's implementation source of truth.

The learning project must continue to be built independently rather than reconstructing the production application.

## First implementation iteration — stopping point

Immediately before the restart decision, the application had reached the following broad state:

- React + TypeScript + Vite application scaffold;
- Sales, Inventory, and Records top-level views;
- a presentable tablet-oriented application shell;
- shared Primary Controls presentation;
- Sales and Inventory product-category controls;
- an Inventory table grouped by product category;
- working Inventory category filtering;
- Inventory auxiliary-control regions for subcategory filters, stock-level filters, and Add Product;
- bundled default product data under the Inventory component structure; and
- early discussion of reorganizing source files into data/, types/, features/, and view-specific components/.

The immediately preceding checkpoint was docs/checkpoints/2026-09-18-shared-controls-and-source-structure-review.md.

Its planned source refactor is now superseded by the decision to restart the implementation cleanly.

## Verification state

No source files were changed as part of creating this checkpoint.

No fresh build or lint run was performed for this checkpoint. The purpose of this checkpoint is to mark the implementation boundary before the clean restart.

## Restart constraints

The clean restart must preserve the project's established learning workflow:

- proceed in small implementation steps;
- introduce one implementation step at a time;
- explain new syntax and concepts rather than merely supplying finished code;
- verify behavior as the application is rebuilt;
- use Git deliberately to preserve meaningful milestones; and
- avoid speculative abstractions until the application demonstrates a concrete need for them.

The restart should also preserve the project's durable operating constraints and user-centered design direction documented elsewhere in the repository.

## Exact resume point

The next action should establish the **clean source baseline**.

Before deleting or replacing application files, inspect the repository root and current scaffold files and decide deliberately which files belong to:

- project/tooling infrastructure that should remain;
- documentation that must remain; and
- first-iteration application implementation that should be removed or reset.

Do not begin rebuilding features during that cleanup step.

## Next action

**Inspect the repository root and current application scaffold, identify exactly which files will be preserved versus reset, and agree on the clean source baseline before deleting any implementation files.**
