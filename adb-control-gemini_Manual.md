# Gemini Extension Manual: adb-control-gemini
## Format: 8-5-4 Standard

### Chapter 1: Introduction & Environment
**1.1 Objective**
Control Android devices (physical or emulated) via ADB through the Gemini CLI.

**1.2 Pre-requisites**
*   `android-tools` installed (`sudo pacman -S android-tools`).
*   USB Debugging enabled on the target device.
*   Device connected and authorized: `adb devices`.

**1.3 Waking the Device**
If the screen is off, use the home action to wake it up.
```bash
/android:home
```

**1.4 Strategy: Scripting over Tapping**
Prioritize `run_ai_script` for complex logic rather than individual tap commands.

**1.5 Pro-Tip**
Use wireless ADB (`adb connect <ip>`) to control devices across your local network without cables.

---

### Chapter 2: Smart Perception & Inspection
**2.1 Objective**
Understand what is currently on the Android screen.

**2.2 Screen Summary**
Get a token-efficient list of interactive elements (buttons, text fields).
```bash
/android:get_screen_summary
```

**2.3 Inspect UI**
Retrieve the full XML layout tree for deep element identification.
```bash
/android:inspect_ui
```

**2.4 Visual Perception**
Use OCR and image matching for elements that don't appear in the XML tree.
```bash
/android:visual_perception prompt="Where is the 'Skip' button?"
```

**2.5 Expected Outcome**
A detailed map of the current UI state, allowing for precise targeting.

---

### Chapter 3: High-Speed Automation
**3.1 Objective**
Execute complex Python-based logic locally for fast device control.

**3.2 The `run_ai_script` Tool**
Write Python logic to handle "Find -> Wait -> Click" loops.
```python
if find("Search"):
    click("Search")
    type("Hello World")
```

**3.3 Batch Execution**
Run a sequence of ADB actions in a single tool call to reduce latency.
```bash
/android:execute_batch actions='[{"action":"tap", "x":100, "y":200}, {"action":"type", "text":"test"}]'
```

**3.4 Waiting for Elements**
Use `wait_for(text)` to ensure the UI has loaded before the next action.

**3.5 Pro-Tip**
Use scripts to automate repetitive mobile tasks like "Claim Daily Reward" or "Clear Cache".

---

### Chapter 4: Communication & Messaging
**4.1 Objective**
Automate reading and replying to messages (SMS, WhatsApp, Telegram).

**4.2 Reading Messages**
Extract the most recent notifications or chat history.
```python
msgs = read_messages()
print(msgs[-1])
```

**4.3 Smart Replying**
Analyze incoming context and generate a relevant response.
```python
reply("I'm in a meeting, talk soon.")
```

**4.4 Handling Logic**
Implement filters: "Only reply to John" or "If message contains 'urgent' then alert me".

**4.5 Expected Outcome**
Hands-free messaging management directly from your terminal.

---

### Chapter 5: System & App Management
**5.1 Objective**
Install apps, clear data, and manage system-level settings.

**5.2 Installing APKs**
Install a local file to the connected device.
```bash
adb install my_app.apk
```

**5.3 App Lifecycle**
Force stop or clear data for specific packages.
```bash
/android:execute_command command="shell pm clear com.example.app"
```

**5.4 Logcat Monitoring**
Stream system logs to debug app crashes or behavior.
```bash
/android:adb_logcat filter="*:E" # Show only errors
```

**5.5 Pro-Tip**
Use `pm list packages -3` to quickly find the package names of third-party apps you want to automate.

---

### Chapter 6: Navigation & Gestures
**6.1 Objective**
Navigate the OS using standard Android navigation and custom gestures.

**6.2 Key Events**
Send specific hardware key signals (Back, Recent, Volume).
```bash
/android:back
```

**6.3 Swiping & Scrolling**
Simulate finger movements for list navigation.
```bash
/android:swipe start_x=500 start_y=800 end_x=500 end_y=200 duration=500
```

**6.4 Unlocking the Device**
Automate PIN entry or swipe-to-unlock (if security allows).

**6.5 Pro-Tip**
Combine `get_screen_summary` with `swipe` to programmatically scroll until a specific button is found.

---

### Chapter 7: Security & Best Practices
**7.1 Objective**
Protect your device data and ensure stable automation.

**7.2 USB Debugging Risks**
Always disable USB Debugging when not in use to prevent unauthorized access.

**7.3 Authorization**
Ensure you "Always allow from this computer" when first connecting a device.

**7.4 Script Timeouts**
Always include timeouts in your `wait_for` calls to prevent infinite loops if the app crashes.

**7.5 Expected Outcome**
A reliable, secure connection that allows for professional-grade mobile automation.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for the 100+ supported ADB commands.

**8.2 Core Commands**
*   `tap`, `type`, `swipe`, `home`, `back`, `find`, `read_messages`, `reply`.

**8.3 Custom Shell Commands**
You can run any `adb shell` command using the `execute_command` tool.

**8.4 FAQ: Can I control multiple devices?**
Yes, use `adb -s <serial_number>` in your commands to target specific hardware.

**8.5 Final Pro-Tip**
Use `adb-control-gemini` for mobile testing in CI/CD pipelines to ensure app stability.
