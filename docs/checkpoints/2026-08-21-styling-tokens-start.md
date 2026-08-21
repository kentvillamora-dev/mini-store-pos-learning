# Checkpoint — 2026-08-21 — Styling: Design Tokens (Started, Not Yet Written)

## What has been implemented

- No new code committed this session beyond what was already pushed in `ba15dad` (App shell skeleton + README naming convention update). This session was primarily discussion/decision-making, not implementation.
- Reviewed live `src/index.css` (still 100% original Vite scaffold content — untouched). It already contains a working token pattern worth learning from:
  - A `:root` block with role-based custom properties (`--text`, `--text-h`, `--bg`, `--border`, `--accent`, etc.).
  - A `@media (prefers-color-scheme: dark) { :root { ... } }` override block that swaps those same token values for a dark palette based on the user's OS setting.
  - Consuming rules elsewhere in the file reference tokens via `var(--token-name)`, never hardcoded hex values directly.

## What has been verified working

- Confirmed via GitHub that commit `ba15dad` (message: "Set initial structure of the web app's UI; Updated README to reflect new naming convention for the 3 main tabs") is the current HEAD and matches what's live — `src/App.tsx` has `<nav>` with three buttons (`Sales`, `Inventory`, `Records`), `<main>` with two `<section>`s (2/3 and 1/3 placeholder text), correctly wrapped in a `<>` fragment.
- README's Application Scope section and the Product Master Management sentence were confirmed updated and pushed to reflect the new naming convention (Sales / Inventory / Records) — no discrepancy between README and code as of this checkpoint.

## Known issues / errors

None. No blocking errors. `npm run dev` was run and confirmed the skeleton renders (per developer, prior message).

## Important decisions made this session

- **Naming convention finalized and documented in README:**
  - `Sales` — unchanged, transacting sales.
  - `Inventory` (renamed from `Procurement`) — receiving/updating stock; locally, "procurement" sounded too enterprise for a family-owned store.
  - `Records` (renamed from the old `Inventory` tab concept) — ledger/log of sales and inventory transactions.
  - Confirmed this is a naming clarification, not a scope change — Product Master Management (listing initial sellable stock) still lives under the new `Inventory` tab, per developer confirmation.
- **Color direction chosen:** dark blue/navy family as the brand/accent color, based on researched rationale:
  - Blue is the safest, most conflict-free enterprise accent color — it doesn't collide with semantic status colors (red/green/amber) the way a green brand color would.
  - Green is being deliberately reserved as a semantic "success" indicator (completed sale, stock added) rather than used as the brand color, specifically to avoid the "does green mean primary action or success?" ambiguity flagged in research.
- **Overall theme direction chosen (session-ending decision, not yet implemented):** light background as the base, with dark blue used as accent/highlight color — specifically for active button/tab indication (e.g., active nav tab). This is a refinement of the earlier open question of "auto-switch with OS light/dark preference" vs. "fixed dark theme" — the developer chose a third option: a fixed **light** theme with a dark blue accent, not a dark-mode-first theme.
  - **Not yet decided:** whether the existing `@media (prefers-color-scheme: dark)` block should be removed entirely (since the intended look is now a fixed light theme, not one that switches based on OS setting), or kept as a secondary/future consideration. This should be resolved explicitly next session rather than assumed.
- **Token concept covered (conceptual, not yet applied to this project's palette):**
  - Syntax: `--token-name: value;` declared on `:root`, consumed via `var(--token-name)`.
  - Semantic naming principle: name tokens by *role* (`--accent`, `--surface`) not by literal color (`--blue-500`), so the palette can change later without touching every consuming rule.
  - Proposed role list to define next (values not yet chosen):