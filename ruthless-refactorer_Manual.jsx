
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Clean Code",
        icon: "🧼",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Eliminate technical debt, simplify logic, and ensure every line of code is necessary and efficient.",
            },
            {
                title: "The \"Ruthless\" Mindset",
                platform: "both",
                content: "If code is redundant, confusing, or \"slop,\" it MUST be deleted or rewritten. No mercy.",
            },
            {
                title: "The Refactoring Goal",
                platform: "both",
                content: "High Readability + High Performance + Low Complexity = Clean Code.",
            },
            {
                title: "Identification Phase",
                platform: "both",
                content: "Find smells: Duplication, Long Methods, Large Classes, and \"Magic Numbers.\"",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Run this skill on \"AI-Generated\" code from other models; it is excellent at removing \"Slop.\"" }
            },
        ],
    },
    {
        id: "dry",
        num: "II",
        title: "Eliminating Code Duplication (DRY)",
        icon: "🚫",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Ensure every piece of knowledge has a single, unambiguous representation within the system."
            },
            {
                title: "Finding Patterns",
                platform: "both",
                content: "Identify similar logic repeated in multiple functions or files."
            },
            {
                title: "Abstraction & Extracting Methods",
                platform: "both",
                content: "Move repeated logic into a shared \"Util\" or \"Helper\" function."
            },
            {
                title: "Parameterizing Logic",
                platform: "both",
                content: "Transform hardcoded variations into a single function that takes arguments."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A smaller, more maintainable codebase where a bug fix only needs to happen in one place."
            }
        ]
    },
    {
        id: "simplify",
        num: "III",
        title: "Simplifying Complex Logic",
        icon: "📉",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Reduce \"Cyclomatic Complexity\" (the number of paths through a function)."
            },
            {
                title: "Flattening Nested Ifs",
                platform: "both",
                content: "Use \"Guard Clauses\" and early returns to remove deep indentation."
            },
            {
                title: "Replacing Conditionals with Polymorphism",
                platform: "both",
                content: "Use objects or classes to handle variations instead of massive `switch` statements."
            },
            {
                title: "Boolean Simplification",
                platform: "both",
                content: "Clean up messy `if (a && b || (c && !d))` logic into readable, named variables."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "If a function is more than 20 lines long, it likely needs to be broken down." }
            }
        ]
    },
    {
        id: "naming",
        num: "IV",
        title: "Improving Naming & Readability",
        icon: "✍️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Ensure code \"reads like prose\" and describes its purpose without needing comments."
            },
            {
                title: "Descriptive Variables",
                platform: "both",
                content: "Replace `const d = 86400;` with `const SECONDS_IN_A_DAY = 86400;`."
            },
            {
                title: "Verb-Based Functions",
                platform: "both",
                content: "Functions should be actions: `calculateTotal()`, `validateUser()`, `sendEmail()`."
            },
            {
                title: "Removing Obvious Comments",
                platform: "both",
                content: "Delete comments that just repeat what the code does (`// Add one to i`)."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A codebase where a new developer can understand the logic just by reading the names."
            }
        ]
    },
    {
        id: "performance",
        num: "V",
        title: "Optimizing Performance & Memory",
        icon: "⚡",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Identify and fix \"slow\" code patterns and memory leaks."
            },
            {
                title: "Loop Optimization",
                platform: "both",
                content: "Avoid expensive operations (like DB queries or API calls) inside loops."
            },
            {
                title: "Efficient Data Structures",
                platform: "both",
                content: "Choose the right tool for the job (e.g., Use a `Set` for fast lookups instead of an `Array`)."
            },
            {
                title: "Removing Dead Code",
                platform: "both",
                content: "Aggressively delete variables and functions that are defined but never used."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use \"Lazy Loading\" to ensure you only process data when it is actually needed." }
            }
        ]
    },
    {
        id: "decoupling",
        num: "VI",
        title: "Decoupling & Module Design",
        icon: "🔗",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Reduce \"Tightly Coupled\" code to make modules easier to test and swap."
            },
            {
                title: "Dependency Injection",
                platform: "both",
                content: "Pass dependencies into a function instead of hardcoding them inside."
            },
            {
                title: "Single Responsibility Principle (SRP)",
                platform: "both",
                content: "Ensure every class or function does ONE thing perfectly."
            },
            {
                title: "Standardizing Interfaces",
                platform: "both",
                content: "Ensure different modules communicate using a consistent, predictable format."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Plug-and-Play\" architecture where changing the Database doesn't break the UI."
            }
        ]
    },
    {
        id: "testing",
        num: "VII",
        title: "Verification & Testing",
        icon: "✔️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Ensure that \"Refactoring\" didn't change the behavior of the code (Regression Testing)."
            },
            {
                title: "Unit Test Execution",
                platform: "both",
                content: "Run existing tests after every major refactoring step."
            },
            {
                title: "Identifying Test Gaps",
                platform: "both",
                content: "If a piece of code is too hard to refactor, it usually means it lacks tests."
            },
            {
                title: "Continuous Integration (CI)",
                platform: "both",
                content: "Integrate refactoring into the daily dev cycle to prevent debt from accumulating."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Refactor *before* you add a new feature to ensure you are building on a solid foundation." }
            }
        ]
    },
    {
        id: "reference',
        num: "VIII",
        title: "Reference & Refactoring Checklist",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for \"Smells\" and \"Fixes.\""
            },
            {
                title: "The \"Smell\" List",
                platform: "both",
                content: "Primitive Obsession, Shotgun Surgery, Feature Envy, and Inappropriate Intimacy."
            },
            {
                title: "FAQ: Should I refactor working code?",
                platform: "both",
                content: "Yes, if it is \"hard to read\" or \"slow.\" Good code is not just code that \"works.\""
            },
            {
                title: "FAQ: Can I automate this?",
                platform: "both",
                content: "Partially. Tools like `eslint` help, but the `ruthless-refactorer` provides the \"Human-like\" logic."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Refactoring is not a \"Project\"—it is a habit. Leave the code cleaner than you found it." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function RuthlessRefactorerManual() {
    // ...
}
