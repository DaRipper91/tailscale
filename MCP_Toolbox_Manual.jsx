
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Data Tools",
        icon: "🔧",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Build and use custom Model Context Protocol (MCP) tools to access enterprise data and databases.",
            },
            {
                title: "Tool Configuration",
                platform: "both",
                content: "Custom tools are defined in a `tools.yaml` file hosted in your project's root directory.",
            },
            {
                title: "The Bridge",
                platform: "both",
                content: "This extension acts as a universal adapter between the LLM and your data sources (SQL, APIs, etc.).",
            },
            {
                title: "Discovery Protocol",
                platform: "both",
                content: "The extension automatically discovers tools by reading the local configuration files.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use MCP Toolbox to give the AI read-only access to your production databases for safe analysis." }
            },
        ],
    },
    {
        id: "config",
        num: "II",
        title: "Configuring `tools.yaml`",
        icon: "📄",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Define the schema and connection details for your custom data tools."
            },
            {
                title: "Defining Tools",
                platform: "both",
                content: "Specify the tool name, description, and the command to execute (e.g., a Python script or SQL query)."
            },
            {
                title: "Parameter Mapping",
                platform: "both",
                content: "Define what arguments the tool expects and how the AI should provide them."
            },
            {
                title: "Security Context",
                platform: "both",
                content: "Use environment variables for database credentials; never hardcode them in `tools.yaml`."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A new set of custom tools appearing in the agent's toolbox, ready to be called."
            }
        ]
    },
    {
        id: "db",
        num: "III",
        title: "Database Integration",
        icon: "🗃️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Allow the AI to query SQL databases (Postgres, MySQL, SQLite) safely."
            },
            {
                title: "Read-Only Queries",
                platform: "both",
                content: "Always configure your tools with a read-only database user to prevent accidental data modification."
            },
            {
                title: "Data Transformation",
                platform: "both",
                content: "Use your tool scripts to format database output into clean JSON or Markdown for the LLM."
            },
            {
                title: "Handling Large Results",
                platform: "both",
                content: "Implement pagination or truncation in your scripts to avoid overwhelming the LLM's context window."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Create a \"Data Scientist\" persona to use these tools for complex trend analysis and reporting." }
            }
        ]
    },
    {
        id: "api",
        num: "IV",
        title: "External API Wrappers",
        icon: "🌐",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Connect internal or third-party APIs as native MCP tools."
            },
            {
                title: "Authentication",
                platform: "both",
                content: "Handle API keys and headers within the tool's execution script."
            },
            {
                title: "Error Handling",
                platform: "both",
                content: "Ensure your scripts return clear error messages that the AI can understand and react to."
            },
            {
                title: "Caching Results",
                platform: "both",
                content: "Implement local caching in your tool scripts to reduce API costs and improve speed."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "Seamless integration of external data (like weather, stock prices, or Jira tickets) into your chat."
            }
        ]
    },
    {
        id: "security",
        num: "V",
        title: "Security & Approval",
        icon: "🛡️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Maintain control over which data tools the AI can execute."
            },
            {
                title: "Tool Approval Mode",
                platform: "both",
                content: "Always keep `approvalMode: \"plan\"` or `autoAccept: false` in your `settings.json` for sensitive data tools."
            },
            {
                title: "Auditing Calls",
                platform: "both",
                content: "Check your shell logs to see exactly what commands were executed by the Toolbox."
            },
            {
                title: "Input Sanitization",
                platform: "both",
                content: "The AI-provided arguments should be treated as untrusted; always sanitize them in your tool scripts."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use the `scribe:audit` command to review the security of your `tools.yaml` configuration." }
            }
        ]
    },
    {
        id: "troubleshooting",
        num: "VI",
        title: "Troubleshooting Discovery",
        icon: "🛠️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Resolve errors like \"unable to read tool file\" or \"ENOENT\"."
            },
            {
                title: "Missing `tools.yaml`",
                platform: "both",
                content: "Ensure the file is named exactly `tools.yaml` and is in the directory where you started Gemini CLI."
            },
            {
                title: "Path Resolution",
                platform: "both",
                content: "Use absolute paths for scripts in your `tools.yaml` to avoid path-not-found errors."
            },
            {
                title: "JSON/YAML Errors",
                platform: "both",
                content: "Validate your configuration files for syntax errors before starting the CLI."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "If tools aren't appearing, restart the Gemini CLI session to trigger a fresh discovery." }
            }
        ]
    },
    {
        id: "advanced",
        num: "VII",
        title: "Advanced Tool Development",
        icon: "⚙️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Leverage the GenAI Toolbox SDK for sophisticated multi-step tools."
            },
            {
                title: "Using `llms.txt`",
                platform: "both",
                content: "Provide high-level summaries for the AI to understand complex data relationships."
            },
            {
                title: "Context Injections",
                platform: "both",
                content: "Use tools to inject specific file contents or system states into the LLM's reasoning."
            },
            {
                title: "Versioning Tools",
                platform: "both",
                content: "Keep track of tool versions to ensure compatibility with different agent personas."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A robust, enterprise-grade AI toolset tailored specifically to your project's data needs."
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
                content: "Quick lookup for Toolbox-related issues."
            },
            {
                title: "Key Concepts",
                platform: "both",
                steps: ["`tools.yaml`", "MCP Server", "Remote Tools", "JSON-RPC"]
            },
            {
                title: "FAQ: Can it write to my DB?",
                platform: "both",
                content: "Yes, but it is dangerous. Only allow \"Write\" tools if you have strict user confirmation enabled."
            },
            {
                title: "FAQ: Where is the log?",
                platform: "both",
                content: "Tool output is usually combined with the standard CLI output or logged in `~/.gemini/tmp/`."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Combine MCP Toolbox with `conductor` to automate project status updates from your actual task tracker." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function MCPToolboxManual() {
    // ...
}
