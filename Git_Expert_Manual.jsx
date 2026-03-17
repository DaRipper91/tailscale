
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction & Semantic Workflows",
        icon: "📝",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Automate Git tasks using semantic standards and professional PR generation.",
            },
            {
                title: "Semantic Commits",
                platform: "both",
                content: "Strict adherence to Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, etc.",
            },
            {
                title: "The Core Loop",
                platform: "both",
                content: "Analyze Changes -> Generate Message/PR -> User Approval -> Execute.",
            },
            {
                title: "Safety First",
                platform: "both",
                content: "Force pushes (`-f`) are forbidden unless explicitly overridden by the user.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use Git Expert to maintain a perfectly clean and readable project history with zero effort." }
            },
        ],
    },
    {
        id: "commits",
        num: "II",
        title: "Automated Commits (`/commit`)",
        icon: "💬",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Generate professional, semantic commit messages for staged changes."
            },
            {
                title: "Analyzing the Stage",
                platform: "both",
                content: "The tool runs `git diff --cached` to understand exactly what you are committing."
            },
            {
                title: "Generating the Message",
                platform: "both",
                content: "Creates a 50-character imperative subject and a detailed \"Why\" in the body.",
                code: { title: "Bash", body: "/commit # Generates: \"feat: add user authentication module\"" }
            },
            {
                title: "The Confirmation Step",
                platform: "both",
                content: "The agent presents the message and asks: \"Should I commit with this message?\""
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A professional commit that follows team standards without you having to type a word."
            }
        ]
    },
    {
        id: "prs",
        num: "III",
        title: "Pull Request Descriptions (`/pr-desc`)",
        icon: "📄",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Generate detailed PR summaries based on the difference between branches."
            },
            {
                title: "Comparison Logic",
                platform: "both",
                content: "The tool analyzes `git diff main...HEAD` to find all changes in your current branch."
            },
            {
                title: "Structured Output",
                platform: "both",
                content: "Generates a Markdown description with sections for Summary, Changes, Impact, and Testing."
            },
            {
                title: "Contextual Awareness",
                platform: "both",
                content: "It links changes to existing issues if it finds issue numbers in your code or branch name."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Run `/pr-desc` before opening a GitHub PR to ensure your reviewers have all the context they need." }
            }
        ]
    },
    {
        id: "issues",
        num: "IV",
        title: "Issue Resolution (`/resolve-issue`)",
        icon: "💡",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Turn a bug report or feature request into an actionable implementation plan."
            },
            {
                title: "Parsing the Issue",
                platform: "both",
                content: "Paste the text of a GitHub issue, and the agent breaks it down into code tasks.",
                code: { title: "Bash", body: "/resolve-issue \"Fix the login loop on Android 14\"" }
            },
            {
                title: "Task Breakdown",
                platform: "both",
                content: "The agent suggests a logical order of operations (e.g., Fix logic -> Update tests -> Verify)."
            },
            {
                title: "Transition to Pickle",
                platform: "both",
                content: "If the task is complex, use the output of `/resolve-issue` as the starting prompt for `/pickle`."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A clear roadmap for fixing a bug or implementing a feature, grounded in your actual codebase."
            }
        ]
    },
    {
        id: "branching",
        num: "V",
        title: "Advanced Branch Management",
        icon: "🌿",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Automate branch creation and merging strategies."
            },
            {
                title: "Clean Branches",
                platform: "both",
                content: "Automatically name branches based on the task: `feat/login-system` or `fix/issue-123`."
            },
            {
                title: "Conflict Resolution",
                platform: "both",
                content: "The agent can analyze merge conflicts and suggest the most logical resolution based on history."
            },
            {
                title: "Stashing & Popping",
                platform: "both",
                content: "Manage temporary work states safely during context switches."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Always run `git status` before calling Git Expert to ensure you are on the correct branch." }
            }
        ]
    },
    {
        id: "versioning",
        num: "VI",
        title: "Semantic Versioning & Tags",
        icon: "🔖",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Manage project releases and version numbers using semantic logic."
            },
            {
                title: "Automatic Tagging",
                platform: "both",
                content: "Suggest version bumps (Major, Minor, Patch) based on the commit history since the last tag."
            },
            {
                title: "Changelog Generation",
                platform: "both",
                content: "Use the `git-expert` history to generate a professional `CHANGELOG.md` file."
            },
            {
                title: "Remote Synchronization",
                platform: "both",
                content: "Automate the pushing of tags to GitHub/GitLab as part of the release process."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A perfectly tracked release history that makes it easy to revert or audit changes."
            }
        ]
    },
    {
        id: "security",
        num: "VII",
        title: "Security & Best Practices",
        icon: "🛡️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Ensure Git operations are safe and compliant with security standards."
            },
            {
                title: "No Secrets in Commits",
                platform: "both",
                content: "The agent will warn you if it detects API keys or hardcoded secrets in the diff before committing."
            },
            {
                title: "Signed Commits",
                platform: "both",
                content: "Ensure your GPG signing is configured; the agent will respect your local Git config."
            },
            {
                title: "Atomic Commits",
                platform: "both",
                content: "The agent encourages committing small, logical chunks rather than massive \"monolithic\" changes."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use `.gitignore` aggressively. The agent will remind you if you're tracking files that should be ignored." }
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
                content: "Quick lookup for common Git Expert commands."
            },
            {
                title: "Core Tools",
                platform: "both",
                steps: ["`/commit`", "`/pr-desc`", "`/resolve-issue`"]
            },
            {
                title: "FAQ: Does it support GitLab?",
                platform: "both",
                content: "Yes, it works with any Git-based system as it relies on local Git commands."
            },
            {
                title: "FAQ: Can it push to remote?",
                platform: "both",
                content: "It will usually ask for your confirmation before running `git push`."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Combine Git Expert with the `code-review` extension for a fully automated QA pipeline." }
            }
        ]
    }
];
// FULL RENDERER LOGIC HERE
export default function GitExpertManual() {
    // ...
}
