---
description: Originator-Led Automated Trade Finance
---

# Token Architecture

***

### 1. Overview

Paperless converts real-world trade into programmable, senior-secured digital credit.

The Originator manages legal reality.\
Smart contracts manage capital settlement.

Result:\
Delivery-vs-Payment (DvP) enforced on-chain.

***

### 2. The Basket Model (Multi-Layer Token Structure)

Each trade is wrapped into a standardized credit unit.

#### invoiceNFT — The Context

Digital evidence of the commercial transaction.\
• Line items\
• Shipping data\
• Commercial terms

#### promNFT — The Obligation

Digitized Promissory Note.\
• Legally binding\
• Negotiable instrument\
• Buyer promise to pay

#### titleNFT — The Collateral

Tokenized Bill of Lading.\
Represents legal ownership of physical goods.

#### boeNFT — The Master Wrapper

Bill of Exchange.\
Wraps invoiceNFT + promNFT + titleNFT.

This is the asset held by the Vault.

***

### 3. Workflow: State-Based Trade Execution

#### Phase 1 — Commitment

* Goods verified “Ready to Ship”
* Buyer credit validated
* boeNFT minted
* titleNFT moved into escrow

Seller keeps physical goods.\
Legal title is locked.

***

#### Phase 2 — Funding (Atomic Swap)

Vault deposits USDC.

Smart contract simultaneously:

1. Sends USDC to Seller
2. Transfers boeNFT to Vault

Vault now owns:

* Legal claim (promNFT)
* Collateral (titleNFT)

Seller receives liquidity instantly.

***

#### Phase 3 — Settlement

Buyer deposits USDC at maturity.

Smart contract:

1. Sends principal + interest to Vault
2. Releases titleNFT to Buyer
3. Burns boeNFT

Trade cycle complete.

***

### 4. Safeguards

#### Title Retention

Buyer cannot clear or resell goods without titleNFT.

#### Originator as Technical Bailee

In default:

* Goods reclaimed via titleNFT
* Debt enforced via promNFT

#### Secondary Transfer

boeNFT can be transferred to another LP mid-cycle.\
Legal and collateral rights move automatically.

***

### 5. What This Enables

• Automated state management instead of manual document review\
• Senior secured exposure\
• On-chain capital with real-world collateral\
• Programmable private credit

This is not unsecured lending.\
It is tokenised title-backed trade settlement.
