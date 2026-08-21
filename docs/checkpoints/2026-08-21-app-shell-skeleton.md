# Checkpoint — 2026-08-21 — App Shell: JSX Skeleton

## What has been implemented

- Fresh Vite + React + TypeScript project scaffolded via `npm create vite@latest -- --template react-ts`, committed and pushed as an unmodified baseline (`Scaffold raw Vite+React+TS project (unmodified baseline)`).
- `src/App.tsx` boilerplate (Vite demo counter, logos, docs/social links) has been fully stripped by hand. Current file state:

```tsx
  import { useState } from 'react'
  import './App.css'

  function App() {

    return (
      <>
      </>
    )
  }

  export default App
```

- No other source files (`index.css`, `App.css`) have been modified yet — they still contain the original Vite scaffold content.

## What has been verified working

- Confirmed via `git status` / `git diff --staged --stat` that the initial scaffold commit contained exactly the expected 18 files, with `node_modules/` correctly excluded by `.gitignore`.
- Confirmed local/remote sync after pushing the baseline scaffold commit.
- The stripped `App.tsx` above has not yet been re-run/re-verified in the browser since the JSX body was emptied (empty fragment renders nothing — this is expected, not an error, but has not been explicitly confirmed via `npm run dev` in this session).

## Known issues / errors

None reported. No blocking errors.

## Important decisions made this session

- **Rebuild approach:** full architecture reset in a brand-new dedicated learning repository (`mini-store-pos-learning`), separate from the production `mini-store-pos` repo. Production repo may inform requirements only — its source code must not be copied in, per this repo's README.
- **Working order confirmed (corrected twice this session):** structure before style, and within structure, static markup before state.
  1. Build static JSX skeleton first (nav with 3 buttons, main content placeholder) — no `useState`, no `onClick` yet.
  2. Only after the static skeleton renders and is verified, add `useState` to make tab-switching functional.
  3. Only after that, move to `index.css` (design tokens + reset) and then `App.css` (shell styling), in that order — since `App.css` will depend on both the class names from the markup and the tokens from `index.css`.
- **AI collaboration mode confirmed:** per this repo's README "Role of AI" section, assistance should progress from conceptual hints to focused examples before full solutions, and routine learning code should be written by the developer. This session corrected two instances where the AI defaulted to prescribing an order/solution without sufficiently grounding it in this principle; both were caught and corrected by the developer.
- **Target three tabs:** `POS`, `Inventory`, `Record` (matches the three primary application areas: Sales, Procurement, Inventory, per README's Application Scope — exact tab labels to be reconciled with README's area names if they diverge later).

## Relevant files

- `src/App.tsx` — actively being edited (see current state above)
- `src/App.css` — not yet touched, still original Vite scaffold content
- `src/index.css` — not yet touched, still original Vite scaffold content
- `README.md` — defines project rules, AI collaboration mode, and documentation model governing this checkpoint

## Unfinished work

- Static JSX skeleton inside `App.tsx`'s `return (...)` is not yet written. This is the current task in progress.
- No state, no styling, no nav-button click behavior yet — all intentionally deferred until the static skeleton exists and is verified.

## Exact resume point

Developer is about to write plain JSX inside the empty `<> </>` fragment in `src/App.tsx`:
- A `<nav>` containing three `<button>` elements labeled `POS`, `Inventory`, `Record` — no `onClick` handlers yet.
- A `<main>` (or `<div>`) below the nav containing one placeholder line, e.g. `<p>Page content goes here</p>`.
- Open decision to make while writing it: whether to wrap `<nav>` and `<main>` in an outer element (e.g. `<div className="app-shell">`) versus leaving them as siblings inside the bare fragment — relevant for later CSS layout (flex/grid) on `App.css`.

## Next concrete action

Developer writes the static JSX skeleton described above inside `src/App.tsx`, then runs `npm run dev` to verify it renders three unstyled buttons and one placeholder line with zero console errors, before any state or styling is added.