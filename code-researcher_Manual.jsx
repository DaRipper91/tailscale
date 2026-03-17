

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
  {
    id: "intro",
    num: "I",
    title: "Introduction to Codebase Mapping",
    icon: "🗺️",
    sections: [
      {
        title: "Objective",
        platform: "both",
        content: "Systematically analyze and map the architecture, data flows, and patterns of a codebase.",
      },
      {
        title: "The Researcher Mindset",
        platform: "both",
        content: "Approach code like a forensic investigator. Look for evidence, not just documentation.",
      },
      {
        title: "Discovery Workflow",
        platform: "both",
        content: "Map Entry Points -> Trace Data Flows -> Identify Patterns -> Document Dependencies.",
      },
      {
        title: "Tools of the Trade",
        platform: "both",
        content: "Extensive use of `grep_search`, `glob`, `read_file`, and `codebase_investigator`.",
      },
      {
        title: "Pro-Tip",
        platform: "both",
        callout: { type: "tip", text: "Run a `code-researcher` pass before *any* major refactor to ensure you understand hidden side effects." },
      },
    ],
  },
  {
    id: "entry-points",
    num: "II",
    title: "Mapping Entry Points & Routes",
    icon: "🚪",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Identify where execution starts and how it propagates through the system."
        },
        {
            title: "Finding the \"Main\"",
            platform: "both",
            content: "Locate the primary index file, server entry point, or CLI dispatcher."
        },
        {
            title: "Routing & Endpoints",
            platform: "both",
            content: "Map out the API routes or command namespaces to understand the user interface."
        },
        {
            title: "Middleware & Hooks",
            platform: "both",
            content: "Identify the \"interceptor\" logic that runs between the entry point and the core logic."
        },
        {
            title: "Expected Outcome",
            platform: "both",
            content: "A \"North-to-South\" map of the application's surface area."
        }
    ]
  },
  {
    id: "data-flows",
    num: "III",
    title: "Tracing Data Flows",
    icon: "💧",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Follow a single piece of data (e.g., a User Object) from input to storage."
        },
        {
            title: "Variable Tracking",
            platform: "both",
            content: "Use `grep` to find all occurrences of a specific variable or type definition."
        },
        {
            title: "Functional Chaining",
            platform: "both",
            content: "Trace how a value is passed through a sequence of functions or services."
        },
        {
            title: "State Management",
            platform: "both",
            content: "Identify where data is mutated and how state is persisted (Database, Redux, Context)."
        },
        {
            title: "Pro-Tip",
            platform: "both",
            callout: { type: "tip", text: "Use \"Visual Debugging\" by asking the agent to create a Mermaid.js flowchart of the data path." }
        }
    ]
  },
    {
    id: "patterns",
    num: "IV",
    title: "Pattern Recognition",
    icon: "🎨",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Identify the coding standards, architectural patterns, and \"dialects\" used in the project."
        },
        {
            title: "Identifying Architecture",
            platform: "both",
            content: "Is it MVC, Microservices, Hexagonal, or a monolithic \"Spaghetti\" structure?"
        },
        {
            title: "Common Utilities",
            platform: "both",
            content: "Find the \"Helper\" or \"Utils\" folders to see how the developers handle common tasks."
        },
        {
            title: "Error Handling Patterns",
            platform: "both",
            content: "Do they use Try/Catch, Result objects, or just ignore errors?"
        },
        {
            title: "Expected Outcome",
            platform: "both",
            content: "An \"Style Guide\" based on the actual code, ensuring your new code feels \"native\" to the project."
        }
    ]
  },
  {
    id: "deps",
    num: "V",
    title: "Dependency & Impact Analysis",
    icon: "🔗",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Understand the external and internal connections of a module."
        },
        {
            title: "External Libraries",
            platform: "both",
            content: "Read `package.json`, `Cargo.toml`, or `requirements.txt` to see what the project relies on."
        },
        {
            title: "Circular Dependencies",
            platform: "both",
            content: "Identify messy loops where Module A depends on B, which depends back on A."
        },
        {
            title: "Impact \"Blast Radius\"",
            platform: "both",
            content: "Determine which other modules will break if you modify a specific function or class."
        },
        {
            title: "Pro-Tip",
            platform: "both",
            callout: { type: "tip", text: "Search for \"TODO\" or \"FIXME\" comments to find the \"fragile\" parts of the codebase." }
        }
    ]
  },
    {
    id: "debt",
    num: "VI",
    title: "Documenting Technical Debt",
    icon: "🗑️",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Identify \"AI Slop,\" obsolete code, and areas in need of refactoring."
        },
        {
            title: "Identifying Duplication",
            platform: "both",
            content: "Find similar code blocks that should be abstracted into a single function."
        },
        {
            title: "Complexity Audit",
            platform: "both",
            content: "Identify \"God Objects\" or \"Mega-Functions\" that handle too much logic."
        },
        {
            title: "Obsolete Code",
            platform: "both",
            content: "Find functions or variables that are defined but never used (Dead Code)."
        },
        {
            title: "Expected Outcome",
            platform: "both",
            content: "A prioritized list of refactoring targets for the `ruthless-refactorer` skill."
        }
    ]
  },
  {
    id: "reporting",
    num: "VII",
    title: "Research Synthesis & Reporting",
    icon: "📝",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Communicate findings clearly to other agents or human developers."
        },
        {
            title: "The Research Report",
            platform: "both",
            content: "Generate a structured Markdown report of all findings (Entry points, flows, patterns)."
        },
        {
            title: "Actionable Insights",
            platform: "both",
            content: "Translate \"What I found\" into \"What we should do next.\""
        },
        {
            title: "Updating the Conductor",
            platform: "both",
            content: "Feed the research results back into the `conductor/tech-stack.md` or `plan.md`."
        },
        {
            title: "Pro-Tip",
            platform: "both",
            callout: { type: "tip", text: "Save your research reports in a `docs/research/` folder for future reference." }
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
            content: "Quick lookup for codebase analysis tools."
        },
        {
            title: "Core Tools",
            platform: "both",
            steps: ["`grep_search`", "`read_file`", "`list_directory`", "`codebase_investigator`"]
        },
        {
            title: "FAQ: Can it analyze binary files?",
            platform: "both",
            content: "No, it focuses on source code. For binaries, use external tools like `strings` or `objdump`."
        },
        {
            title: "FAQ: How large a codebase can it handle?",
            platform: "both",
            content: "It works best on specific modules or directories. For massive repos, research one \"Track\" at a time."
        },
        {
            title: "Final Pro-Tip",
            platform: "both",
            callout: { type: "tip", text: "The best way to understand code is to try to break it. Use `code-researcher` to find the \"weak spots.\"" }
        }
    ]
  }
];

// FULL RENDERER AND THEME LOGIC...
// ... (omitted for brevity)

export default function CodeResearcherManual() {
    // ...
}
