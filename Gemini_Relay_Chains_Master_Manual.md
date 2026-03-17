# Gemini Relay Chains: Master Operational Manual

The Gemini Relay Chain architecture is a high-reliability, multi-agent workflow system designed to eliminate model drift and ensure grounded output through physical handoff artifacts and a strictly tiered hierarchy.

---

## 1. The 6-Tier Hierarchy

To maintain specialized expertise and separation of concerns, the architecture is divided into six functional tiers (T1-T6):

| Tier | Role | Responsibilities | Core Artifacts |
| :--- | :--- | :--- | :--- |
| **T1** | **Intelligence** | Raw data gathering and technical auditing. | `RESEARCH.md` |
| **T2** | **Strategy** | Creating actionable blueprints and plans. | `BLUEPRINT.md` |
| **T3** | **Synthesis** | Code implementation or content drafting. | `DRAFT.md`, `*.js`, `*.py` |
| **T4** | **Validation** | Auditing Tier 3 output against Tier 2 plans. | `CRITIQUE.md`, `TEST_LOGS` |
| **T5** | **Documentation** | Creating manuals and user-facing guides. | `MANUAL.md`, `README.md` |
| **T6** | **Support** | Deployment, troubleshooting, and onboarding. | `SUPPORT.md`, `FAQ.md` |

---

## 2. The Handoff Protocol

State transfer between agents is governed by the **Golden Rule**: *"If it is not in the Markdown, it did not happen."*

### 2.1 Artifact Chains
Agents must never assume "invisible" context. All relevant information from a previous turn or tier must be codified into a physical Markdown file. This ensures that even if the context window is cleared, the agent can resume work with perfect fidelity.

### 2.2 Relay Logging
All handoffs should be tracked in `./.gemini/relay_logs/` to maintain a verifiable audit trail of the chain's execution.

---

## 3. Safety & Recovery Standards

### 3.1 The .bak Recovery Protocol
No system-critical file may be modified without a pre-emptive backup.
1. Create `<filename>.bak` before editing.
2. Perform the edit.
3. Validate the change (Tier 4).
4. Delete or rotate the backup only after successful validation.

### 3.2 Auto-Advance Rule
Automation is permitted only when a plan has been pre-approved by the user. If an agent encounters significant ambiguity or a validation failure, it must immediately "Stop and Seek" human guidance.

---

## 4. Chain Examples

### 4.1 The Software Factory
*   **Workflow:** `Da-Scout (T1) -> Da-Architect (T2) -> Code-Implementer (T3) -> Plan-Reviewer (T4) -> Da-Scribe (T5)`.
*   **Result:** High-quality, tested code with complete documentation.

### 4.2 The System Audit
*   **Workflow:** `Da-Scout (T1) -> Critical-Analysis (T4) -> Da-Scribe (T5)`.
*   **Result:** A deep technical report identifying vulnerabilities and suggesting improvements.

---
*Created via Documentation Pipeline - 2026-02-15*
