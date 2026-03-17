
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Roles & Skills",
        icon: "🎭",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Master the `persona` toolset to dynamically load specialized behaviors and instructions.",
            },
            {
                title: "Roles vs. Skills",
                platform: "both",
                content: "**Roles:** Tell the AI *how* to behave (e.g., \"Python Programmer\").\n**Skills:** Tell the AI *what* specialized tools and workflows to use (e.g., \"PRISMA Review\").",
            },
            {
                title: "The Registry",
                platform: "both",
                content: "A central library of curated roles and skills that can be matched and downloaded on the fly.",
            },
            {
                title: "Storage Protocol",
                platform: "both",
                content: "All data MUST be stored in the local `.persona/` directory (not `/tmp` or `scratch`).",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use roles to change the \"vibe\" of your chat instantly, from \"Meticulous Technical Writer\" to \"Expert Hacker.\"" }
            },
        ],
    },
    {
        id: "roles",
        num: "II",
        title: "Discovering & Assuming Roles",
        icon: "👤",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Search for and adopt a specific professional persona."
            },
            {
                title: "Matching a Role",
                platform: "both",
                content: "Search the registry for a role that fits your current task.",
                code: { title: "Chat", body: "Find a role for a senior Terraform engineer." }
            },
            {
                title: "Retrieving the Role",
                platform: "both",
                content: "Use `get_role` or `install_role` to pull the full prompt instructions into your session."
            },
            {
                title: "Standby Protocol",
                platform: "both",
                content: "Once a role is assumed, the AI will wait for your first explicit command in that role."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "The agent’s responses will shift to match the expertise, tone, and constraints of the selected role."
            }
        ]
    },
    {
        id: "skills",
        num: "III",
        title: "Specialized Skills Management",
        icon: "🛠️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Enhance the agent's capabilities with specialized skill folders."
            },
            {
                title: "Matching a Skill",
                platform: "both",
                content: "Search for a skill when you encounter a complex, specialized task.",
                code: { title: "Chat", body: "Find a skill for conducting systematic literature reviews." }
            },
            {
                title: "Installing Skills",
                platform: "both",
                content: "Download the skill files (instructions, scripts, resources) into `.persona/skills/`."
            },
            {
                title: "Initialization",
                platform: "both",
                content: "The agent reads the `SKILL.md` file to understand the new workflow it must follow."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Always call the `version` tool of a skill before using it to ensure you have the latest implementation." }
            }
        ]
    },
    {
        id: "custom-roles",
        num: "IV",
        title: "Creating Custom Roles",
        icon: "🎨",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Design and save your own unique personas for future use."
            },
            {
                title: "Role Structure",
                platform: "both",
                content: "Roles are stored as Markdown files with YAML frontmatter (Name and Description)."
            },
            {
                title: "The Template Prompt",
                platform: "both",
                content: "Use the `persona:roles:template` to generate a high-quality role prompt on the fly."
            },
            {
                title: "Saving to Disk",
                platform: "both",
                content: "Store your new role in `.persona/roles/<folder_name>/ROLE.md`."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A permanent, reusable persona that you can call upon in any future project."
            }
        ]
    },
    {
        id: "sync",
        num: "V",
        title: "Skill Execution & Sync",
        icon: "🔄",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Verify and synchronize local skills with the registry."
            },
            {
                title: "Local Check",
                platform: "both",
                content: "The agent checks if the `.persona/skills/` directory exists before performing actions."
            },
            {
                title: "Syncing Decision",
                platform: "both",
                content: "If a skill is missing locally but found in the registry, it is automatically installed."
            },
            {
                title: "Instruction Precedence",
                platform: "both",
                content: "Specialized skills always override the agent's default behavior for that specific task."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use `list_directory` on `.persona/` to see your currently installed \"superpowers.\"" }
            }
        ]
    },
    {
        id: "library",
        num: "VI",
        title: "Prompt Library Access",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Use professionally crafted library prompts for common tasks."
            },
            {
                title: "Categorized Prompts",
                platform: "both",
                content: "Access prompts for Code Review, Documentation, Testing, and Architecture."
            },
            {
                title: "Variable Substitution",
                platform: "both",
                content: "Library prompts support dynamic variables like `{{code}}` or `{{context}}`."
            },
            {
                title: "Triggering Prompts",
                platform: "both",
                content: "Call a prompt (e.g., `/prompts:code-review-security`) to execute a specialized analysis."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "High-quality, standardized results for common development and writing workflows."
            }
        ]
    },
    {
        id: "security",
        num: "VII",
        title: "Security & Storage Rules",
        icon: "🛡️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Maintain a clean and secure `.persona` environment."
            },
            {
                title: "Non-Negotiable Storage",
                platform: "both",
                content: "Never store roles/skills in temporary directories. They must live in `.persona/`."
            },
            {
                title: "Relative Path Prohibition",
                platform: "both",
                content: "Always use absolute or project-root paths; relative paths (starting with `.`) are forbidden."
            },
            {
                title: "Registry Trust",
                platform: "both",
                content: "Only install roles/skills from trusted registries to prevent prompt-injection attacks."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Add `.persona/` to your `.gitignore` if you want to keep your specific roles private to your local machine." }
            }
        ]
    },
    {
        id: "reference",
        num: "VIII",
        title: "Command Reference & FAQ",
        icon: "❓",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for all `persona` MCP tools."
            },
            {
                title: "Key Tools",
                platform: "both",
                steps: ["`match_role`", "`get_role`", "`match_skill`", "`install_skill`", "`list_installed`"]
            },
            {
                title: "FAQ: Can I use multiple roles?",
                platform: "both",
                content: "It is best to switch roles one at a time. Loading too many roles can confuse the agent's persona."
            },
            {
                title: "FAQ: Where are the files?",
                platform: "both",
                content: "They are in your current working directory under the hidden `.persona/` folder."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Combine a \"Senior Architect\" role with the \"Research\" skill for a powerful system-design session." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function PersonaManual() {
    // ...
}
