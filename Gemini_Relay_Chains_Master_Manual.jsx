import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "hierarchy",
        num: "1",
        title: "The 6-Tier Hierarchy",
        icon: "🪜",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "To maintain specialized expertise and separation of concerns, the architecture is divided into six functional tiers (T1-T6):",
            },
            {
                title: "Tier Table",
                platform: "both",
                table: {
                    headers: ["Tier", "Role", "Responsibilities", "Core Artifacts"],
                    rows: [
                        ["**T1**", "**Intelligence**", "Raw data gathering and technical auditing.", "`RESEARCH.md`"],
                        ["**T2**", "**Strategy**", "Creating actionable blueprints and plans.", "`BLUEPRINT.md`"],
                        ["**T3**", "**Synthesis**", "Code implementation or content drafting.", "`DRAFT.md`, `*.js`, `*.py`"],
                        ["**T4**", "**Validation**", "Auditing Tier 3 output against Tier 2 plans.", "`CRITIQUE.md`, `TEST_LOGS`"],
                        ["**T5**", "**Documentation**", "Creating manuals and user-facing guides.", "`MANUAL.md`, `README.md`"],
                        ["**T6**", "**Support**", "Deployment, troubleshooting, and onboarding.", "`SUPPORT.md`, `FAQ.md`"]
                    ]
                }
            }
        ],
    },
    {
        id: "protocol",
        num: "2",
        title: "The Handoff Protocol",
        icon: "🤝",
        sections: [
            {
                title: "The Golden Rule",
                platform: "both",
                content: "\"If it is not in the Markdown, it did not happen.\""
            },
            {
                title: "Artifact Chains",
                platform: "both",
                content: "Agents must never assume \"invisible\" context. All relevant information from a previous turn or tier must be codified into a physical Markdown file. This ensures that even if the context window is cleared, the agent can resume work with perfect fidelity."
            },
            {
                title: "Relay Logging",
                platform: "both",
                content: "All handoffs should be tracked in `./.gemini/relay_logs/` to maintain a verifiable audit trail of the chain's execution."
            }
        ]
    },
    {
        id: "safety",
        num: "3",
        title: "Safety & Recovery Standards",
        icon: "🛡️",
        sections: [
            {
                title: "The .bak Recovery Protocol",
                platform: "both",
                content: "No system-critical file may be modified without a pre-emptive backup.",
                steps: [
                    "Create `<filename>.bak` before editing.",
                    "Perform the edit.",
                    "Validate the change (Tier 4).",
                    "Delete or rotate the backup only after successful validation."
                ]
            },
            {
                title: "Auto-Advance Rule",
                platform: "both",
                content: "Automation is permitted only when a plan has been pre-approved by the user. If an agent encounters significant ambiguity or a validation failure, it must immediately \"Stop and Seek\" human guidance."
            }
        ]
    },
    {
        id: "examples",
        num: "4",
        title: "Chain Examples",
        icon: "🔗",
        sections: [
            {
                title: "The Software Factory",
                platform: "both",
                content: "**Workflow:** `Da-Scout (T1) -> Da-Architect (T2) -> Code-Implementer (T3) -> Plan-Reviewer (T4) -> Da-Scribe (T5)`.\n**Result:** High-quality, tested code with complete documentation."
            },
            {
                title: "The System Audit",
                platform: "both",
                content: "**Workflow:** `Da-Scout (T1) -> Critical-Analysis (T4) -> Da-Scribe (T5)`.\n**Result:** A deep technical report identifying vulnerabilities and suggesting improvements."
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function GeminiRelayChainsMasterManual() {
    // ...
}
