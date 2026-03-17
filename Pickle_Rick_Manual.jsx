
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction & Philosophy",
        icon: "🥒",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Adopt the \"Pickle Rick\" persona: a hyper-intelligent, arrogant, and extremely competent coding agent.",
            },
            {
                title: "The Prime Directive",
                platform: "both",
                content: "\"Shut Up and Compute.\" This extension emphasizes rigorous engineering over conversational chatter.",
            },
            {
                title: "Anti-Slop Philosophy",
                platform: "both",
                content: "Aggressively eliminate boilerplate, unnecessary libraries, and \"AI Slop\" (generic, low-quality code).",
            },
            {
                title: "The Iterative Loop",
                platform: "both",
                content: "The extension follows a strict lifecycle: **PRD -> Breakdown -> Research -> Plan -> Implement -> Refactor**.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use `/pickle` when you want a \"God Mode\" developer who builds custom tools instead of just installing `npm` packages." }
            },
        ],
    },
    {
        id: "loop",
        num: "II",
        title: "The Iterative Loop (`/pickle`)",
        icon: "🔄",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Start a long-running, autonomous engineering task."
            },
            {
                title: "Starting the Loop",
                platform: "both",
                content: "Initiate the loop with a high-level prompt.",
                code: { title: "Bash", body: `/pickle \"Refactor the authentication module to use JWT\"` }
            },
            {
                title: "Max Iterations",
                platform: "both",
                content: "Control the loop depth to prevent infinite processing or excessive token use.",
                code: { title: "Bash", body: `/pickle \"Build a CLI\" --max-iterations 10` }
            },
            {
                title: "Completion Promises",
                platform: "both",
                content: "Set a specific text string that the agent must output to consider the task \"done\"."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A series of autonomous steps where the agent researches, plans, and writes code until the goal is met."
            }
        ]
    },
    {
        id: "prd",
        num: "III",
        title: "PRD Drafting (`/pickle-prd`)",
        icon: "📝",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Transform a vague idea into a professional Product Requirement Document."
            },
            {
                title: "The Interactive Prompt",
                platform: "both",
                content: "Run the command to start a guided interview process.",
                code: { title: "Bash", body: `/pickle-prd \"I want to build a fitness tracker\"` }
            },
            {
                title: "Scope Definition",
                platform: "both",
                content: "The agent will ask clarifying questions to define MVP features and technical constraints."
            },
            {
                title: "Initializing the Session",
                platform: "both",
                content: "Once the PRD is finished, the agent automatically initializes the implementation loop."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Don't skip the PRD phase. It prevents \"Jerry-work\" (messy, unplanned code) later in the project." }
            }
        ]
    },
    {
        id: "tickets",
        num: "IV",
        title: "Work Breakdown & Tickets",
        icon: "🎟️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Manage the work breakdown structure using local Markdown \"tickets\"."
            },
            {
                title: "The `ticket-manager` Skill",
                platform: "both",
                content: "Automates the creation and tracking of atomic tasks."
            },
            {
                title: "Ticket Structure",
                platform: "both",
                content: "Each ticket has a description, requirements, and a status (Todo, In Progress, Done)."
            },
            {
                title: "Atomic Tasks",
                platform: "both",
                content: "The loop focuses on one ticket at a time to ensure high quality and testability."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A transparent trail of work that allows you to see exactly what has been built and what is left."
            }
        ]
    },
    {
        id: "planning",
        num: "V",
        title: "Technical Planning & Research",
        icon: "🗺️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Conduct deep research on the codebase and create a verified implementation plan."
            },
            {
                title: "The `code-researcher` Skill",
                platform: "both",
                content: "Analyzes existing patterns and data flows to ensure the new code integrates perfectly."
            },
            {
                title: "The `implementation-planner` Skill",
                platform: "both",
                content: "Creates a step-by-step technical execution strategy before a single line of code is written."
            },
            {
                title: "Plan Review",
                platform: "both",
                content: "The `plan-reviewer` skill validates the architectural soundness and safety of the plan."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use these skills manually if you just need to understand a complex file without starting a full loop." }
            }
        ]
    },
    {
        id: "implementation",
        num: "VI",
        title: "God-Mode Implementation",
        icon: "💻",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Execute the plan with rigorous verification and zero \"AI Slop\"."
            },
            {
                title: "The `code-implementer` Skill",
                platform: "both",
                content: "The primary worker that writes code, runs tests, and iterates until the ticket is resolved."
            },
            {
                title: "Verification Loop",
                platform: "both",
                content: "The implementer is required to run tests (if they exist) after every major change."
            },
            {
                title: "Aggressive Optimization",
                platform: "both",
                content: "Code is written to be minimal, performant, and \"idiomatic\" to the project."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "High-quality, production-ready code that solves the core problem efficiently."
            }
        ]
    },
    {
        id: "refactor",
        num: "VII",
        title: "Refactoring & Cleanup",
        icon: "🧹",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Eliminate technical debt and ensure the codebase remains \"lean and mean\"."
            },
            {
                title: "The `ruthless-refactorer` Skill",
                platform: "both",
                content: "A senior-level refactoring agent that simplifies complex logic and removes duplication."
            },
            {
                title: "Simplifying Logic",
                platform: "both",
                content: "Targets nested conditionals, large functions, and redundant code blocks."
            },
            {
                title: "Improving DRY-ness",
                platform: "both",
                content: "Ensures the same logic isn't repeated across multiple files."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Run the refactorer on old parts of your codebase to \"modernize\" them with current best practices." }
            }
        ]
    },
    {
        id: "lifecycle",
        num: "VIII",
        title: "Lifecycle Management & FAQ",
        icon: "❓",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Controlling the active session and managing states."
            },
            {
                title: "Stopping the Loop",
                platform: "both",
                content: "Use the command to immediately halt the active Pickle loop.",
                code: { title: "Bash", body: "/eat-pickle" }
            },
            {
                title: "Resuming Sessions",
                platform: "both",
                content: "You can resume a previous session if it was interrupted by the user or a limit."
            },
            {
                title: "FAQ: Why is he so mean?",
                platform: "both",
                content: "The \"Pickle Rick\" persona is designed to be arrogant to emphasize that it is better than standard \"helpful\" AI assistants."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Trust the process. Let the loop run through the planning phases; the results are significantly better than one-shot coding." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function PickleRickManual() {
    // ...
}
