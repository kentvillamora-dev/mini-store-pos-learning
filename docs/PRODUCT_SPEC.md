# Mini-Store POS — Reference Product Specification

## Purpose of this document

This document is the permanent product and architecture reference for the Mini-Store POS Learning Project.

It describes the capabilities, operating constraints, business rules, architecture, rebuild order, acceptance criteria, non-goals, and unresolved decisions of the application being used as the learning target.

It is **not** a development-progress log and it is **not** permission to copy or reconstruct source code from the separate production Mini-Store POS repository. The learning implementation must be built independently, incrementally, and with understanding.

---

## 1. Project Definition

**Mini-Store POS** is a low-cost, offline-first Progressive Web App for a small family-operated mini-store in the Davao Region, Philippines. It is designed around **one dedicated Android tablet** used as the store's primary POS device.

The application replaces or reduces manual selling, procurement, inventory, pricing, and end-of-day processes while keeping recurring operating costs as close to zero as practical.

The defining architectural rule is:

> **The store must remain operational without internet access.**

Sales and other core business transactions are committed to local IndexedDB first. Internet connectivity is secondary and must never be required to complete a normal store transaction. Google Sheets is intended as a remote replica/reporting and disaster-recovery destination, not the live transactional database.

---

## 2. Operating Context and Hardware

### Store environment

- Family-operated mini-store; no regular staff-management system is required.
- Primary users may be 50+ and should not need technical knowledge.
- One dedicated Android tablet is the normal operating terminal.
- Hardware benchmark: **HONOR Pad X8a-class tablet**, approximately 11-inch display, 4 GB RAM / 128 GB storage, Wi-Fi.
- Landscape/tablet use is the primary layout target.
- No receipt printer is required for the initial release.
- Internet connectivity may be intermittent.
- The application should install and behave like a standalone Android app through PWA capabilities.
- The developer must be able to deploy application-shell fixes remotely.
- Persisted store data must survive normal PWA/application-shell updates.

### Design implication

Do not design this like a desktop ERP squeezed onto a tablet. Optimize for touch, legibility, few decisions per step, obvious transaction state, and minimal repetitive entry.

---

## 3. Non-Negotiable Product Principles

1. **Offline first.** Core selling, procurement, inventory, and local records must work without the network.
2. **Local data is operationally authoritative.** IndexedDB/Dexie is the live transaction store.
3. **No silent data loss.** Business records are preserved and reversed/voided rather than casually deleted.
4. **Stock changes must be explainable.** Inventory movements form the audit trail; cached stock is only an operational convenience.
5. **Transactions should be atomic.** Related records and stock changes succeed or fail together.
6. **Simple beats clever.** This is a family mini-store, not an enterprise ERP.
7. **Tablet-first UX.** Large touch targets, restrained visual hierarchy, readable values, and low-friction workflows.
8. **Exactly three top-level tabs:** `Sales`, `Inventory`, `Records`.
9. **No bright-blue-heavy visual treatment.** Use a restrained, professional interface with deliberate darker/navy accent treatment.
10. **Remote updates must not interrupt an active transaction.** Updates are user-applied after transaction completion.
11. **Low recurring cost is a system constraint**, not merely a preference.
12. **Stable UUIDs and timestamps** should be retained for durable records so synchronization can be idempotent.

---

## 4. Top-Level Application Structure

The learning repository uses the current top-level naming convention:

```text
Mini-Store POS
├── Sales
│   ├── Product catalog
│   ├── Cart
│   ├── Cash / GCash checkout
│   └── Line-of-Credit recording
├── Inventory
│   ├── Add Inventory
│   │   ├── Purchase
│   │   └── Opening Inventory
│   ├── Add Product
│   ├── Add Supplier
│   └── Set Price
└── Records
    ├── Sales
    ├── Line-of-Credit
    ├── Procurements
    ├── Products
    ├── Suppliers
    └── Inventory Reconciliation
```

Historical product material may use `POS` for `Sales` and `Ledgers` for `Records`. In this learning repository, **Sales / Inventory / Records** is the authoritative navigation terminology unless a later documented decision changes it.

---

## 5. Shared Product Organization

Use these operational categories in this exact navigation order:

1. Snacks
2. Beverages
3. Milk and Coffee
4. Cooking Essentials
5. Canned Goods
6. Instant Noodles
7. Household Cleaning
8. Personal Care
9. Cigarettes
10. Miscellaneous

This is deliberately **not alphabetical**. Products within each category should be alphabetized.

The same category order should be reused across Sales, Inventory, Add Product, Inventory Reconciliation, and other product-selection workflows.

Products use stable IDs. Editing a product must not replace its identity.

---

## 6. POS / Sales Behavior

### Catalog and cart

- Show products grouped by the shared category order.
- Display selling price and available stock.
- Cart additions temporarily reduce **displayed** availability only.
- Do not persist stock changes until Sale completion.
- Cart quantity cannot exceed persisted available stock.
- On tablet/desktop layouts, keep the Cart visible/sticky while the Product catalog scrolls.
- Narrow/mobile layouts may return to normal stacked document flow.

Preferred cart presentation emphasizes:

```text
Product Name
Line Total
Unit Price × Quantity
[−] [quantity] [+] [remove]
```

### Payment

Supported methods:

```text
CASH
GCASH
LINE OF CREDIT
```

- Cash is default.
- GCash is only a payment-method marker for reconciliation; there is no payment-gateway integration.
- No split payment in the initial system.
- Cash tender must cover the Sale total.
- Useful tender controls include Exact and common increments such as +₱5, +₱10, +₱20, +₱50, +₱100, +₱500, plus Clear.

### Sale persistence

A Sale should be normalized into:

```text
Sale
└── SaleItem[]
```

Completing a Sale must atomically:

1. re-read/revalidate current Product stock;
2. create the Sale;
3. create Sale Items;
4. create negative `SALE` Inventory Movements;
5. update each Product's cached stock.

Sale statuses:

```text
VALID | VOID | REFUNDED
```

Sales are not hard-deleted.

### Void and refund

Void and Refund are different business actions.

Both require a reason and restore stock through positive inventory movements. A Sale cannot be reversed twice.

---

## 7. Procurement

Procurement is a multi-item transaction:

```text
Procurement
└── ProcurementItem[]
```

Supported transaction types:

```text
PURCHASE
OPENING_INVENTORY
```

Legacy/unspecified procurement type should be interpreted as `PURCHASE`.

### Procurement workspace

The current design direction is a full-width worksheet rather than a multi-stage wizard.

Conceptual columns:

```text
Product | Quantity | Total Cost | Unit Cost | SRP | Selling Price | Action
```

The worksheet is both entry and review surface. Avoid a redundant separate Review page.

Provide:

- current local date by default;
- Supplier/Source selector;
- quick Product search;
- category-grouped Product discovery;
- alphabetical Products within Category;
- inline Add Supplier;
- inline Add Product;
- edit/update/remove draft lines;
- transaction totals;
- Save and Cancel.

Draft editing must not change inventory or create business records until Save succeeds.

### Normal Purchase

Requires:

- date;
- Supplier;
- one or more Products;
- whole-number Quantity > 0;
- Total Cost > 0;
- Selling Price > 0.

Calculation:

```text
Unit Cost = Total Cost / Quantity
```

Suggested retail price is advisory:

```text
SRP = ROUNDDOWN(Unit Cost × 1.25) + 1
```

For very low costs below ₱1.00, suggest ₱2.00.

The existing persisted selling price should normally remain the default final selling price unless explicitly changed.

Saving a Purchase atomically creates/updates:

- Procurement header;
- Procurement Items;
- `RESTOCK` Inventory Movements;
- Product cached stock;
- Price History when selling price changes.

Committed invalid Procurements are **voided, not deleted**. Void requires a visible reason, must be atomic, must not be repeatable, and must not make stock negative. Voiding Procurement does not automatically rewind the current selling price.

### Opening Inventory

Opening Inventory is a Procurement transaction type, **not a fake Supplier**.

Rules:

- Supplier is not required.
- Quantity is required.
- Selling Price is required.
- Total Cost, Unit Cost, and SRP are not applicable and should display `—`.
- Existing numeric cost fields may internally store zero for compatibility, but `procurementType` must distinguish those values from genuine purchase cost.
- Stock additions create `OPENING` Inventory Movements.
- Selling-price changes create Price History with an Opening Inventory reason.
- Voiding Opening Inventory reverses its stock through normal Procurement void logic.

Whether Opening Inventory should be restricted to one committed opening entry per Product is an unresolved business rule and should be decided explicitly during reconstruction.

### Inline master-data creation

When a Supplier or Product is missing, allow creation without abandoning the active Procurement.

A newly created Supplier should immediately become selected.

A newly created Product should immediately become usable/addable in the active Procurement draft.

Duplicate-name protection remains required.

---

## 8. Product Pricing

Selling price is stored on the Product and changes should be traceable through Price History.

Pricing can change through:

- Procurement;
- Opening Inventory;
- explicit Set Price workflow.

Suggested SRP is advice only. Never silently replace an existing selling price merely because a new procurement has a different cost.

---

## 9. Inventory Model

`Product.currentStockCache` is the fast operational stock value.

It is **not** the audit trail.

Durable stock changes should be represented by Inventory Movements:

```text
SALE
RESTOCK
OPENING
ADJUSTMENT
VOID
REFUND
```

Every stock-changing business operation should update both the relevant business records/movements and the cached Product stock in one coherent transaction.

---

## 10. Inventory Reconciliation

Inventory Reconciliation supports partial physical counts; the user does not need to count the whole store.

Flow:

1. Search/select Products.
2. Enter physical counts.
3. Review/edit counts.
4. Enter required reconciliation Reason and optional Note.
5. Confirm.

Draft selection/counting does not change persisted inventory.

At confirmation, **re-read current persisted stock**. Do not rely on a stale stock value captured when counting began.

For each counted Product:

```text
Variance = Physical Quantity - Current Persisted Stock
```

- Physical quantity is a whole number ≥ 0.
- Every counted Product receives a reconciliation-item record, even when variance is zero.
- Zero variance creates no movement and does not rewrite stock.
- Non-zero variance creates an `ADJUSTMENT` movement and sets cached stock to the confirmed physical quantity.
- Header, counted items, adjustments, and stock changes are committed atomically.
- Products not counted remain untouched.
- Duplicate Products within one reconciliation are not allowed.
- Only active Products may be reconciled.

Normal POS activity is not locked while a physical count draft is being prepared.

---

## 11. Local Database Design

Use **IndexedDB through Dexie.js**.

The known mature reference schema reached **Dexie Version 12**. A clean rebuild does not need to reproduce every historical migration if starting with a new empty database, but it should reproduce the required logical model as the relevant vertical slices are learned and implemented.

Core tables/entities:

```text
Product
Category
InventoryMovement
Supplier
Procurement
ProcurementItem
PriceHistory
Sale
SaleItem
BusinessDay
AppSetting
InventoryReconciliation
InventoryReconciliationItem
SyncQueueItem
```

### Important relationships

```text
Category 1 ── * Product
Product 1 ── * InventoryMovement
Product 1 ── * ProcurementItem
Product 1 ── * SaleItem
Product 1 ── * PriceHistory
Product 1 ── * InventoryReconciliationItem
Supplier 1 ── * Procurement
Procurement 1 ── * ProcurementItem
Sale 1 ── * SaleItem
InventoryReconciliation 1 ── * InventoryReconciliationItem
```

Use stable UUIDs for durable records and ISO-style timestamps.

Preserve original business records whenever possible; use statuses/reversal records instead of destructive mutation.

---

## 12. Synchronization Architecture

Target architecture:

```text
Business transaction
      ↓
IndexedDB / Dexie commit
      ↓
Sync Queue
      ↓  asynchronous / non-blocking
Google Apps Script Web App
      ↓
Google Sheets replica
```

### Core rules

- Network operations are never part of the critical local business transaction.
- A sync outage must not block POS operation.
- Google Sheets is secondary to IndexedDB.
- Synchronization uses stable entity IDs and remote **upsert**, not blind append.
- Queue records store references to current entities, not stale copies of payloads.
- The worker should re-read canonical IndexedDB data immediately before sending.
- Successful queue entries are removed only after explicit remote acknowledgement.
- Failed entries remain for retry.

### Sync queue

Conceptual `SyncQueueItem`:

```text
id
entityType
entityId
status: PENDING | FAILED
attemptCount
createdAt
lastAttemptAt?
lastError?
```

Enforce one logical queue entry per:

```text
entityType + entityId
```

Do not persist a `SYNCING` state; use it only as transient runtime UI state if needed.

Persist:

```text
sync.lastSuccessfulAt
```

in application settings.

The queue itself is infrastructure and should **not** be replicated to Google Sheets.

### Google replica

The intended Google Sheet is a durable mirror/reporting layer for business/application records. A Google Apps Script `/exec` endpoint should accept batched records, validate IDs/protocol, lock overlapping writes, upsert by stable ID, and return explicit acknowledgements.

Keep batch sizes modest; the prior design used a maximum of roughly 50 records.

---

## 13. PWA and Update Behavior

Use a PWA service worker with **prompted updates**, not forced refresh.

The update UX should:

- expose a small version indicator/control near the top-right;
- detect a waiting application-shell update;
- tell the user to finish any active transaction first;
- offer `Apply Update` and `Later`;
- preserve IndexedDB data across application-shell releases.

Recommended prompt:

> A new version of Mini-Store POS is available. Finish any active transaction before updating.

The production application is hosted under:

```text
/mini-store-pos/
```

The learning repository may require its own deployment base path. Do not copy the production path without verifying the learning repository's deployment configuration.

The manifest should use standalone display and landscape orientation.

Application versioning should be generated from Git commit date + short commit hash where possible, with clear dev/dirty markers during development.

---

## 14. UI / UX Design System

### Interaction priorities

1. Touch first.
2. Low cognitive load.
3. Important values visible without drilling into dialogs.
4. Avoid redundant workflow stages.
5. Prefer explicit actions where accidental editing is risky.
6. Use consistent button dimensions and placement.
7. Make error messages operational and specific.
8. Keep technical/audit-only information away from routine store workflows unless actionable.

### Visual direction

- Professional and restrained.
- Use a light operational base with deliberate dark navy/blue accent treatment unless a later documented learning-project decision changes the theme.
- Avoid bright-blue-heavy fills/text.
- Strong distinction between headings/category labels and individual Products.
- Large readable typography and touch targets.
- Design for the benchmark tablet first; responsive behavior for narrower screens is secondary but should remain functional.

---

## 15. Technology Stack

### Front end

```text
HTML
CSS
React 19
TypeScript 6
```

React manages the interactive UI. TypeScript carries business/data contracts and service logic.

### Build and development

```text
Vite 8
npm
ESLint 10
@vitejs/plugin-react
```

Expected scripts:

```text
npm run dev
npm run build
npm run lint
npm run preview
```

Production build:

```text
tsc -b && vite build
```

### Local database

```text
IndexedDB
Dexie.js 4
```

### PWA

```text
vite-plugin-pwa
Workbox / workbox-window
```

Use prompted service-worker updates.

### Cloud integration

```text
Google Apps Script
Google Sheets
HTTP/JSON synchronization
```

Google services are a replica/reporting layer, not the operational database.

### Hosting and source control

```text
Git
GitHub
GitHub Actions
GitHub Pages
```

### Development workstation

The project must remain practical to maintain without a desktop PC.

Primary lightweight workflow:

```text
Android tablet
→ Termux
→ code-server
→ Git
→ Node.js / npm
```

GitHub Codespaces can be a backup development environment but should not be a hard dependency.

---

## 16. Suggested Source-Code Organization

Exact filenames are not mandatory in a clean rebuild. Preserve separation of responsibilities when the relevant layers become necessary.

```text
src/
├── App.tsx
├── index.css
├── db/
│   └── database.ts
├── services/
│   ├── productService.ts
│   ├── categoryService.ts
│   ├── supplierService.ts
│   ├── procurementService.ts
│   ├── saleService.ts
│   ├── inventoryReconciliationService.ts
│   └── syncQueueService.ts
└── features/
    ├── dataViewer/
    ├── inventoryReconciliation/
    └── pwa/
```

Keep persistence/business rules in services/database code rather than burying all logic inside React components.

---

## 17. Rebuild Order

Rebuild in vertical slices and verify each before proceeding.

### Phase 1 — Foundation

1. Create Vite + React + TypeScript project.
2. Add Dexie.
3. Add PWA plugin.
4. Configure GitHub Pages base path.
5. Create the three-tab application shell.
6. Establish tablet-first global styling.

### Phase 2 — Product and inventory foundation

1. Category model and fixed operational ordering.
2. Product model and Product CRUD.
3. Inventory Movement model.
4. Cached stock rules.
5. Seed/create initial Product master data.

### Phase 3 — Procurement

1. Supplier model.
2. Procurement + Procurement Items.
3. Purchase worksheet.
4. RESTOCK movements.
5. SRP calculation and Price History.
6. Procurement void.
7. Opening Inventory + OPENING movements.
8. Inline Product/Supplier creation.

### Phase 4 — POS

1. Product catalog.
2. Cart.
3. Cash checkout.
4. GCash marker.
5. Line-of-credit recording.
6. Sale + Sale Items.
7. SALE movements.
8. Void and Refund.

### Phase 5 — Operational controls

1. Inventory Reconciliation.
2. Records/ledgers.
3. Set Price.
4. PWA update prompt/version indicator.

### Phase 6 — Synchronization

1. Sync Queue.
2. Entity serialization.
3. Apps Script receiver.
4. Google Sheets tables.
5. Retry/acknowledgement logic.
6. Sync-status UI.

At every phase, run TypeScript build and functional tests before continuing.

---

## 18. Rebuild Acceptance Tests

A reconstructed app is not equivalent until these scenarios work:

- Install/open as a landscape PWA.
- Reload while offline and still open the application shell.
- Create/edit Products without changing their stable identity.
- Complete a normal Purchase and correctly increase stock.
- Complete Opening Inventory without a Supplier and correctly increase stock.
- Void a Procurement and reverse stock without deleting history.
- Complete a Cash Sale offline and correctly decrease stock.
- Complete a GCash-marked Sale.
- Void/Refund a Sale and restore stock.
- Perform partial Inventory Reconciliation with zero and non-zero variances.
- Confirm Records show durable transaction history.
- Apply a PWA shell update without erasing IndexedDB records.
- Queue unsynchronized records while offline.
- Resume synchronization later without creating duplicate remote records.

---

## 19. Explicit Non-Goals for the Initial Product

Do not add these merely because they are common POS features:

- receipt printer integration;
- multi-branch support;
- multiple simultaneous POS terminals;
- enterprise accounting;
- employee scheduling;
- complex role/permission administration;
- online payment gateway;
- split payments;
- cloud-first transactional storage.

Add complexity only when a demonstrated store workflow requires it.

---

## 20. Unresolved Decisions

A rebuild should preserve these as explicit decisions rather than inventing behavior:

- tax treatment;
- rounding rules beyond the existing Suggested-SRP formula;
- authorization for manual non-reconciliation inventory adjustments;
- SKU/barcode policy;
- synchronization conflict policy if multiple writers are ever introduced;
- full disaster-recovery restore procedure from Google Sheets;
- whether Opening Inventory is permitted more than once per Product;
- external/customer-facing release governance if the app grows beyond family use.

---

## 21. Reconstruction Rule for an LLM

Use this document as the **product and architecture specification**, not as permission to generate the entire application in one pass.

Rebuild incrementally:

```text
Understand one workflow
→ define its data contract
→ implement the smallest vertical slice
→ build
→ test
→ verify persisted records and stock behavior
→ continue
```

Do not silently invent business rules. Preserve auditability, offline operation, atomic local transactions, tablet usability, three-tab navigation, and low operating cost even if a different implementation would be easier.

The reconstructed system is successful when a family member can reliably sell, restock, establish opening stock, correct inventory, reconcile daily cash when desired, and continue operating through internet outages without losing transaction history.
