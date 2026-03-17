import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Requirements Engineering",
        icon: "📝",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Translate a raw product idea into a rigid, professional Product Requirement Document (PRD).",
            },
            {
                title: "Why a PRD?",
                platform: "both",
                content: "It prevents \"Feature Creep,\" ensures team alignment, and provides a \"God-Tier\" plan for implementation.",
            },
            {
                title: "The \"North Star\" Principle",
                platform: "both",
                content: "Every feature in the PRD must serve the core mission of the product.",
            },
            {
                title: "The PRD Workflow",
                platform: "both",
                content: "Ideation -> Interview -> Draft -> Review -> Finalize.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use the `prd-drafter` before starting any `/pickle` loop to avoid \"Jerry-work\" (messy, unplanned code)." }
            },
        ],
    },
    {
        id: "foundation",
        num: "II",
        title: "The Project Foundation",
        icon: "🏗️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Define the high-level purpose, audience, and \"Success Metrics\" for the product."
            },
            {
                title: "Product Definition",
                platform: "both",
                content: "What problem are we solving? Who are we solving it for?"
            },
            {
                title: "User Personas",
                platform: "both",
                content: "Define the \"Ideal User\" (e.g., \"The Busy Developer,\" \"The Non-Technical Manager\")."
            },
            {
                title: "Success Metrics (KPIs)",
                platform: "both",
                content: "How will we know if the product is successful? (e.g., \"Load time < 1s,\" \"Zero data loss\")."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A clear, 1-page summary that everyone on the team understands and agrees with."
            }
        ]
    },
    {
        id: "scope",
        num: "III",
        title: "Feature Scope & Prioritization",
        icon: "🎯",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "List all possible features and categorize them by their importance to the MVP."
            },
            {
                title: "The MoSCoW Method",
                platform: "both",
                content: "**M**ust have. **S**hould have. **C**ould have. **W**on't have (for now)."
            },
            {
                title: "Functional Requirements",
                platform: "both",
                content: "Specific behaviors the system must perform (e.g., \"User can log in with Google\")."
            },
            {
                title: "Non-Functional Requirements",
                platform: "both",
                content: "System qualities (e.g., \"Security,\" \"Scalability,\" \"Maintainability\")."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Be ruthless. If a feature isn't \"Must Have\" for the MVP, move it to the backlog." }
            }
        ]
    },
    {
        id: "flows",
        num: "IV",
        title: "User Flows & UX",
        icon: "🌊",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Map out the step-by-step journey a user takes through the application."
            },
            {
                title: "Creating User Stories",
                platform: "both",
                content: "\"As a [Persona], I want to [Action], so that [Value].\""
            },
            {
                title: "The \"Happy Path\"",
                platform: "both",
                content: "The most common, error-free path a user takes to achieve their goal."
            },
            {
                title: "Edge Cases & Error States",
                platform: "both",
                content: "What happens if the user enters a wrong password or the server goes down?"
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A logical map that ensures the user experience is intuitive and complete."
            }
        ]
    },
    {
        id: "constraints",
        num: "V",
        title: "Technical Constraints & Stack",
        icon: "🔗",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Define the architectural \"Boundaries\" within which the product must be built."
            },
            {
                title: "Technology Stack",
                platform: "both",
                content: "Languages, databases, frameworks, and third-party APIs (e.g., \"Next.js + Postgres + Gemini API\")."
            },
            {
                title: "Infrastructure & Hosting",
                platform: "both",
                content: "Where will the app live? (e.g., \"AWS,\" \"Vercel,\" \"Local Server\")."
            },
            {
                title: "Security Requirements",
                platform: "both",
                content: "Encryption, authentication, and data privacy standards."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Consult the `tech-stack.md` in your `conductor/` directory to ensure alignment." }
            }
        ]
    },
    {
        id: "roadmap",
        num: "VI",
        title: "Milestones & Roadmap",
        icon: "🗺️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Break the project into \"Phases\" with clear deadlines and deliverables."
            },
            {
                title: "Phase 1: MVP (Minimum Viable Product)",
                platform: "both",
                content: "The absolute minimum set of features needed to launch and gather feedback."
            },
            {
                title: "Phase 2: Core Enhancements",
                platform: "both",
                content: "The \"Should Have\" features that make the product \"Great.\""
            },
            {
                title: "Phase 3: Scaling & Polish",
                platform: "both",
                content: "Advanced features, performance optimization, and UI refinement."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A timeline that keeps the project on track and prevents \"Analysis Paralysis.\""
            }
        ]
    },
    {
        id: "review",
        num: "VII",
        title: "PRD Review & Auditing",
        icon: "✔️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Ensure the PRD is logical, complete, and technically feasible."
            },
            {
                title: "Internal Audit",
                platform: "both",
                content: "The agent checks the PRD for internal contradictions or missing requirements."
            },
            {
                title: "Feasibility Check",
                platform: "both",
                content: "Can this actually be built with the selected tech stack and timeline?"
            },
            {
                title: "Stakeholder Sign-off",
                platform: "both",
                content: "Present the PRD to the \"User\" (you) for final approval before coding starts."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use the `critical-analysis` skill to find \"vague\" requirements and make them specific." }
            }
        ]
    },
    {
        id: "reference",
        num: "VIII",
        title: "Command Reference & FAQ",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for PRD-related prompts."
            },
            {
                title: "Core Sections",
                platform: "both",
                content: "Summary, Audience, Requirements (Func/Non-Func), User Flows, Tech Stack, Roadmap."
            },
            {
                title: "FAQ: How long should it be?",
                platform: "both",
                content: "As long as it needs to be to be \"Complete\" but as short as possible to be \"Readable.\""
            },
            {
                title: "FAQ: Can I change it later?",
                platform: "both",
                content: "Yes, but changing the PRD mid-implementation is expensive. Change it during the \"Planning\" phase."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "A PRD is a living document. Update it as you learn more during the building process." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function PRDDrafterManual() {
    // ...
}
