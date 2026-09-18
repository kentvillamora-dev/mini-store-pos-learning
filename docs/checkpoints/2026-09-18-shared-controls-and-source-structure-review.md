# Checkpoint — Shared Controls and Source-Structure Review

**Date:** 2026-09-18  
**Session focus:** Replicate product-category controls in Sales, establish the Inventory auxiliary-control structure, and review source-code ownership before continuing Inventory filtering.

## Current repository state reviewed

The pushed `main` branch was reviewed before creating this checkpoint.

Relevant current source structure:

```text
src/
├── App.tsx
├── App.css
├── index.css
├── main.tsx
└── components/
    ├── inventory/
    │   ├── InventoryView.tsx
    │   ├── InventoryView.css
    │   ├── InventoryTable.tsx
    │   ├── InventoryTable.css
    │   ├── defaultProducts.ts
    │   └── productTypes.ts
    ├── records/
    │   └── RecordsView.tsx
    └── sales/
        └── SalesView.tsx
```

## Completed work

### Sales category controls

`SalesView.tsx` now derives product categories from `defaultProducts`, owns a `selectedCategory` state, and renders the same category-selection pattern currently used by Inventory:

- an explicit `All` button;
- one button for each unique product category;
- active-button styling based on `selectedCategory`; and
- click handlers that update the selected category.

The Sales product-selection area does not yet consume `selectedCategory`. The current work establishes the controls only.

### Shared Primary Controls sizing

The shared `.primary-controls-area > button` rule in `App.css` now includes:

```css
min-height: 32px;
```

This gives Primary Control buttons across Sales, Inventory, and Records a common minimum height while still allowing labels to wrap when necessary.

### Inventory Auxiliary Controls structure

`InventoryView.tsx` now divides `.auxiliary-controls-area` into three distinct regions:

1. `.product-subcategory-filters`
2. `.low-stock-filters`
3. `.add-product-area`

Current contents are:

- Product Subcategory Filters: placeholder text only;
- Low Stock Filters: `All`, `Low`, and `Out` buttons;
- Add Product Area: `Add Product` button.

`InventoryView.css` contains the current presentation rules for these Inventory-specific regions.

The intended distinction is that both Primary Controls and Auxiliary Controls belong to the active view. In Inventory:

- Primary Controls currently provide the main category filter;
- Auxiliary Controls provide more granular Inventory controls and actions;
- row-level actions such as `Restock` and `Modify` remain attached to individual products.

No behavior has yet been implemented for the subcategory filters, stock filters, or Add Product button.

## Source-structure review

A structural review identified that the current component organization remains understandable, but shared product-domain files are now located under the Inventory component even though they are no longer Inventory-only.

For example, Sales currently imports:

```ts
import { defaultProducts } from '../inventory/defaultProducts'
```

This works technically, but `defaultProducts` represents application product data rather than something owned by the Inventory view.

The planned source structure is:

```text
src/
├── data/
├── types/
├── features/
└── components/
    ├── inventory/
    ├── records/
    └── sales/
```

Current intended responsibilities:

- **`data/`** — default/static data and lists used to populate the application.
- **`types/`** — custom TypeScript types describing application/domain structures.
- **`features/`** — application behavior or reusable routines whose responsibility is not limited to one particular view.
- **`components/`** — React components and styling dedicated to the three main views: Sales, Inventory, and Records.

The organizing principle is **responsibility/ownership**, not merely file extension or technical reusability.

Do not turn `features/` into a generic destination for every helper function. Behavior that belongs only to one view can remain with that view.

### Files identified for later relocation

`src/components/inventory/defaultProducts.ts` is a clear candidate for:

```text
src/data/defaultProducts.ts
```

`src/components/inventory/productTypes.ts` requires a little more care. Although its name suggests types, it currently exports the runtime `productGroups` object. Runtime classification data and TypeScript types may ultimately have different homes. Resolve that distinction deliberately rather than moving the file based only on its filename.

### Refactors intentionally deferred

Do not introduce additional abstractions merely for symmetry at this stage.

In particular:

- do not extract shared category-filter utilities yet merely because category derivation appears in multiple components;
- do not create shared React components for Primary/Auxiliary Controls merely because they share CSS structure;
- do not add speculative folders such as `hooks/`, `utils/`, `services/`, or `store/` without a concrete responsibility;
- Sales-specific CSS currently remaining in `App.css` can be relocated when Sales styling is developed further.

## Verification state

The pushed source was reviewed through the GitHub repository and the current structure was reconciled against the implementation.

No independent build or lint run was performed while creating this checkpoint. Do not infer a new build/lint result from this checkpoint; run the normal verification after the planned structural changes.

## Known issues / unfinished work

- Sales category selection does not yet filter the Sales product-selection area.
- Inventory Product Subcategory Filters are still a placeholder.
- Inventory stock-filter buttons have no filtering behavior.
- Inventory Add Product button has no behavior.
- Inventory table business-value columns remain placeholders.
- `defaultProducts.ts` and `productTypes.ts` still physically reside under `components/inventory/`.
- Sales currently depends on `../inventory/defaultProducts`, which is the main ownership issue identified by the source-structure review.
- A small trailing-whitespace line was observed in `SalesView.tsx`; it is non-functional cleanup.

## Exact resume point

Before continuing Product Subcategory filtering, perform the planned source-structure cleanup in small steps.

Start by establishing `src/data/` and relocating `defaultProducts.ts` out of the Inventory component folder. Then update only the affected imports and verify that behavior remains unchanged.

Handle `productTypes.ts` separately afterward so the distinction between runtime data and TypeScript-only types can be considered deliberately.

## Next action

**Create `src/data/`, move `src/components/inventory/defaultProducts.ts` to `src/data/defaultProducts.ts`, update its consumers, and verify the application still builds and behaves as before.**
