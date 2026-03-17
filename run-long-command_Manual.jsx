import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Background Tasks",
        icon: "⏳",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Execute long-running shell commands in the background without blocking the AI session.",
            },
            {
                title: "The Tmux Requirement",
                platform: "both",
                content: "This extension MUST run inside a `tmux` session named `gemini-cli` to enable notifications.",
            },
            {
                title: "Immediate Return",
                platform: "both",
                content: "The tool returns control to the agent instantly, allowing you to continue chatting while the command runs.",
            },
            {
                title: "The \"Waking\" Mechanism",
                platform: "both",
                content: "When the command finishes, it \"nudges\" the agent with a completion message in the input buffer.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this for `npm install`, `docker build`, or long test suites that usually take minutes to complete." }
            },
        ],
    },
    {
        id: "execution",
        num: "II",
        title: "Executing Long Commands",
        icon: "🚀",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Start a background process and understand its initial status."
            },
            {
                title: "Command Signature",
                platform: "both",
                content: "Use the `run_long_command` tool to spawn your process.",
                code: { title: "Chat", body: "Run a full system update in the background." }
            },
            {
                title: "PID and CWD Tracking",
                platform: "both",
                content: "The tool returns the Process ID (PID) and the directory where the command is running."
            },
            {
                title: "Background PIDs",
                platform: "both",
                content: "You can track multiple background processes simultaneously by their PIDs."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A message confirming the start: \"Command [X] started (PID: 123). I will notify you when it finishes.\""
            }
        ]
    },
    {
        id: "monitoring",
        num: "III",
        title: "Monitoring & Notifications",
        icon: "🔔",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Receive and process the results of a finished background task."
            },
            {
                title: "Completion Message",
                platform: "both",
                content: "A message will appear in your input as if typed by the user: \"Background command completed...\""
            },
            {
                title: "Exit Codes",
                platform: "both",
                content: "The notification includes the exit code (0 for success, non-zero for failure)."
            },
            {
                title: "Output Truncation",
                platform: "both",
                content: "To prevent buffer overflow, only the first 200 characters of the output are captured in the notification."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "If you need the full output, use `cat` on the log files if the command was configured to log to disk." }
            }
        ]
    },
    {
        id: "tmux",
        num: "IV",
        title: "Tmux Integration & Setup",
        icon: "🖥️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Ensure your environment is correctly configured for the \"nudge\" system."
            },
            {
                title: "Creating the Session",
                platform: "both",
                content: "Start your Gemini session inside the required tmux window.",
                code: { title: "Bash", body: "tmux new-session -s gemini-cli\ngemini" }
            },
            {
                title: "Detaching vs. Backgrounding",
                platform: "both",
                content: "The tool handles the backgrounding; you can still detach from the tmux session entirely."
            },
            {
                title: "Injecting Keys",
                platform: "both",
                content: "The tool uses `tmux send-keys` to communicate with the active shell session."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A seamless asynchronous workflow where the AI acts like a supervisor for long tasks."
            }
        ]
    },
    {
        id: "advanced",
        num: "V",
        title: "Advanced Usage & Scripting",
        icon: "⚙️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Chain long commands together or integrate them into complex workflows."
            },
            {
                title: "Sequential Tasks",
                platform: "both",
                content: "You can background a script that contains multiple sequential commands (e.g., `build && deploy`)."
            },
            {
                title: "Resource Limits",
                platform: "both",
                content: "Be aware of your system CPU/RAM; running too many background builds can slow down the agent."
            },
            {
                title: "Killing Processes",
                platform: "both",
                content: "If a command hangs, use `kill -9 <PID>` via a standard shell command."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use `run_long_command` in a `pickle` loop to avoid blocking the agent during the implementation phase." }
            }
        ]
    },
    {
        id: "troubleshooting",
        num: "VI",
        title: "Troubleshooting Environment Errors",
        icon: "🛠️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Resolve common issues like \"Tmux session not found\"."
            },
            {
                title: "Error: Not in Tmux",
                platform: "both",
                content: "If you aren\'t in a session named `gemini-cli`, the tool will return an error and fail to notify you."
            },
            {
                title: "Notification Delay",
                platform: "both",
                content: "In rare cases, if the system is under heavy load, the completion message might be delayed."
            },
            {
                title: "Log Capture Failure",
                platform: "both",
                content: "If the command produces no output, the notification will simply show the exit code."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Always verify your tmux session name with `tmux ls` before starting a critical long command." }
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
                content: "Protect your system while running untrusted or long-running code."
            },
            {
                title: "Persistent States",
                platform: "both",
                content: "Background commands can modify the file system; always audit what a script does before running it."
            },
            {
                title: "Zombie Processes",
                platform: "both",
                content: "The extension tries to clean up, but always check for orphaned processes if a command fails."
            },
            {
                title: "Silent Mode",
                platform: "both",
                content: "Commands that produce excessive stderr might spam the tmux notification; use redirection to quiet them."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A stable, non-blocking environment for professional engineering and system administration."
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
                content: "Quick lookup for `run_long_command` details."
            },
            {
                title: "Tool Input",
                platform: "both",
                code: { title: "JSON", body: "{ \"command\": \"string\" }" }
            },
            {
                title: "FAQ: Can I see real-time output?",
                platform: "both",
                content: "No, this tool only notifies upon completion. For streaming, use standard `run_shell_command`."
            },
            {
                title: "FAQ: What if I close the terminal?",
                platform: "both",
                content: "If the tmux session survives, the command continues. If tmux dies, the notification will fail."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Combine this with `adb-control-gemini` to run long Android stress tests while you work on something else." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function RunLongCommandManual() {
    // ...
}
