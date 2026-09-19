# Checkpoint — Application Shell Basic Layout

**Date:** 2026-09-19

## Scope

This checkpoint records the first implementation milestone after the clean implementation restart. Work is intentionally paused at the **basic application structure and layout**. Visual styling of the individual shell regions has not started.

The application remains a from-scratch learning project. Existing learning documentation and Git history remain authoritative context; the production Mini-Store POS repository is not an implementation source.

## Current application shell

`src/App.tsx` currently defines these regions:

- `header`
  - `.navigation-buttons-area`
  - `.auxiliary-information-area`
    - `.search-bar-area`
    - `.sync-version-area`
      - Sync Status
      - Version ID
- `.primary-controls-area`
- `.auxiliary-controls-area`
- `main`

The term **Primary Controls** is intentional. This area is expected to display a view-specific primary button/filter set based on the active navigation view, such as Product Category filters for an applicable view.

## Layout relationships

The root application is a full-width, full-height vertical Flexbox container.

Current vertical allocation:

- Header: 7%
- Primary Controls: 7%
- Auxiliary Controls: 6%
- Main Content: 80%

Total: 100%.

The header uses nested Flexbox layouts:

- Navigation Buttons Area: `flex: 1`
- Auxiliary Information Area: `flex: 2`

Within Auxiliary Information:

- Search Bar Area: `flex: 5`
- Sync/Version Area: `flex: 1`

The Sync/Version Area is a column Flexbox:

- Sync Status and Version ID are vertically stacked.
- Each child uses `flex: 1`, giving them equal shares of the available height.

Flex ratios were chosen instead of percentage widths where the design requirement is fundamentally a proportional relationship between sibling regions.

## Global CSS baseline

`src/index.css` currently establishes:

- CSS custom properties for a future black/gray visual motif.
- Global `box-sizing: border-box`.
- `html`, `body`, and `#root` at 100% width and height.
- Removal of the browser's default body margin.
- Helvetica with Arial and generic sans-serif fallbacks.
- Global text/background colors using the defined CSS variables.
- Temporary/subtle region borders using `--color-border` to make shell boundaries visible during layout development.

Current color variables are defined, but **individual application regions have not been given their final background/accent styling**.

## Visual direction

The intended accent motif for this implementation is black/gray rather than the earlier blue-heavy direction.

Current variables provide:

- canvas
- background
- surface
- border
- accent
- accent hover
- accent active
- accent contrast
- normal text
- muted text

These tokens are only a starting palette. Their existence does not mean every token must be used, and values may be refined when visual styling begins.

## Landscape-only requirement

The application is intended for **landscape tablet operation only**.

The shell therefore does not need to rearrange into a portrait operational layout. Orientation enforcement/guard behavior has not yet been implemented. A future implementation can combine PWA orientation preference with a portrait-mode UI guard.

## Files at this checkpoint

### `src/App.tsx`

Contains the basic semantic/application shell and placeholder content only.

### `src/index.css`

Contains the global sizing baseline, initial design tokens, and shell geometry/layout rules.

### `src/App.css`

Currently empty. No decision has yet been made to move application-specific styling into it.

### `src/main.tsx`

Remains the application entry point and was not part of this shell-layout work.

## Validation

The user reported that the latest implementation passed:

- `npm run build`
- `npm run lint`

before being pushed.

## Deliberately not implemented yet

This checkpoint does **not** include:

- final background colors for shell regions
- navigation buttons
- active navigation behavior
- search input implementation
- Sync Status behavior
- Version ID behavior
- view-specific Primary Controls
- Auxiliary Controls contents
- Main Content view rendering
- portrait/orientation guard
- PWA orientation configuration
- responsive refinement
- final spacing, typography, shadows, radii, or interaction states

## Recommended next starting point

Resume with visual styling of the established shell without changing its basic geometry unless testing exposes a layout problem.

Keep implementation incremental: establish one visual/layout behavior at a time, verify it in the browser, and preserve the distinction between global styling and view/component-specific styling as those responsibilities become concrete.
