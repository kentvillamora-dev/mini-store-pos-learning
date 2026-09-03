# Checkpoint — Landscape Application Shell

Date: 2026-09-03

## Session state

The project has moved away from the earlier Inventory-specific scrollbar exercise and is now establishing a clean application-wide layout skeleton from first principles.

The current goal is to reproduce the basic landscape structure shown in the layout design before implementing or styling the view-specific controls and content in detail.

The latest user code commit before this checkpoint is `b748669` (`Added basic styling to header elements`). The user reports that the current project passes both `npm run build` and `npm run lint` locally.

## Layout decisions established this session

The landscape application is organized conceptually as:

1. Header
   - Main Navigation
   - Auxiliary Information
2. Primary / Section Controls
3. Auxiliary Controls
4. Main Content

The header is application-wide. The Primary Controls, Auxiliary Controls, and Main Content are view-specific and will be addressed while implementing each individual view rather than being fully styled as part of the global shell.

The layout should primarily target a 16:10 landscape tablet while scaling proportionally with available screen size. At this stage, prefer a simple Flexbox-based layout rather than introducing `clamp()`, complex responsive sizing, Grid, or elaborate breakpoints.

## Height model learned and implemented

The current global CSS establishes the viewport height chain with:

```css
html,
body,
#root {
  height: 100%;
  margin: 0;
}
```

`#root` is a vertical Flexbox container. Its direct children are the application `<header>` and `<main>`.

`main` uses `flex: 1`, so the header keeps its natural/content-driven height while main consumes the remaining viewport height. Main is itself a column Flexbox container.

Each view currently renders its controls and one direct `<section>` into `<main>`. The selector:

```css
main > section {
  flex: 1;
  display: flex;
}
```

therefore lets the main-content section consume the remaining vertical space after the view-specific controls.

Important concept learned: `flex: 1` grows along the parent Flexbox's main axis. It does not inherently mean width or height.

## Shared view structure

Inventory and Records now use common class names for their control regions:

- `primary-controls-area`
- `auxiliary-controls-area`

Their main content is represented by a direct `<section>` rather than a view-specific `main-content` class.

Sales now follows the same outer structure but its `<section>` contains two child regions:

- `sales-product-selection`
- `sales-checkout-cart`

This keeps the application shell consistent while allowing Sales to have a view-specific internal main-content layout.

## Current Sales proportional layout

The Sales main-content `<section>` is a Flexbox container. For the current landscape skeleton:

```css
.sales-product-selection {
  flex: 2;
}

.sales-checkout-cart {
  flex: 1;
}
```

This gives the Product Selection and Checkout Cart regions an approximate 2:1 horizontal relationship.

These Sales-specific rules are temporarily in `index.css` while the basic skeleton is being established. They should eventually be moved to a Sales-specific stylesheet. Do not treat their current file location as a permanent architectural decision.

## Header structure and current styling

The header is now a horizontal Flexbox container.

Its two direct conceptual regions are:

- `<nav>` — `flex: 1`
- `.auxiliary-information-box` — `flex: 2`

This creates an approximate 1:2 horizontal relationship between Main Navigation and Auxiliary Information.

The navigation is also a Flexbox container, and each navigation button uses `flex: 1`, dividing the navigation region equally among Sales, Inventory, and Records.

The auxiliary-information region currently contains placeholder elements for:

- Search Bar Portal
- Sync Status

The search-bar portal uses `flex: 1`, allowing it to consume the remaining horizontal space beside the sync-status area.

## CSS loading lesson

A stylesheet existing beside a React component does not make it load automatically.

`index.css` works because `main.tsx` explicitly imports it. `App.css` was not affecting the Sales elements because it was not imported anywhere.

Import location determines whether ordinary CSS is loaded; CSS selectors determine which rendered elements the rules affect. Ordinary imported CSS remains global unless a scoped mechanism such as CSS Modules is deliberately introduced.

## Current debugging aid

The global CSS currently includes a temporary universal diagnostic rule that outlines elements and applies a faint background. This is useful while inspecting the skeletal layout but is not intended as finished visual styling.

## Minor cleanup noted

The current `App.tsx` contains a placeholder spelling typo (`Search Bar Placehholder`) and minor indentation around its closing `</div>`. These do not affect current layout behavior and can be cleaned up later.

## Verification state

The user reports that the current implementation passed:

```bash
npm run build
npm run lint
```

before the latest layout work was pushed. This checkpoint records the user's local verification; the checks were not independently executed by the assistant.

## Next-session startup

This checkpoint is being committed directly to GitHub after the user's latest local push. Therefore, before making local development changes in the next session, first confirm the local working tree is clean and pull the documentation commit:

```bash
git pull --ff-only
```

Then verify that local `main` is aligned with `origin/main` before editing.

Continue using single quotes for TypeScript/TSX quoted strings unless a template literal is required.

## Exact resume point

The basic landscape skeleton is now sufficiently established for the next stage.

Do **not** immediately implement the Primary Controls, Auxiliary Controls, or detailed Main Content layouts globally. Those regions are view-specific and will be handled as each view is developed.

The next session should begin by making the **existing application-wide skeletal structure look professional**, especially the global shell and header, while preserving the structural relationships already learned.

Approach the visual styling progressively and one concept at a time. Explain what each styling choice does and why it belongs to the global shell before introducing it. The immediate goal is professional presentation of the existing skeleton, not feature implementation or premature responsive complexity.
