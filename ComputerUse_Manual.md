# Gemini Extension Manual: ComputerUse
## Format: 8-5-4 Standard

### Chapter 1: Introduction & Initialization
**1.1 Objective**
Understand the purpose of ComputerUse: providing real browser automation (Playwright) to the Gemini CLI.

**1.2 Pre-requisites**
*   Node.js & Python installed.
*   Playwright & Chromium: `pip install playwright; playwright install chromium`.
*   Gemini CLI v0.6.0+.

**1.3 The `init` Command**
Initialize the browser session with a specific URL and viewport.
```bash
/computeruse:init url="https://google.com" width=1440 height=900
```

**1.4 Lifecycle Management**
Always close the browser to release system resources.
```bash
/computeruse:close
```

**1.5 Pro-Tip**
Run `xvfb-run` on Linux servers to handle "headless" browser sessions without a physical display.

---

### Chapter 2: Navigation & Basic Interaction
**2.1 Objective**
Move between pages and perform basic UI actions like clicking and typing.

**2.2 Open a URL**
Navigate to a new page within an existing session.
```bash
/computeruse:open url="https://github.com"
```

**2.3 Normalized Coordinates**
All coordinates are 0-1000 (X and Y). This makes macros viewport-independent.
```bash
/computeruse:click x=500 y=500 # Clicks the center of the screen
```

**2.4 Typing and Searching**
Focus a field, type text, and optionally press Enter.
```bash
/computeruse:type x=250 y=120 text="Gemini CLI" press_enter=true
```

**2.5 Expected Outcome**
The page should update visually. Use `/computeruse:state` to verify the result.

---

### Chapter 3: Advanced Browser Control
**3.1 Objective**
Master complex inputs like scrolling, key chords, and JavaScript execution.

**3.2 Vertical Scrolling**
Scroll to a specific percentage (0-100) of the page height.
```bash
/computeruse:scroll y=50 # Scrolls to the middle of the page
```

**3.3 Key Chords**
Execute specific keyboard shortcuts.
```bash
/computeruse:press key="Control+L" # Focus the address bar
```

**3.4 Running JavaScript**
Inject and run scripts directly into the browser context.
```bash
/computeruse:js code="return document.title;"
```

**3.5 Pro-Tip**
Use `js` to bypass complex UI interactions by directly manipulating the DOM for data extraction.

---

### Chapter 4: Visual Perception & State
**4.1 Objective**
Capture screenshots and ask Gemini to analyze what it "sees".

**4.2 The `state` Command**
Take a screenshot and optionally provide a prompt for analysis.
```bash
/computeruse:state prompt="Is the login button visible?"
```

**4.3 Output Files**
Screenshots are saved to `/tmp/gemini_computer_use/` with timestamps.

**4.4 Analyzing Changes**
Compare the current state against a previous macro step to detect UI shifts.

**4.5 Expected Outcome**
A text description from Gemini grounded in the captured PNG image.

---

### Chapter 5: Multi-Step Macros
**5.1 Objective**
Combine multiple actions into a single JSON-defined automation sequence.

**5.2 Macro Structure**
Define an array of actions with optional snapshots and labels.
```json
[
  {"name":"open_web_browser","args":{"url":"https://example.com"},"snapshot":true},
  {"name":"click_at","args":{"x":100,"y":100}}
]
```

**5.3 Running Macros**
Execute the sequence and get a summary of all steps.
```bash
/computeruse:macro actions='[...]' prompt="What happened in this flow?"
```

**5.4 Debugging Macros**
Use labels in the JSON to identify which step failed in the logs.

**5.5 Pro-Tip**
Build macros for repetitive tasks like "Log in to Dashboard" or "Export Daily Report".

---

### Chapter 6: Troubleshooting & Setup
**6.1 Objective**
Resolve common issues like "Browser not initialized" or "Connection refused".

**6.2 Error: "Browser not initialized"**
Cause: Running an action before `/computeruse:init`. Fix: Run `init` first.

**6.3 Headless Issues**
On Linux, ensure `libnss3` and `libgbm1` are installed for Chromium.

**6.4 Connection Closed**
Usually means the MCP server process crashed. Check `~/.gemini/logs/`.

**6.5 Pro-Tip**
Use `--headless=false` during development to watch the browser actions in real-time.

---

### Chapter 7: Security & Best Practices
**7.1 Objective**
Ensure automation is safe and doesn't leak secrets or damage remote systems.

**7.2 Local Execution**
All actions happen on your machine. No data is sent to external servers except screenshots for analysis.

**7.3 Credential Safety**
Never hardcode passwords in macros. Use environment variables.

**7.4 CSRF/CSP Blocks**
Some sites block automation. Try changing the `User-Agent` in the MCP server config.

**7.5 Expected Outcome**
A secure, predictable automation environment that respects user privacy.

---

### Chapter 8: API Reference & FAQ
**8.1 Objective**
Quick lookup for all available `/computeruse` commands.

**8.2 Command List**
*   `init`, `close`, `open`, `click`, `type`, `scroll`, `press`, `js`, `state`, `macro`.

**8.3 Coordinate Math**
Formula: `pixel_x = (x / 1000) * viewport_width`.

**8.4 FAQ: Can it drag and drop?**
Yes, use the `drag_and_drop` action in a macro or the CLI (if implemented in your version).

**8.5 Final Pro-Tip**
Chain `/computeruse` with `scribe` to automatically document websites as you browse them.
