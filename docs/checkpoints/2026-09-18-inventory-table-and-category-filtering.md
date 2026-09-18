# Checkpoint — Inventory Table and Category Filtering

**Date:** 2026-09-18

## Session focus

Continue from the presentable application shell and implement the first functional Inventory content: a semantic product table, local table scrolling, category grouping, and category-based filtering.

The work remained within the learning project's current source and requirements. No implementation was copied or reconstructed from the separate production Mini-Store POS.

## Repository state at checkpoint

The latest user-pushed implementation commit reviewed before creating this checkpoint was:

- `2844b3006ee9229ebc29d388ccb553b71a0f3f5c` — `Implemented filtering of Inventory Table via Props`

The user reported that both `npm run build` and `npm run lint` passed before pushing the session edits.

## What was completed

### Source organization

- The earlier `src/features/` folder was renamed to `src/components/`.
- `App.tsx` imports the Sales, Inventory, and Records views from `src/components/`.
- Application-shell styling was moved from `index.css` into `App.css`, and `App.tsx` now imports `./App.css`.
- `index.css` retains root design tokens and document/root-level styling.
- Inventory table-specific styling is isolated in `InventoryTable.css`.

### Inventory table component

The Inventory table was separated into its own component:

- `src/components/inventory/InventoryTable.tsx`
- `src/components/inventory/InventoryTable.css`

The table currently has six columns:

1. Product
2. Stock
3. Unit Cost
4. Retail Price
5. Profit Margin
6. Action

Only Product currently has product data. The other business-value columns intentionally use `-` placeholders for now.

Each product row currently includes two non-functional action buttons:

- Restock
- Modify

No inventory mutation behavior has been implemented yet.

### Product data and category grouping

`InventoryTable` reads the existing `defaultProducts` data.

Unique categories are derived with:

```tsx
const categories = [...new Set(defaultProducts.map((product) => product.category))]
```

The table renders categories as full-width separator rows using `colSpan={6}`.

A React `Fragment` groups each category row with the product rows belonging to that category without introducing invalid wrapper markup inside `<tbody>`.

Products for each displayed category are selected with `.filter()` and then rendered with `.map()`.

Category rows use the class `.inventory-category-row` and are visually distinguished with the `--color-subheader` design token.

### Local table scrolling

The Inventory product list now scrolls inside its allocated content region rather than extending the whole browser page.

The working flex/overflow chain requires `min-height: 0` at all relevant shrinking boundaries:

- `main`
- `main > section`
- `.inventory-table-container`

The table container also uses:

```css
overflow-y: auto;
```

An important learning result from this session was that applying `min-height: 0` only to the table container and section was insufficient. `main`, itself a flex item inside `#root`, also needed permission to shrink below its content's intrinsic height.

### Sticky table header

The table header remains visible while the product rows scroll.

The `th` cells use:

```css
position: sticky;
top: 0;
```

### Shared Primary Controls presentation

`.primary-controls-area` remains an application-level shared region in `App.css`.

Its controls now use a shared flex layout. Direct child buttons:

- share the available width equally with `flex: 1`;
- use the shared button color;
- use contrasting text;
- use the application font;
- currently use `font-size: 0.8rem`;
- use a bold/semibold presentation;
- have an `.active` state using the application accent color.

This shared styling is intended to be available to Primary Controls across Sales, Inventory, and Records.

### Inventory category filter controls

`InventoryView` derives its category filter buttons from `defaultProducts` rather than hard-coding category labels.

It renders:

- an explicit `All` button; and
- one button for each unique product category.

This means the category button labels follow the category values in the current product data.

### Category selection state

`InventoryView` owns the selected category:

```tsx
const [selectedCategory, setSelectedCategory] = useState('All')
```

Clicking a category button updates this state. The selected button receives the `active` class.

This establishes the intended responsibility split:

```text
InventoryView
├── owns selectedCategory
├── renders category filter controls
└── passes selectedCategory to InventoryTable
                         ↓
InventoryTable
└── decides which category groups to render
```

### Parent-to-child props

`InventoryView` passes the selected category to the table:

```tsx
<InventoryTable selectedCategory={selectedCategory} />
```

`InventoryTable` declares the prop with:

```tsx
type InventoryTableProps = {
  selectedCategory: string
}
```

and receives it through destructuring.

The table determines the categories to render with:

```tsx
const displayedCategories = selectedCategory === 'All' ? categories : [selectedCategory]
```

Selecting a specific category therefore displays only that category header and its products. Selecting `All` restores all category groups.

## Learning points reinforced

### Derived UI avoids duplicated category labels

Both the table grouping and the Inventory category controls currently derive their category names from `defaultProducts`. This avoids manually maintaining a separate list of button labels.

There is currently duplicated category-derivation logic in `InventoryView` and `InventoryTable`. This is known and should not be refactored merely for abstraction's sake; revisit it when a clearer source-of-truth requirement emerges.

### State belongs where the interaction is owned

The category selection state lives in `InventoryView` because the filter controls belong to that view. The child table receives the selected value through a prop and uses it only to determine its display.

### React list rendering

The session introduced/reinforced:

- `.map()` for generating UI from arrays;
- `.filter()` for selecting matching products;
- `Set` for unique category values;
- spread syntax to convert the Set back into an array;
- `Fragment` for returning multiple table rows from one category iteration;
- `key` placement on the top-level value returned by `.map()`;
- props for parent-to-child data flow;
- `useState` for interactive selection state.

### Semantic table structure

Category separators use one `<td>` with `colSpan={6}` rather than creating five empty cells. This correctly represents a category heading spanning the full table width.

## Current live-code observations

At this checkpoint:

- `defaultProducts` remains the temporary source of product names/categories/subcategories.
- Product names are still used as React keys for product rows. A durable product identifier has not been designed yet.
- Stock, Unit Cost, Retail Price, and Profit Margin remain placeholders.
- Restock and Modify buttons have presentation only.
- The global header search remains a placeholder.
- Inventory Auxiliary Controls still contains the text `Inventory Auxiliary Controls`.
- `InventoryView.css` is currently empty/not needed by the current Inventory view.
- Sales-specific temporary CSS remains in `App.css` with a comment indicating it should eventually move to an appropriate stylesheet.
- The root font size is not explicitly set; `rem` values therefore remain relative to the browser/root computed font size.

## Verification status

Before requesting this checkpoint, the user reported:

- `npm run build` passed;
- `npm run lint` passed;
- all session implementation edits were pushed.

The assistant reviewed the pushed source at commit `2844b3006ee9229ebc29d388ccb553b71a0f3f5c`.

No independent local build or lint execution was performed by the assistant.

## Exact resume point

The Inventory table and category filtering are complete for the current milestone.

The next session should begin by grounding from the repository and this checkpoint, then continue with the **Inventory Auxiliary Controls area**.

Before implementing controls, determine the responsibility of that area: which Inventory-specific actions belong there and how those responsibilities differ from:

- category filtering in Primary Controls;
- the global search area in the application header; and
- row-level Restock/Modify actions in the Inventory table.

Do not add auxiliary-control functionality until that responsibility is agreed.

Continue the learning rule: implement one small step at a time, explain introduced syntax and semantics, verify the result, then proceed.
