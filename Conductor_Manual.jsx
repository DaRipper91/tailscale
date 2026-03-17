import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Project Tracks",
        icon: "🛤️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Manage complex, multi-stage projects by breaking them into independent, parallel \"Tracks\".",
            },
            {
                title: "The Conductor Directory",
                platform: "both",
                content: "All project metadata lives in the `conductor/` folder at your project root.",
            },
            {
                title: "Track Architecture",
                platform: "both",
                content: "Each track has its own folder, specification, implementation plan, and metadata.",
            },
            {
                title: "The Tracks Registry",
                platform: "both",
                content: "A central file (`conductor/tracks.md`) that maps out every active and completed track.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use Conductor when a project is too large for a single `/pickle` loop or involves multiple modules." }
            },
        ],
    },
    {
        id: "protocol",
        num: "II",
        title: "The Universal Resolution Protocol",
        icon: "🔗",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Locate any project or track file instantly using a strict index-first protocol."
            },
            {
                title: "Step 1: Identify Index",
                platform: "both",
                content: "Start with `conductor/index.md` for project context or `<track>/index.md` for track context."
            },
            {
                title: "Step 2: Resolve Path",
                platform: "both",
                content: "Follow the links in the index file relative to that directory."
            },
            {
                title: "Step 3: Verify & Fallback",
                platform: "both",
                content: "If the index is missing, use standard defaults (e.g., `product.md`, `tech-stack.md`)."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "Zero \"lost\" files. The agent always knows exactly where to find requirements or plans."
            }
        ]
    },
    {
        id: "setup",
        num: "III",
        title: "Setting Up a New Project",
        icon: "🏗️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Initialize the Conductor environment and define the \"North Star\" for your project."
            },
            {
                title: "Product Definition",
                platform: "both",
                content: "Create `conductor/product.md` to define the *What* and *Why* of the entire project."
            },
            {
                title: "Tech Stack Selection",
                platform: "both",
                content: "Define your languages, frameworks, and infrastructure in `conductor/tech-stack.md`."
            },
            {
                title: "Workflow Guidelines",
                platform: "both",
                content: "Set the rules for how code is written, tested, and reviewed in `conductor/workflow.md`."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Be as detailed as possible in the Product Definition; it becomes the \"brain\" for all subsequent tracks." }
            }
        ]
    },
    {
        id: "lifecycle",
        num: "IV",
        title: "Managing Tracks & Lifecycle",
        icon: "🔄",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Create, execute, and close individual implementation tracks."
            },
            {
                title: "Creating a Track",
                platform: "both",
                content: "Generate a new track ID and folder: `conductor/tracks/<track_id>/`."
            },
            {
                title: "The Track Specification",
                platform: "both",
                content: "Write a focused `spec.md` that defines the exact scope of this specific track."
            },
            {
                title: "Implementation Planning",
                platform: "both",
                content: "Create a `plan.md` using the `implementation-planner` skill to map out the execution."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A modular project structure where features can be developed and tested in isolation."
            }
        ]
    },
    {
        id: "metadata",
        num: "V",
        title: "Track Metadata & Tracking",
        icon: "📊",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Maintain machine-readable state for project automation."
            },
            {
                title: "metadata.json",
                platform: "both",
                content: "Each track contains a JSON file tracking its status, priority, and dependencies."
            },
            {
                title: "Dependency Mapping",
                platform: "both",
                content: "Define if Track B requires Track A to be finished before starting."
            },
            {
                title: "Automatic Updates",
                platform: "both",
                content: "The agent updates the Tracks Registry (`tracks.md`) as work progresses."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use the metadata to generate automatic project status reports for stakeholders." }
            }
        ]
    },
    {
        id: "coordination",
        num: "VI",
        title: "Cross-Track Coordination",
        icon: "🤝",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Manage shared resources and resolve conflicts between parallel tracks."
            },
            {
                title: "Shared Libraries",
                platform: "both",
                content: "Define common modules in the `Tech Stack` to ensure consistency across tracks."
            },
            {
                title: "Inter-Track Communication",
                platform: "both",
                content: "Use the registry to identify which tracks might be affected by a change in another track."
            },
            {
                title: "Merging Tracks",
                platform: "both",
                content: "The process of integrating a completed track's code into the main project branch."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A coherent, unified codebase even when developed by multiple autonomous AI loops."
            }
        ]
    },
    {
        id: "troubleshooting",
        num: "VII",
        title: "Troubleshooting & Protocol Errors",
        icon: "🛠️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Resolve common issues like broken links or missing registries."
            },
            {
                title: "Broken Link Handling",
                platform: "both",
                content: "If a link in `index.md` fails, the agent falls back to the Tracks Directory: `conductor/tracks/`."
            },
            {
                title: "Registry Desync",
                platform: "both",
                content: "If `tracks.md` doesn't match the actual folders, run a \"re-sync\" task to update the registry."
            },
            {
                title: "Missing Specifications",
                platform: "both",
                content: "Always ensure a `spec.md` exists before starting the implementation phase of a track."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Run a weekly \"Audit\" track to clean up project metadata and archive old files." }
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
                content: "Quick lookup for Conductor file paths and roles."
            },
            {
                title: "Default Project Paths",
                platform: "both",
                steps: ["`product.md`", "`tech-stack.md`", "`workflow.md`", "`tracks.md`"]
            },
            {
                title: "Default Track Paths",
                platform: "both",
                steps: ["`spec.md`", "`plan.md`", "`metadata.json`"]
            },
            {
                title: "FAQ: Can I use Conductor without Pickle?",
                platform: "both",
                content: "Yes, Conductor is a management layer. You can execute tracks manually or with other tools."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use Conductor to manage your life! Create a \"Life\" project and use tracks for different goals." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function ConductorManual() {
    // ...
}
