# Checkpoint — Inventory Scrollbar Clean Slate

Date: 2026-09-01

## Session state

The Inventory Product Master UI is currently at a deliberate clean-slate point for learning how to scope table scrolling correctly.

The repository was rolled back from the exploratory scrollbar troubleshooting changes so the implementation can be rebuilt one concept at a time. Current commit `f5112ac` has the same project tree as commit `6472848` (`Added wrapper to product table to localize vertical scroll bar`). The intermediate troubleshooting commit remains in Git history but its changes are not present in the current project tree.

## Current Inventory UI state

- Inventory category buttons and category filtering are working.
- The active category button has a distinct accent background and contrast text.
- Category buttons have fixed `100px` widths.
- The search input uses the remaining horizontal space and wraps with the category controls when necessary.
- The search field is currently UI/layout only; search behavior has not yet been implemented.
- The product table is grouped by category.
- The product table has a wrapper named `inventory-product-table-container`.
- The wrapper currently has `overflow-y: auto`, but it does not yet have a constrained vertical size.
- With `All` selected, the document/page currently owns the vertical scrollbar. Scrolling therefore moves the navigation and category controls offscreen.
- Selecting a short category can make the page scrollbar disappear.
- This behavior is the intentional baseline for the next learning session.

## Important troubleshooting history

A previous attempt added a Flexbox height chain using properties such as `min-height: 0`, `display: flex`, `flex: 1`, and `overflow: hidden`. A typo in the CSS selector (`.invetory-section` instead of `.inventory-section`) prevented the section rules from applying and obscured which properties were actually necessary.

The completed version did eventually produce the desired scoped vertical scrollbar after correcting the typo, but the implementation was intentionally rolled back. Do not simply reconstruct that solution from the old troubleshooting commit. Rebuild the behavior progressively from the current clean baseline so the purpose and effect of each property can be observed and understood.

## Learning/style decision

For TypeScript and TSX, use single quotes by default for quoted string values, including JSX attribute values. Use backticks when template literals are required. The purpose of this convention is consistency and reduced cognitive overhead while learning.

## Next-session startup

Before making any local development changes, remind the user to pull the repository because this checkpoint document was committed directly to GitHub after the user's last local push. The local working copy will therefore be behind the repository by this documentation commit.

Recommended command after confirming the local working tree is clean:

```bash
git pull --ff-only
```

Then verify alignment before editing.

## Exact resume point

Start by learning how to properly scope the Product Master table's scrollbar so that scrolling belongs to the product-table region rather than the entire page. The immediate practical problem is vertical scrolling of the long product list while keeping the main navigation and Inventory category/search controls stationary.

Proceed from the current baseline one small change at a time. Explain what each CSS property does, what behavior is expected before testing, and wait for the user's observed result before introducing the next property.

Do not jump directly to the previously discovered multi-property Flexbox solution.
