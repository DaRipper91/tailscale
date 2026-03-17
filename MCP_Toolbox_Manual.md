# Gemini Extension Manual: MCP Toolbox
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Data Tools
**1.1 Objective**
Build and use custom Model Context Protocol (MCP) tools to access enterprise data and databases.

**1.2 Tool Configuration**
Custom tools are defined in a `tools.yaml` file hosted in your project's root directory.

**1.3 The Bridge**
This extension acts as a universal adapter between the LLM and your data sources (SQL, APIs, etc.).

**1.4 Discovery Protocol**
The extension automatically discovers tools by reading the local configuration files.

**1.5 Pro-Tip**
Use MCP Toolbox to give the AI read-only access to your production databases for safe analysis.

---

### Chapter 2: Configuring `tools.yaml`
**2.1 Objective**
Define the schema and connection details for your custom data tools.

**2.2 Defining Tools**
Specify the tool name, description, and the command to execute (e.g., a Python script or SQL query).

**2.3 Parameter Mapping**
Define what arguments the tool expects and how the AI should provide them.

**2.4 Security Context**
Use environment variables for database credentials; never hardcode them in `tools.yaml`.

**2.5 Expected Outcome**
A new set of custom tools appearing in the agent's toolbox, ready to be called.

---

### Chapter 3: Database Integration
**3.1 Objective**
Allow the AI to query SQL databases (Postgres, MySQL, SQLite) safely.

**3.2 Read-Only Queries**
Always configure your tools with a read-only database user to prevent accidental data modification.

**3.3 Data Transformation**
Use your tool scripts to format database output into clean JSON or Markdown for the LLM.

**3.4 Handling Large Results**
Implement pagination or truncation in your scripts to avoid overwhelming the LLM's context window.

**3.5 Pro-Tip**
Create a "Data Scientist" persona to use these tools for complex trend analysis and reporting.

---

### Chapter 4: External API Wrappers
**4.1 Objective**
Connect internal or third-party APIs as native MCP tools.

**4.2 Authentication**
Handle API keys and headers within the tool's execution script.

**4.3 Error Handling**
Ensure your scripts return clear error messages that the AI can understand and react to.

**4.4 Caching Results**
Implement local caching in your tool scripts to reduce API costs and improve speed.

**4.5 Expected Outcome**
Seamless integration of external data (like weather, stock prices, or Jira tickets) into your chat.

---

### Chapter 5: Security & Approval
**5.1 Objective**
Maintain control over which data tools the AI can execute.

**5.2 Tool Approval Mode**
Always keep `approvalMode: "plan"` or `autoAccept: false` in your `settings.json` for sensitive data tools.

**5.3 Auditing Calls**
Check your shell logs to see exactly what commands were executed by the Toolbox.

**5.4 Input Sanitization**
The AI-provided arguments should be treated as untrusted; always sanitize them in your tool scripts.

**5.5 Pro-Tip**
Use the `scribe:audit` command to review the security of your `tools.yaml` configuration.

---

### Chapter 6: Troubleshooting Discovery
**6.1 Objective**
Resolve errors like "unable to read tool file" or "ENOENT".

**6.2 Missing `tools.yaml`**
Ensure the file is named exactly `tools.yaml` and is in the directory where you started Gemini CLI.

**6.3 Path Resolution**
Use absolute paths for scripts in your `tools.yaml` to avoid path-not-found errors.

**6.4 JSON/YAML Errors**
Validate your configuration files for syntax errors before starting the CLI.

**6.5 Pro-Tip**
If tools aren't appearing, restart the Gemini CLI session to trigger a fresh discovery.

---

### Chapter 7: Advanced Tool Development
**7.1 Objective**
Leverage the GenAI Toolbox SDK for sophisticated multi-step tools.

**7.2 Using `llms.txt`**
Provide high-level summaries for the AI to understand complex data relationships.

**7.3 Context Injections**
Use tools to inject specific file contents or system states into the LLM's reasoning.

**7.4 Versioning Tools**
Keep track of tool versions to ensure compatibility with different agent personas.

**7.5 Expected Outcome**
A robust, enterprise-grade AI toolset tailored specifically to your project's data needs.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for Toolbox-related issues.

**8.2 Key Concepts**
*   `tools.yaml`, MCP Server, Remote Tools, JSON-RPC.

**8.3 FAQ: Can it write to my DB?**
Yes, but it is dangerous. Only allow "Write" tools if you have strict user confirmation enabled.

**8.4 FAQ: Where is the log?**
Tool output is usually combined with the standard CLI output or logged in `~/.gemini/tmp/`.

**8.5 Final Pro-Tip**
Combine MCP Toolbox with `conductor` to automate project status updates from your actual task tracker.
