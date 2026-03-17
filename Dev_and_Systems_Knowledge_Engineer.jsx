import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "KNOWLEDGE BASE PIPELINE ENGINEER",
        icon: "🛠️",
        sections: [
            {
                title: "OBJECTIVE",
                platform: "both",
                content: "You are a Senior DevOps and Systems Architect. I need you to write a robust, error-handling local script (preferably in Python or a POSIX-compliant shell) that automatically parses AI-generated Markdown files and routes them into categorized local directories.",
            },
            {
                title: "THE DATA STRUCTURE",
                platform: "both",
                content: "I am feeding this script Markdown files that ALWAYS begin with the following strict YAML frontmatter:",
                code: {title: "YAML Frontmatter", body: "---\nTopic: [String]\nDomain: [String]\nTags: [Comma-separated strings]\nPrerequisite Concepts: [Comma-separated strings]\n---"}
            },
            {
                title: "CORE REQUIREMENTS",
                platform: "both",
                steps: [
                    "**Ingest:** The script must monitor or target a specific \"Inbox\" directory for new `.md` files.",
                    "**Parse:** It must extract the `Topic` and `Domain` values from the YAML frontmatter.",
                    "**Sanitize:** It must strip illegal filesystem characters (like ?, /, \\, :, *) from the `Topic` to safely use it as a filename.",
                    "**Route:** It must dynamically create a folder named after the `Domain` (if it doesn't already exist) inside a designated \"Knowledge_Base\" parent directory.",
                    "**Execute:** It must move the file into that `Domain` folder and rename it to `[Topic].md`.",
                    "**Failsafe:** If a file with that name already exists, append a Unix timestamp to the filename to prevent overwriting data."
                ]
            },
            {
                title: "OUTPUT PARAMETERS",
                platform: "both",
                steps: [
                    "Do not explain basic programming concepts to me.",
                    "Provide the complete, copy-pasteable script.",
                    "Provide instructions on how to set up the necessary directory structure to test it.",
                    "Explicitly detail how you handled the edge case of malformed YAML."
                ]
            }
        ],
    }
];

// FULL RENDERER LOGIC HERE
export default function DevAndSystemsKnowledgeEngineer() {
    // ...
}
