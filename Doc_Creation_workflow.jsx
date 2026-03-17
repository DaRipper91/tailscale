

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "pipeline",
        num: "I",
        title: "Structured Documentation Pipeline",
        icon: "🏭",
        sections: [
            {
                title: "Phase 1: Knowledge Extraction (The \"Deep Research\" Phase)",
                platform: "both",
                content: "Before writing, the AI needs to gather raw data. We use the **Gemini Deep Research** extension for this.",
                code: {title: "Command", body: "/research \"Perform a deep technical audit of [Subject/Folder] and extract every possible step, configuration option, and feature.\""},
                callout: {type: "info", text: "This creates a \"Ground Truth\" report. Instead of the AI guessing how something works, it will have a factual foundation."}
            },
            {
                title: "Phase 2: Structural Planning (The \"Scribe\" Phase)",
                platform: "both",
                content: "A manual is only as good as its organization. We use the **Scribe** extension's specialized commands to map out the manual.",
                 code: {title: "Command", body: "/scribe:plan \"Create a high-level structure for a User Manual based on the research report. Use a logical flow: Installation -> Configuration -> Basic Use -> Advanced Features -> Troubleshooting.\""},
            },
            {
                title: "Phase 3: The \"8-5-4\" Manual Format",
                platform: "both",
                content: "This is a high-performance documentation strategy:",
                steps: [
                    "**8 Chapters:** (Intro, Setup, Core 1, Core 2, Core 3, Adv, API/Ref, FAQ).",
                    "**5 Sections per Chapter:** (Objective, Pre-reqs, Steps, Expected Outcome, Pro-Tip).",
                    "**4 Visuals/Code Blocks per Section:** Ensuring it isn't just a wall of text."
                ]
            },
            {
                title: "Phase 4: Execution (Drafting & Polishing)",
                platform: "both",
                steps: [
                    "**Drafting:** Use `/scribe:draft` for individual chapters to maintain focus and detail.",
                    "**Polishing:** Use `/scribe:polish` to ensure the tone is professional, clear, and consistent across all pages."
                ]
            },
        ],
    },
    {
        id: "workflow",
        num: "II",
        title: "Recommended Workflow Summary",
        icon: "📜",
        sections: [
           {
                title: "Workflow Steps",
                platform: "both",
                steps: [
                    "**1. Investigate:** Use `gemini-deep-research` to fully analyze the project and generate a \"Raw Knowledge Report\".",
                    "**2. Draft:** Ask the main agent to use that research to write specific `.md` files, adhering to your preferred style.",
                    "**3. Standardize:** Use `/prompts:write-readme` to ensure your repository's entry point (`README.md`) is polished and links to your new deep documentation."
                ]
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function DocCreationWorkflowManual() {
    // ...
}

