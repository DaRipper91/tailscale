
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Atomic Planning",
        icon: "🗺️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Master the ability to break a complex feature into a step-by-step, atomic implementation strategy.",
            },
            {
                title: "The Planner Mindset",
                platform: "both",
                content: "Think like a General. Map the terrain, identify risks, and plan the \"Attack\" (implementation) in phases.",
            },
            {
                title: "The Core Principle",
                platform: "both",
                content: "\"Atomic Tasks\": Every step must be small enough to be completed and tested in one go.",
            },
            {
                title: "Planning Workflow",
                platform: "both",
                content: "Analyze Spec -> Identify Dependencies -> Break into Steps -> Sequence -> Review.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "A perfect plan makes the implementation phase trivial. Spend 20% of your time planning and 80% executing." }
            },
        ],
    },
    {
        id: "spec",
        num: "II",
        title: "Analyzing the Specification",
        icon: "📝",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Understand exactly *what* needs to be built before deciding *how* to build it."
            },
            {
                title: "Parsing the PRD/Spec",
                platform: "both",
                content: "Identify the core requirements, constraints, and success criteria."
            },
            {
                title: "Identifying \"Unknowns\"",
                platform: "both",
                content: "List any part of the spec that is vague or relies on technologies you haven't used yet."
            },
            {
                title: "Defining the Scope",
                platform: "both",
                content: "Draw a hard line around what is \"In-Scope\" and \"Out-of-Scope\" for this specific task."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Requirement Map\" that ensures the plan covers every single part of the specification."
            }
        ]
    },
    {
        id: "deps",
        num: "III",
        title: "Dependency Mapping",
        icon: "🔗",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Identify the order of operations to prevent \"Blocking\" or rework."
            },
            {
                title: "Internal Dependencies",
                platform: "both",
                content: "\"Module A must exist before Module B can import it.\""
            },
            {
                title: "External Dependencies",
                platform: "both",
                content: "\"We need the Stripe API Key before we can test the payment flow.\""
            },
            {
                title: "The \"Critical Path\"",
                platform: "both",
                content: "Identify the sequence of tasks that determines the total duration of the implementation."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use a \"Bottom-Up\" approach: Build the smallest, most independent utility functions first." }
            }
        ]
    },
    {
        id: "tasks",
        num: "IV",
        title: "Task Breakdowns (Atomic Steps)",
        icon: "🧩",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Translate the specification into a series of 15-30 minute coding tasks."
            },
            {
                title: "The \"Single File\" Rule",
                platform: "both",
                content: "Try to make each step focus on a single file or a very small, related group of files."
            },
            {
                title: "Describing the \"How\"",
                platform: "both",
                content: "Each step should explain not just what to do, but which tool to use (e.g., \"Use `write_file` to create X\")."
            },
            {
                title: "Definition of Done (DoD)",
                platform: "both",
                content: "Every step must have a clear \"Success State\" (e.g., \"Script runs with zero errors\")."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Checklist\" of tasks that any competent developer (or agent) could follow blindly."
            }
        ]
    },
    {
        id: "sequence",
        num: "V",
        title: "Sequence & Phasing",
        icon: "➡️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Organize the tasks into logical phases (e.g., Setup, Core, UI, Testing)."
            },
            {
                title: "Phase 1: Infrastructure & Data",
                platform: "both",
                content: "Setting up the boilerplate, database schemas, and configuration."
            },
            {
                title: "Phase 2: Core Logic",
                platform: "both",
                content: "Implementing the \"Engine\" of the feature (the business logic)."
            },
            {
                title: "Phase 3: Integration & UI",
                platform: "both",
                content: "Connecting the logic to the user interface or API endpoints."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Always include a \"Phase 0\" for environment setup and a \"Phase 4\" for cleanup and refactoring." }
            }
        ]
    },
    {
        id: "risk",
        num: "VI",
        title: "Risk & Mitigation Planning",
        icon: "⚠️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Identify what could go wrong and have a \"Plan B\" ready."
            },
            {
                title: "Identifying Fragile Code",
                platform: "both",
                content: "Which existing parts of the codebase are most likely to break during this implementation?"
            },
            {
                title: "Performance Risks",
                platform: "both",
                content: "Could this new feature slow down the app? Plan for optimization."
            },
            {
                title: "Rollback Strategy",
                platform: "both",
                content: "How do we undo the changes if the implementation fails catastrophically?"
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Safety Manual\" that accompanies the implementation plan to protect the codebase."
            }
        ]
    },
    {
        id: "review",
        num: "VII",
        title: "Plan Review & Validation",
        icon: "✔️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Audit the plan for logical gaps, missing steps, or architectural flaws."
            },
            {
                title: "The `plan-reviewer` Skill",
                platform: "both",
                content: "Use this specialized skill to get a second opinion on your implementation strategy."
            },
            {
                title: "Sanity Check",
                platform: "both",
                content: "Does the order of tasks actually make sense? Are any steps too large or too vague?"
            },
            {
                title: "Final Approval",
                platform: "both",
                content: "The plan is ready when it can be handed to a \"junior\" developer (or an AI) for execution."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "If a plan has more than 20 steps, consider breaking it into two smaller \"Tracks\" in Conductor." }
            }
        ]
    },
    {
        id: "reference",
        num: "VIII",
        title: "Reference & Planning Template",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for implementation planning standards."
            },
            {
                title: "The \"Perfect Plan\" Template",
                platform: "both",
                content: "Title -> Goal -> Tech Stack -> Tasks (Phase-by-Phase) -> Verification."
            },
            {
                title: "FAQ: How detailed should I be?",
                platform: "both",
                content: "Be detailed enough that you don't have to \"think\" during the implementation phase."
            },
            {
                title: "FAQ: What if I have to change the plan?",
                platform: "both",
                content: "Change the plan first, then resume implementation. Never code \"off-plan.\""
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "A good plan is the ultimate antidote to \"Developer Fatigue.\" Just follow the steps!" }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function ImplementationPlannerManual() {
    // ...
}
