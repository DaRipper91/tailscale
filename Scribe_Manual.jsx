
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Expert Documentation",
        icon: "✍️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Master the art of creating, auditing, and polishing professional-grade documentation.",
            },
            {
                title: "The Scribe Persona",
                platform: "both",
                content: "A meticulous technical writer and auditor who focuses on clarity, consistency, and precision.",
            },
            {
                title: "Core Mandates",
                platform: "both",
                steps: ["Adhere to established project styles.", "Focus on \"Why\" over \"What\".", "Ensure visual accessibility."],
            },
            {
                title: "Supported Formats",
                platform: "both",
                content: "Markdown, LaTeX, PDF, and high-quality structured text files.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use Scribe to turn complex, messy engineering notes into beautiful, readable user manuals." }
            },
        ],
    },
    {
        id: "planning",
        num: "II",
        title: "Planning & Structuring (`/scribe:plan`)",
        icon: "🗺️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Create a logical roadmap for any long-form document or manual."
            },
            {
                title: "Analyzing User Needs",
                platform: "both",
                content: "The tool analyzes the audience and purpose before suggesting a structure."
            },
            {
                title: "Generating the Outline",
                platform: "both",
                content: "Creates a hierarchical structure (Chapters, Sections) based on best practices.",
                code: { title: "Bash", body: "/scribe:plan \"I need a structure for a Linux Kernel module guide.\"" }
            },
            {
                title: "Logical Flow",
                platform: "both",
                content: "Ensures that pre-requisites are covered before complex steps are introduced."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A comprehensive Table of Contents that serves as the \"skeleton\" for your document."
            }
        ]
    },
    {
        id: "drafting",
        num: "III",
        title: "Content Drafting (`/scribe:draft`)",
        icon: "🖋️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Generate detailed, high-signal content for specific sections or chapters."
            },
            {
                title: "The Research Input",
                platform: "both",
                content: "Scribe uses the output from `deep-research` or `codebase_investigator` to write factual content."
            },
            {
                title: "Maintaining Tone",
                platform: "both",
                content: "Ensures that the language remains consistent (e.g., professional, instructional, or academic)."
            },
            {
                title: "Integrating Code Blocks",
                platform: "both",
                content: "Automatically formats and explains code snippets as part of the instructional flow."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Draft one chapter at a time to maintain high detail and avoid generic \"hallucinated\" filler text." }
            }
        ]
    },
    {
        id: "polishing",
        num: "IV",
        title: "Polishing & Consistency (`/scribe:polish`)",
        icon: "✨",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Refine existing drafts for better readability, grammar, and flow."
            },
            {
                title: "Identifying Passive Voice",
                platform: "both",
                content: "Converts weak, passive language into strong, active instructions."
            },
            {
                title: "Formatting Uniformity",
                platform: "both",
                content: "Ensures that headers, bolding, and lists follow a consistent style throughout the project."
            },
            {
                title: "Removing Redundancy",
                platform: "both",
                content: "Aggressively cuts out \"fluff\" and repetitive sentences to keep the reader engaged."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A professional, \"published-quality\" document that is easy to skim and understand."
            }
        ]
    },
    {
        id: "auditing",
        num: "V",
        title: "Technical Auditing (`/scribe:audit`)",
        icon: "🔍",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Verify the accuracy and safety of technical documentation and instructions."
            },
            {
                title: "Step-by-Step Validation",
                platform: "both",
                content: "The agent \"mentally simulates\" the instructions to check for missing steps or logical gaps."
            },
            {
                title: "Safety Checks",
                platform: "both",
                content: "Flags dangerous commands (like `rm -rf /`) and ensures appropriate warnings are present."
            },
            {
                title: "Link Verification",
                platform: "both",
                content: "Checks that all internal and external links mentioned in the document are valid and relevant."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Always run an `/scribe:audit` on your installation guides before sharing them with users." }
            }
        ]
    },
    {
        id: "workflow",
        num: "VI",
        title: "The 8-5-4 Workflow",
        icon: "⚙️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Implement the high-performance \"8 Chapters, 5 Sections, 4 Visuals\" documentation strategy."
            },
            {
                title: "Chapter 1-8 Breakdown",
                platform: "both",
                content: "1: Intro, 2: Setup, 3-5: Core, 6: Advanced, 7: Reference, 8: FAQ."
            },
            {
                title: "Section Requirements",
                platform: "both",
                content: "Each section MUST contain: Objective, Pre-reqs, Steps, Outcome, and Pro-Tip."
            },
            {
                title: "Visual Density",
                platform: "both",
                content: "Every section is required to have 4 high-value visual elements (code, diagrams, or tables)."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A manual that is visually rich, logically perfect, and practically useful."
            }
        ]
    },
    {
        id: "morphing",
        num: "VII",
        title: "Morphing & Archiving",
        icon: "🔄",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Repurpose content for different audiences and manage document versions."
            },
            {
                title: "The `/scribe:morph` Command",
                platform: "both",
                content: "Transform a technical spec for engineers into a simple guide for non-technical users."
            },
            {
                title: "Status Tracking",
                platform: "both",
                content: "Use `/scribe:status` to see which parts of your manual are drafted, reviewed, or done."
            },
            {
                title: "Managing the Archive",
                platform: "both",
                content: "Move old versions of documentation into the `archive/` folder to prevent confusion."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Archive your \"Thoughts\" and \"Plans\" once a project is finished to keep your workspace clean." }
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
                content: "Quick lookup for all Scribe commands and sub-commands."
            },
            {
                title: "Core Namespace: `/scribe`",
                platform: "both",
                steps: ["`/scribe:plan`", "`/scribe:draft`", "`/scribe:polish`", "`/scribe:audit`", "`/scribe:morph`", "`/scribe:status`", "`/scribe:review`", "`/scribe:iterate`"]
            },
            {
                title: "FAQ: Can it write in LaTeX?",
                platform: "both",
                content: "Yes, simply specify the format in your prompt (e.g., \"Draft Chapter 1 in LaTeX\")."
            },
            {
                title: "FAQ: Where are the files saved?",
                platform: "both",
                content: "Scribe follows the Project root or standard `Documents/` paths unless specified."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use Scribe to document *yourself*. Keep a daily log using `/scribe:draft` to track your progress." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function ScribeManual() {
    // ...
}
