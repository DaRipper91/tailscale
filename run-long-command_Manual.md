# Gemini Extension Manual: run-long-command
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Background Tasks
**1.1 Objective**
Execute long-running shell commands in the background without blocking the AI session.

**1.2 The Tmux Requirement**
This extension MUST run inside a `tmux` session named `gemini-cli` to enable notifications.

**1.3 Immediate Return**
The tool returns control to the agent instantly, allowing you to continue chatting while the command runs.

**1.4 The "Waking" Mechanism**
When the command finishes, it "nudges" the agent with a completion message in the input buffer.

**1.5 Pro-Tip**
Use this for `npm install`, `docker build`, or long test suites that usually take minutes to complete.

---

### Chapter 2: Executing Long Commands
**2.1 Objective**
Start a background process and understand its initial status.

**2.2 Command Signature**
Use the `run_long_command` tool to spawn your process.
```bash
# In chat:
Run a full system update in the background.
```

**2.3 PID and CWD Tracking**
The tool returns the Process ID (PID) and the directory where the command is running.

**2.4 Background PIDs**
You can track multiple background processes simultaneously by their PIDs.

**2.5 Expected Outcome**
A message confirming the start: "Command [X] started (PID: 123). I will notify you when it finishes."

---

### Chapter 3: Monitoring & Notifications
**3.1 Objective**
Receive and process the results of a finished background task.

**3.2 Completion Message**
A message will appear in your input as if typed by the user: "Background command completed..."

**3.3 Exit Codes**
The notification includes the exit code (0 for success, non-zero for failure).

**3.4 Output Truncation**
To prevent buffer overflow, only the first 200 characters of the output are captured in the notification.

**3.5 Pro-Tip**
If you need the full output, use `cat` on the log files if the command was configured to log to disk.

---

### Chapter 4: Tmux Integration & Setup
**4.1 Objective**
Ensure your environment is correctly configured for the "nudge" system.

**4.2 Creating the Session**
Start your Gemini session inside the required tmux window.
```bash
tmux new-session -s gemini-cli
gemini
```

**4.3 Detaching vs. Backgrounding**
The tool handles the backgrounding; you can still detach from the tmux session entirely.

**4.4 Injecting Keys**
The tool uses `tmux send-keys` to communicate with the active shell session.

**4.5 Expected Outcome**
A seamless asynchronous workflow where the AI acts like a supervisor for long tasks.

---

### Chapter 5: Advanced Usage & Scripting
**5.1 Objective**
Chain long commands together or integrate them into complex workflows.

**5.2 Sequential Tasks**
You can background a script that contains multiple sequential commands (e.g., `build && deploy`).

**5.3 Resource Limits**
Be aware of your system CPU/RAM; running too many background builds can slow down the agent.

**5.4 Killing Processes**
If a command hangs, use `kill -9 <PID>` via a standard shell command.

**5.5 Pro-Tip**
Use `run_long_command` in a `pickle` loop to avoid blocking the agent during the implementation phase.

---

### Chapter 6: Troubleshooting Environment Errors
**6.1 Objective**
Resolve common issues like "Tmux session not found".

**6.2 Error: Not in Tmux**
If you aren't in a session named `gemini-cli`, the tool will return an error and fail to notify you.

**6.3 Notification Delay**
In rare cases, if the system is under heavy load, the completion message might be delayed.

**6.4 Log Capture Failure**
If the command produces no output, the notification will simply show the exit code.

**6.5 Pro-Tip**
Always verify your tmux session name with `tmux ls` before starting a critical long command.

---

### Chapter 7: Security & Best Practices
**7.1 Objective**
Protect your system while running untrusted or long-running code.

**7.2 Persistent States**
Background commands can modify the file system; always audit what a script does before running it.

**7.3 Zombie Processes**
The extension tries to clean up, but always check for orphaned processes if a command fails.

**7.4 Silent Mode**
Commands that produce excessive stderr might spam the tmux notification; use redirection to quiet them.

**7.5 Expected Outcome**
A stable, non-blocking environment for professional engineering and system administration.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for `run_long_command` details.

**8.2 Tool Input**
`{ "command": "string" }`

**8.3 FAQ: Can I see real-time output?**
No, this tool only notifies upon completion. For streaming, use standard `run_shell_command`.

**8.4 FAQ: What if I close the terminal?**
If the tmux session survives, the command continues. If tmux dies, the notification will fail.

**8.5 Final Pro-Tip**
Combine this with `adb-control-gemini` to run long Android stress tests while you work on something else.
