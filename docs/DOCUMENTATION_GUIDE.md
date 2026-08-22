# Documentation Guide

## Purpose

This document defines where project knowledge belongs so the Mini-Store POS Learning Project remains easy to ground, review, and continue across development sessions.

## Documentation Layers

### `README.md` — Project Orientation

Use the README for stable, high-level context:

- project purpose;
- learning approach;
- reference operating context;
- high-level application scope;
- durable product principles;
- target technology stack;
- Git working principles;
- source-of-truth rules; and
- the new-session grounding prompt.

Do **not** use the README as a progress log or detailed business-rule catalog.

### `docs/PRODUCT_SPEC.md` — Product and Architecture Reference

Use this document for stable requirements and detailed reference behavior:

- operating constraints;
- product/business rules;
- data and transaction principles;
- architecture;
- synchronization and PWA expectations;
- rebuild phases;
- acceptance tests;
- explicit non-goals; and
- unresolved product decisions.

Update it when a stable product decision changes or when reconstruction establishes a deliberate learning-project rule that supersedes earlier reference material.

A capability appearing in the product specification does not mean it has already been implemented.

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

When reviewing the repository, distinguish **implementation truth** from **requirements truth**.

For what currently exists in the application:

1. current repository code;
2. current Git state/history;
3. checkpoint descriptions.

For what the application is intended eventually to do:

1. permanent product documentation;
2. explicit later design decisions recorded in the repository;
3. historical reference material.

If implementation and permanent documentation differ because a feature has not been built yet, record that as development state rather than treating it as a defect.

If implemented behavior intentionally changes a stable requirement, reconcile the permanent documentation explicitly.

## Learning-Project Boundary

The separate production Mini-Store POS may provide business requirements, operational lessons, and quality expectations. Its source code is not a source for this repository.

Do not copy or reconstruct production implementation code. Build each learning-project capability independently using the documented requirements and the concepts being learned.

## Documentation Reconciliation

Before creating a new checkpoint at the end of a meaningful milestone:

1. inspect the live code and Git state;
2. verify build/lint/tests appropriate to the milestone;
3. identify whether a stable product or architecture decision changed;
4. update permanent documentation only if such a stable change occurred;
5. create a new checkpoint describing actual development state; and
6. verify the checkpoint and any permanent-document updates are committed and pushed.
