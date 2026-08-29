# Checkpoint — 2026-08-29 — Product Master Type Definitions

## Milestone status

Development has moved from the completed application shell into the first Inventory business workflow: Product Master Management. The current implementation establishes the table skeleton and compile-time category/subcategory validation needed before default product data is introduced.

## What has been implemented

- The three application views are modularized under `src/features/`:
  - Sales
  - Inventory
  - Records
- `InventoryView` renders a dedicated `InventoryProductTable` component.
- `InventoryProductTable` currently defines the Product Master table skeleton with these visible columns:
  - Products
  - Stock
  - Unit Cost
  - SRP
  - Sell Price
- The table body is intentionally empty; default product records have not yet been added or rendered.
- `src/features/inventory/productTypes.ts` defines `ProductCategory` as a TypeScript string-literal union containing the nine approved top-level categories.
- The same file defines `ProductSubCategory` as a string-literal union containing the current approved subcategory names.
- The category and subcategory types are intentionally a simple validation approach: each value is constrained independently. TypeScript does not yet enforce which subcategories belong to which parent category.

## Product taxonomy decisions established before implementation

The initial default-product list was designed from common sari-sari-store products before being translated into code. Product naming follows this principle:

> Use the shortest recognizable product name that remains distinct. Add product family, flavor, size, or another modifier only when needed for identification.

Category and subcategory design is operational rather than based on formal supermarket taxonomy. Groupings should reflect how products are recognized, bought, priced, displayed, and located in the target sari-sari store.

Examples of deliberate local conventions include:

- powdered drinks grouped with Coffee & Milk rather than refrigerated Beverages;
- snack subcategories that distinguish Small Chips and Big Chips because price point is a practical buying/search distinction;
- soup-style instant noodles described as Instant Mami, matching common local terminology;
- oyster sauce treated as a Seasoning based on local cooking use;
- Egg retained as a Staple;
- Detergent Bar kept distinct from Detergent Powder because detergent bars remain a meaningful low-cost product class.

The working taxonomy includes nine top-level categories:

- Snacks
- Beverages
- Coffee & Milk
- Instant Noodles
- Canned Goods
- Cooking Essentials
- Household Cleaning
- Personal Care
- Miscellaneous

## Current type definitions

`ProductCategory` and `ProductSubCategory` currently provide compile-time validation for developer-authored product data. They are not runtime validation and do not create or enforce a database schema.

The intentionally simple implementation permits a category and subcategory that are individually valid but logically mismatched. Stronger category-to-subcategory type coupling is deferred until a concrete requirement justifies the added complexity.

## What has been verified

Repository reviewed at `main` commit:

- `3f31ff4` — Saved the actual code edit for productTypes.ts

Relevant live source confirmed in the repository:

- `src/App.tsx`
- `src/features/inventory/InventoryView.tsx`
- `src/features/inventory/InventoryProductTable.tsx`
- `src/features/inventory/productTypes.ts`
- `src/features/sales/SalesView.tsx`
- `src/features/records/RecordsView.tsx`
- `src/index.css`

The repository tree is coherent with the current modular application structure. `productTypes.ts` is now non-empty and contains both exported union types.

## Build / lint status

- `npm run build`: PASS, confirmed by the user on 2026-08-29 after saving and pushing the corrected `productTypes.ts`.
- Development app: previously confirmed running successfully on the new Linux Mint / VS Code environment.
- `npm run lint`: not confirmed in the current session.

## Environment / workflow note

During this session, a VS Code editor-save issue was identified. Two commits were initially pushed while `productTypes.ts` remained an empty file in Git because the editor contents had not been saved to disk. The code was then explicitly saved and pushed in commit `3f31ff4`.

For the current VS Code environment, save edited files before relying on `git status`, `git diff`, build verification, or committing.

## Known issues / cleanup

- `src/App.css` still exists as an empty 0-byte file. This is a pre-existing non-blocking cleanup item from the previous checkpoint.
- No current lint result has been recorded.
- No default product records are present in source yet.
- Category and subcategory are data properties; they do not need to become repeated table columns. Their eventual visual grouping should be treated as a separate React rendering decision so tablet width is not wasted by repeating category labels on every product row.

## Exact resume point

The category and subcategory validation types are complete enough for the current learning stage. The next concept is to define the shape of one Product record by combining:

- `name: string`
- `category: ProductCategory`
- `subcategory: ProductSubCategory`

After that type is understood and verified, create the default product collection from the finalized product taxonomy and then separately teach/render that collection through `InventoryProductTable`.

Do not introduce IndexedDB/Dexie yet unless the learning sequence reaches a concrete persistence requirement.

## Next concrete action

Define a `Product` TypeScript type/interface using the existing `ProductCategory` and `ProductSubCategory` types. Build and verify it before adding the full default-product dataset or changing the table rendering.
