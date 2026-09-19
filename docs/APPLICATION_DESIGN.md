# Application Design

## Purpose

This document records durable application-level design decisions for the Mini-Store POS Learning Project.

It describes intended business behavior and data ownership without prematurely fixing implementation details such as the final IndexedDB/Dexie schema. The current repository code remains authoritative for what is actually implemented.

## Product Data Ownership

### Default product data

The application will retain a bundled default product list.

The default product list is **seed/default data only**. It is intended for establishing or restoring a usable product catalog and is not the runtime source of truth once persistent storage is initialized.

### Runtime authority

IndexedDB will be the authoritative local source of operational product data during normal use.

Normal product additions, modifications, restocking, stock adjustments, price changes, and decommissioning are written to persistent local data rather than back to the bundled default product list.

Google Sheets is intended as a cloud backup and reporting destination. It is not a competing live authority during normal operation.

## Product Lifecycle

Products are not physically deleted as part of normal application workflows.

A product can conceptually be:

- **ACTIVE** — available to current application operations and normal UI views.
- **DECOMMISSIONED** — retained in persistent storage and historical relationships, but excluded from active operations and normal product displays.

Removing a product means decommissioning it.

If a previously decommissioned product is later reintroduced, it should be treated as a new active product record rather than silently rewriting or reactivating the historical record.

Persistent product identity must therefore not depend on an editable product name.

## Historical Records

Business transaction records preserve the facts that existed when the event occurred.

Later changes to a product's name, classification, selling price, stock, or lifecycle status must not rewrite historical transaction facts.

Historical records may retain a product identifier for traceability while also preserving transaction-time values such as product name, quantity, price, cost, or other relevant details.

Product-list maintenance must not erase or alter unrelated historical records.

Current conceptual record domains include:

- Products
- Sales transactions
- Restocking transactions
- Line of Credit records
- Modification records

The final IndexedDB/Dexie table structure is intentionally undecided. A conceptual event or ledger entry does not automatically require its own database table.

## Product Creation and Opening Inventory

When establishing a product, the user provides the product information required for active operation, including at minimum:

- product name;
- available/opening stock; and
- selling price.

Category and subcategory are also part of product organization.

Opening stock establishes the product's initial inventory state. It should not be represented as a fake restocking or stock-adjustment event.

Product creation and its initial values should be auditable through the modification history.

## Restock Workflow

Each product will expose an inline **Restock** action.

The Restock workflow allows the user to enter:

- quantity procured;
- total procurement cost; and
- optional procurement details, such as the retailer or supplier name.

The workflow also presents:

- calculated unit cost;
- advisory Suggested Retail Price (SRP); and
- current selling price.

The user may update the selling price during the same Restock workflow.

A confirmed restocking operation creates a Restock event. If the selling price is also changed, the same user action additionally creates a Price Change event.

One UI action may therefore create more than one business/audit record.

## Advisory SRP

SRP is advisory only. The end user retains final authority over the actual selling price.

The currently agreed SRP approach is based on unit cost and an intentional whole-peso upward pricing rule. The exact final formula should be confirmed before implementation; discussion of alternative formulas does not by itself change the application design.

Displaying an SRP does not create a Price Change record. A Price Change is recorded only when the actual selling price changes.

## Modify Workflow

Each product will expose an inline **Modify** action.

Modify allows the user to update:

- product name;
- category;
- subcategory;
- selling price; and
- current stock quantity.

Changes to product name, category, or subcategory are captured in modification history.

Changing the selling price creates a **Price Change** record regardless of whether the change originates from Restock or Modify.

Changing current stock through Modify creates an **Adjustment Event**. The adjustment records the difference between the previous and new stock quantities and requires an adjustment reason.

After product creation, stock changes must be explainable through business events such as:

- Sales;
- Restocking; or
- Stock Adjustment.

## Shared Product Features

Sales and Inventory may both require product-category filtering, product-subcategory filtering, and product search.

Shared behavior should be reusable at the product/domain level when the behavior is genuinely the same.

However, each view should continue to own its own UI state unless there is an explicit reason to share that state. Selecting a category in one view should not implicitly change another view.

Similar-looking controls should not automatically become shared React components. UI components should be shared only when the UI behavior and ownership genuinely warrant reuse.

## Initialization

An empty product collection must not automatically be treated as an uninitialized application.

The application needs to distinguish between:

- an application/database that has never been initialized; and
- an initialized application that intentionally has no active products.

A new/uninitialized installation should support these conceptual initialization paths:

1. **Use Default Product List** — establish active products from bundled default seed data.
2. **Create New Product List** — allow the user to establish products manually.
3. **Restore from Backup** — reconstruct persistent business data from the cloud backup when local data has been lost.

The exact initialization UI is not yet defined.

## Maintenance Operations

Two intentionally high-impact product-list maintenance operations are planned:

### New Product List

- Decommission currently active products.
- Preserve historical Sales, Restocking, Line of Credit, and Modification records.
- Allow the user to manually establish new active products and their opening inventory.
- Record the relevant product lifecycle/creation changes in modification history.

### Revert to Default Product List

- Decommission currently active products.
- Preserve historical business records.
- Establish new active product records from bundled default seed data.
- Do not rewrite historical product records merely because the new products have matching names.

These maintenance operations should not be exposed alongside normal everyday controls.

The current UX direction is to expose advanced/maintenance options through deliberate interaction with the application's version identifier, followed by explicit confirmation for consequential operations. The exact interaction and confirmation design remains open.

## Cloud Backup and Disaster Recovery

Google Sheets is intended to provide cloud backup for persistent business data.

During normal operation:

```text
User actions
    ↓
IndexedDB
    ↓
Application UI

IndexedDB
    ↓
Google Sheets backup
```

Restore from Backup is specifically a disaster-recovery workflow, intended for cases such as:

- browser/site data being cleared and IndexedDB being lost; or
- the original device being lost, stolen, damaged, or otherwise unavailable and operation needing to continue on another device.

Restore from Backup is not intended to provide routine bidirectional synchronization between two competing operational databases.

During disaster recovery, the backup should reconstruct persistent records and preserve their identities and relationships rather than generating unrelated new identities.

Because Restore from Backup is needed when no usable local database exists, it must be accessible from the initialization path and must not depend exclusively on hidden maintenance controls available only after initialization.

## Product Lists and Catalog Generations

A separate first-class Catalog entity is **not currently required**.

The working direction is to use permanent product identities plus lifecycle status to distinguish active products from historical/decommissioned products.

This decision should remain open to revision if later workflows demonstrate a concrete need for catalog-generation identity.

## Design Principle

Keep the end-user workflow simple even when one action creates multiple internal records.

The UI should reflect how the store operator thinks about the task:

- **Restock** when products were procured.
- **Modify** when product information or recorded stock needs correction.

The persistence and audit model may create the distinct records necessary to preserve business meaning and history without requiring the user to manage those distinctions manually.
