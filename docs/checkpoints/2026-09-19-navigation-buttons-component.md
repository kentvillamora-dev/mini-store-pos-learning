# Checkpoint — Navigation Buttons Component

**Date:** 2026-09-19

## Milestone

The first dedicated UI component after the clean implementation restart has been created: `NavigationButtons`.

Work is paused before starting the planned shared Product Category Filter component.

## Implemented

### Component structure

Created:

- `src/components/navigation/NavigationButtons.tsx`
- `src/components/navigation/NavigationButtons.css`

The application shell remains responsible for the navigation region:

```text
App.tsx
└── nav.navigation-buttons-area
    └── NavigationButtons
        └── div.navigation-buttons
            ├── Sales
            ├── Inventory
            └── Records
```

This establishes the ownership distinction:

- `.navigation-buttons-area` belongs to the application shell and controls how the navigation region participates in the header layout.
- `.navigation-buttons` and its buttons belong to the `NavigationButtons` component and are styled in `NavigationButtons.css`.

### Navigation styling

The component currently:

- fills its available navigation area;
- uses Flexbox to give Sales, Inventory, and Records equal width;
- uses the application's global color variables;
- presents the navigation as a grouped control;
- uses transparent inactive buttons;
- uses the dark accent color and contrast text for the active button;
- uses inherited application typography with emphasized labels;
- uses a pointer cursor on desktop;
- does not currently add a hover state because the primary operational environment is a touchscreen tablet.

The current active accent token in `index.css` is black.

### Navigation state

`App.tsx` now owns:

```tsx
const [activeView, setActiveView] = useState('Sales')
```

`NavigationButtons` receives both values through props:

- `activeView` tells the component which button is active.
- `setActiveView` gives the component the setter function owned by the parent state so button clicks can request a state change.

The component currently declares:

```tsx
type NavigationButtonsProps = {
  activeView: string
  setActiveView: (view: string) => void
}
```

The three buttons set the view to `Sales`, `Inventory`, or `Records`, and their active styling is conditional on `activeView`.

### State-flow proof

The previous `Main Content` placeholder in `App.tsx` now displays:

```tsx
Active View: {activeView}
```

This was intentionally used to verify that the state lifted into `App` can control UI outside `NavigationButtons`.

The verified flow is:

```text
App owns activeView
        ↓
NavigationButtons receives activeView + setter
        ↓
user selects a navigation button
        ↓
NavigationButtons calls App's setter
        ↓
App state changes and React re-renders
        ↓
active button and main placeholder reflect the same view
```

## Learning decisions

### Component return values

A React component's JSX return is for describing rendered UI. `NavigationButtons` does not return `activeView` to `App` like a normal data-returning function.

Instead, `App` owns the state and passes the state value and setter function to the child.

### Props and functions

Props can carry ordinary data as well as function references. The child does not return a selected value upward. It calls the setter function supplied by `App`, which updates the state owned by `App`.

### TypeScript scope

A stricter union type such as:

```tsx
type ActiveView = 'Sales' | 'Inventory' | 'Records'
```

was discussed but deliberately not introduced.

For the current small implementation, the view values are obvious and localized. Additional type abstraction is not considered worthwhile until it meaningfully protects or clarifies a more complex or distributed data structure.

## Verified State

Before the latest source commit was pushed, the user reported:

- `npm run build` — passed
- `npm run lint` — passed
- Sales / Inventory / Records active-state switching — working
- `main` active-view display follows the selected navigation button

Latest source commit before this checkpoint:

- `72f4bcac8a11a7f959f5b350cb5f3558ebfba641`
- `Created 'NavigationButtons' component; Implemented props for state management`

## Current relevant files

- `src/App.tsx`
- `src/index.css`
- `src/components/navigation/NavigationButtons.tsx`
- `src/components/navigation/NavigationButtons.css`

## Known issues / deferred refinements

No known build or lint errors at this checkpoint.

Potential visual refinements to Navigation Buttons remain possible, but they are not the immediate next task.

The current `Active View: {activeView}` content in `main` is a temporary state-flow proof, not the final view-rendering implementation.

## Stop Point

Navigation Buttons are implemented as the first dedicated component and application-level `activeView` state is working.

No Product Category Filter files or implementation have been started yet.

## Exact Next Action

Create a shared Product Category Filter component intended for the existing `.primary-controls-area`.

Planned component location:

```text
src/components/product-category-filter/
├── ProductCategoryFilter.tsx
└── ProductCategoryFilter.css
```

The component is intended to be displayed when `activeView` is either:

- `Sales`, or
- `Inventory`

and not displayed for `Records`.

Start with component structure only. Preserve `.primary-controls-area` as an application-shell container owned by `App.tsx`; the Product Category Filter should own only its internal markup, behavior, and styling.
