import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Meta-Skills",
        icon: "🧩",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Master the ability to create new, specialized skills that extend Gemini's capabilities.",
            },
            {
                title: "What is a Skill?",
                platform: "both",
                content: "A skill is a folder containing a `SKILL.md` file (instructions) and optional scripts or resources.",
            },
            {
                title: "The Creation Pipeline",
                platform: "both",
                content: "Analyze Needs -> Draft Instructions -> Define Tools -> Test & Iterate.",
            },
            {
                title: "Portability",
                platform: "both",
                content: "Skills are designed to be shared and reused across different projects and environments.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use `skill-creator` whenever you find yourself repeating the same complex instructions in every chat." }
            },
        ],
    },
    {
        id: "design",
        num: "II",
        title: "Designing the `SKILL.md`",
        icon: "✍️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Write clear, non-ambiguous instructions that the AI can follow with high precision."
            },
            {
                title: "Section: Role & Persona",
                platform: "both",
                content: "Define the expertise level and \"brain\" of the skill (e.g., \"PhD-level Microbiologist\")."
            },
            {
                title: "Section: Core Mandates",
                platform: "both",
                content: "List the non-negotiable rules the skill must follow (e.g., \"Always cite sources\")."
            },
            {
                title: "Section: Workflow",
                platform: "both",
                content: "Provide a step-by-step phased approach (Phase 1: Analyze, Phase 2: Act, etc.)."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A robust instruction set that turns a general-purpose AI into a specialized expert."
            }
        ]
    },
    {
        id: "tools",
        num: "III",
        title: "Defining Custom Tools",
        icon: "🛠️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Map existing MCP tools or shell scripts to the skill's specific tasks."
            },
            {
                title: "Tool Integration",
                platform: "both",
                content: "Explain which tools (like `grep` or `exa`) the skill should use and when."
            },
            {
                title: "Data Input/Output",
                platform: "both",
                content: "Define how the skill should handle files and what format its responses should take."
            },
            {
                title: "Parameter Constraints",
                platform: "both",
                content: "Set strict rules for how tools should be called (e.g., \"Always use `--json` output\")."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "A good skill doesn't just talk; it *acts* by using tools to gather and process data." }
            }
        ]
    },
    {
        id: "testing",
        num: "IV",
        title: "Testing & Iteration",
        icon: "⚙️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Refine the skill through practical use cases and failure analysis."
            },
            {
                title: "The \"Dry Run\"",
                platform: "both",
                content: "Ask the agent to simulate the skill's workflow and point out any ambiguities."
            },
            {
                title: "Debugging Instructions",
                platform: "both",
                content: "Identify where the AI gets confused or deviates from the plan and update the `SKILL.md`."
            },
            {
                title: "Handling Edge Cases",
                platform: "both",
                content: "Add \"If/Then\" logic to the instructions to handle unexpected data or errors."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"battle-tested\" skill that performs reliably even with complex or messy inputs."
            }
        ]
    },
    {
        id: "packaging",
        num: "V",
        title: "Skill Packaging & Installation",
        icon: "📦",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Ensure the skill is correctly structured for the `persona` extension to load."
            },
            {
                title: "The Folder Structure",
                platform: "both",
                content: "`.persona/skills/<skill_name>/SKILL.md` (and optional subfolders)."
            },
            {
                title: "Frontmatter & Metadata",
                platform: "both",
                content: "Use the `persona` standard for naming and describing the skill for registry discovery."
            },
            {
                title: "Dependency Management",
                platform: "both",
                content: "List any external tools (like `nodejs` or `pip`) required for the skill to function."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Keep your skills \"atomic\"—one skill should do one thing perfectly rather than ten things poorly." }
            }
        ]
    },
    {
        id: "sharing",
        num: "VI",
        title: "Sharing & Collaboration",
        icon: "🤝",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Prepare your skills to be shared with other users or teams."
            },
            {
                title: "Documentation",
                platform: "both",
                content: "Write a `README.md` for the *human* user explaining what the skill does and how to call it."
            },
            {
                title: "Versioning",
                platform: "both",
                content: "Keep track of changes in a `CHANGELOG` to avoid breaking workflows for others."
            },
            {
                title: "Licensing",
                platform: "both",
                content: "Choose an appropriate license (like MIT) if you plan to share the skill on GitHub."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A professional-grade skill package that can be instantly installed and used by anyone."
            }
        ]
    },
    {
        id: "meta-programming",
        num: "VII",
        title: "Advanced Meta-Programming",
        icon: "🤖",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Create \"Higher-Order\" skills that manage or orchestrate other skills."
            },
            {
                title: "Skill Chaining",
                platform: "both",
                content: "Design a workflow where Skill A produces output specifically for Skill B."
            },
            {
                title: "Self-Correction",
                platform: "both",
                content: "Include a \"Review\" phase where the skill audits its own output for errors."
            },
            {
                title: "Dynamic Instruction Injection",
                platform: "both",
                content: "Techniques for making a skill adapt its instructions based on the current project context."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Build a \"Manager\" skill to oversee complex projects by delegating tasks to other specialized skills." }
            }
        ]
    },
    {
        id: "reference",
        num: "VIII",
        title: "Reference & Skill Registry",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for skill creation standards."
            },
            {
                title: "Required Files",
                platform: "both",
                steps: ["`SKILL.md`", "`gemini-extension.json` (if part of an extension)"]
            },
            {
                title: "FAQ: Can skills use Python?",
                platform: "both",
                content: "Yes, if they call the `run_shell_command` or an MCP tool that executes Python scripts."
            },
            {
                title: "FAQ: Where do I store them?",
                platform: "both",
                content: "Always store your local creations in `~/.gemini/skills/` or the project's `.persona/skills/`."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "The best skill is one that you forget is there—it just works seamlessly as part of your natural workflow." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function SkillCreatorManual() {
    // ...
}
