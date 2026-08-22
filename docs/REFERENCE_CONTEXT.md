# Reference Context from the Earlier Mini-Store POS

## Purpose

This document preserves useful context from the earlier Mini-Store POS so the learning project remains grounded in a real operating environment.

It is **not a product specification** for this repository.

The earlier application's workflows, navigation, business rules, data model, architecture, and implementation choices may be discussed as examples or case studies. They should not be copied automatically. The learning project may simplify, restructure, replace, or reject them as understanding improves.

The durable constraints are the **people, hardware, and operating environment**.

## User Context

The intended users are family members operating a small mini-store in the Davao Region, Philippines.

Important user characteristics:

- primary users may be 50 years old or older;
- users should not need technical knowledge to operate the application;
- routine actions should require little explanation or memorization;
- accidental actions should be difficult where they could affect money or inventory; and
- the interface should make important values and transaction state obvious.

### Design consequences

When evaluating a UI or workflow, prefer:

- large, reliable touch targets;
- readable typography;
- clear language;
- strong visual hierarchy;
- consistent button placement and dimensions;
- few decisions per step;
- minimal repetitive entry;
- obvious confirmation and error states; and
- simple workflows over feature density.

A solution that is technically elegant but confusing to the intended user is not a successful solution.

## Hardware Context

The normal operating terminal is one dedicated Android tablet.

Benchmark device class:

```text
HONOR Pad X8a-class tablet
approximately 11-inch display
4 GB RAM
128 GB storage
Wi-Fi
```

Landscape/tablet operation is the primary design target.

### Design consequences

The application should not be designed as a desktop interface merely reduced to tablet dimensions. Decisions should account for:

- touch rather than mouse-first interaction;
- realistic tablet screen dimensions;
- modest memory and processing resources;
- landscape layout as the primary working view; and
- legibility at normal tablet viewing distance.

Responsive support for narrower devices can be added, but it should not compromise the benchmark tablet experience.

## Operating Environment

The application is intended for day-to-day use in a small family-operated store.

Relevant constraints include:

- internet connectivity may be intermittent;
- one device is the normal operating terminal;
- recurring software/infrastructure cost should remain close to zero where practical;
- there is no initial need for receipt-printer integration;
- enterprise staff-management complexity is not inherently required; and
- the developer should be able to maintain and deploy the project using a lightweight tablet-based development workflow.

The earlier application used offline-first techniques because loss of internet connectivity should not prevent normal store operation. Whether the learning project adopts the same technical architecture should be learned and justified when persistence and offline behavior become active milestones.

## Earlier Application as a Case Study

The previous Mini-Store POS explored problems including:

- product master data;
- selling;
- receiving/restocking inventory;
- pricing;
- transaction history;
- inventory reconciliation;
- offline persistence;
- application updates; and
- low-cost synchronization/reporting.

These are useful **problem examples**, not a required feature list.

When one becomes relevant to the learning project, start with the problem rather than the previous solution:

1. What does the user need to accomplish?
2. What information is actually required?
3. What failure or mistake must be prevented?
4. What is the smallest understandable implementation?
5. What concept does this teach?
6. How will success be verified?

Only after answering those questions should earlier design choices be considered for comparison.

## What May Change

The learning project is explicitly free to change:

- top-level navigation;
- terminology;
- feature scope;
- workflow sequence;
- forms and layouts;
- business rules;
- data structures;
- database schema;
- service boundaries;
- synchronization approach;
- deployment architecture; and
- specific libraries or tools when there is a good learning or product reason.

Any current choice in the learning repository should be treated as a decision at the present stage, not as something inherited permanently from the earlier application.

## What Should Remain Grounded

Changes should still respect the real-world constraints:

> Build for the actual users, on the actual class of hardware, in the actual operating environment.

That context is what makes the learning project more valuable than a generic tutorial application.
