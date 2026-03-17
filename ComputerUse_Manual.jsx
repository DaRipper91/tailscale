
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction & Initialization",
        icon: "🚀",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Understand the purpose of ComputerUse: providing real browser automation (Playwright) to the Gemini CLI.",
            },
            {
                title: "Pre-requisites",
                platform: "both",
                steps: [
                    "Node.js & Python installed.",
                    "Playwright & Chromium: `pip install playwright; playwright install chromium`.",
                    "Gemini CLI v0.6.0+."
                ],
            },
            {
                title: "The `init` Command",
                platform: "both",
                content: "Initialize the browser session with a specific URL and viewport.",
                code: { title: "Bash", body: `/computeruse:init url="https://google.com" width=1440 height=900` }
            },
            {
                title: "Lifecycle Management",
                platform: "both",
                content: "Always close the browser to release system resources.",
                code: { title: "Bash", body: `/computeruse:close` }
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Run `xvfb-run` on Linux servers to handle \"headless\" browser sessions without a physical display." }
            },
        ],
    },
    {
        id: "navigation",
        num: "II",
        title: "Navigation & Basic Interaction",
        icon: "🖱️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Move between pages and perform basic UI actions like clicking and typing."
            },
            {
                title: "Open a URL",
                platform: "both",
                content: "Navigate to a new page within an existing session.",
                code: { title: "Bash", body: `/computeruse:open url="https://github.com"` }
            },
            {
                title: "Normalized Coordinates",
                platform: "both",
                content: "All coordinates are 0-1000 (X and Y). This makes macros viewport-independent.",
                code: { title: "Bash", body: "/computeruse:click x=500 y=500 # Clicks the center of the screen" }
            },
            {
                title: "Typing and Searching",
                platform: "both",
                content: "Focus a field, type text, and optionally press Enter.",
                code: { title: "Bash", body: `/computeruse:type x=250 y=120 text="Gemini CLI" press_enter=true` }
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "The page should update visually. Use `/computeruse:state` to verify the result."
            }
        ]
    },
    {
        id: "advanced",
        num: "III",
        title: "Advanced Browser Control",
        icon: "⚙️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Master complex inputs like scrolling, key chords, and JavaScript execution."
            },
            {
                title: "Vertical Scrolling",
                platform: "both",
                content: "Scroll to a specific percentage (0-100) of the page height.",
                code: { title: "Bash", body: "/computeruse:scroll y=50 # Scrolls to the middle of the page" }
            },
            {
                title: "Key Chords",
                platform: "both",
                content: "Execute specific keyboard shortcuts.",
                code: { title: "Bash", body: `/computeruse:press key="Control+L" # Focus the address bar` }
            },
            {
                title: "Running JavaScript",
                platform: "both",
                content: "Inject and run scripts directly into the browser context.",
                code: { title: "Bash", body: `/computeruse:js code="return document.title;"` }
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use `js` to bypass complex UI interactions by directly manipulating the DOM for data extraction." }
            }
        ]
    },
    {
        id: "state",
        num: "IV",
        title: "Visual Perception & State",
        icon: "🖼️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Capture screenshots and ask Gemini to analyze what it \"sees\"."
            },
            {
                title: "The `state` Command",
                platform: "both",
                content: "Take a screenshot and optionally provide a prompt for analysis.",
                code: { title: "Bash", body: `/computeruse:state prompt="Is the login button visible?"` }
            },
            {
                title: "Output Files",
                platform: "both",
                content: "Screenshots are saved to `/tmp/gemini_computer_use/` with timestamps."
            },
            {
                title: "Analyzing Changes",
                platform: "both",
                content: "Compare the current state against a previous macro step to detect UI shifts."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A text description from Gemini grounded in the captured PNG image."
            }
        ]
    },
    {
        id: "macros",
        num: "V",
        title: "Multi-Step Macros",
        icon: "📜",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Combine multiple actions into a single JSON-defined automation sequence."
            },
            {
                title: "Macro Structure",
                platform: "both",
                content: "Define an array of actions with optional snapshots and labels.",
                code: { title: "JSON", body: `[
  {"name":"open_web_browser","args":{"url":"https://example.com"},"snapshot":true},
  {"name":"click_at","args":{"x":100,"y":100}}
]` }
            },
            {
                title: "Running Macros",
                platform: "both",
                content: "Execute the sequence and get a summary of all steps.",
                code: { title: "Bash", body: `/computeruse:macro actions='[...]' prompt="What happened in this flow?"` }
            },
            {
                title: "Debugging Macros",
                platform: "both",
                content: "Use labels in the JSON to identify which step failed in the logs."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Build macros for repetitive tasks like \"Log in to Dashboard\" or \"Export Daily Report\"." }
            }
        ]
    },
    {
        id: "troubleshooting",
        num: "VI",
        title: "Troubleshooting & Setup",
        icon: "🛠️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Resolve common issues like \"Browser not initialized\" or \"Connection refused\"."
            },
            {
                title: "Error: \"Browser not initialized\"",
                platform: "both",
                content: "Cause: Running an action before `/computeruse:init`. Fix: Run `init` first."
            },
            {
                title: "Headless Issues",
                platform: "both",
                content: "On Linux, ensure `libnss3` and `libgbm1` are installed for Chromium."
            },
            {
                title: "Connection Closed",
                platform: "both",
                content: "Usually means the MCP server process crashed. Check `~/.gemini/logs/`."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use `--headless=false` during development to watch the browser actions in real-time." }
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
                content: "Ensure automation is safe and doesn't leak secrets or damage remote systems."
            },
            {
                title: "Local Execution",
                platform: "both",
                content: "All actions happen on your machine. No data is sent to external servers except screenshots for analysis."
            },
            {
                title: "Credential Safety",
                platform: "both",
                content: "Never hardcode passwords in macros. Use environment variables."
            },
            {
                title: "CSRF/CSP Blocks",
                platform: "both",
                content: "Some sites block automation. Try changing the `User-Agent` in the MCP server config."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A secure, predictable automation environment that respects user privacy."
            }
        ]
    },
    {
        id: "reference",
        num: "VIII",
        title: "API Reference & FAQ",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for all available `/computeruse` commands."
            },
            {
                title: "Command List",
                platform: "both",
                steps: ["`init`", "`close`", "`open`", "`click`", "`type`", "`scroll`", "`press`", "`js`", "`state`", "`macro`"]
            },
            {
                title: "Coordinate Math",
                platform: "both",
                content: "Formula: `pixel_x = (x / 1000) * viewport_width`."
            },
            {
                title: "FAQ: Can it drag and drop?",
                platform: "both",
                content: "Yes, use the `drag_and_drop` action in a macro or the CLI (if implemented in your version)."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Chain `/computeruse` with `scribe` to automatically document websites as you browse them." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function ComputerUseManual() {
    // ...
}
