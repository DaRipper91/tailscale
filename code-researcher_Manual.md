# Gemini Skill Manual: code-researcher
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Codebase Mapping
**1.1 Objective**
Systematically analyze and map the architecture, data flows, and patterns of a codebase.

**1.2 The Researcher Mindset**
Approach code like a forensic investigator. Look for evidence, not just documentation.

**1.3 Discovery Workflow**
Map Entry Points -> Trace Data Flows -> Identify Patterns -> Document Dependencies.

**1.4 Tools of the Trade**
Extensive use of `grep_search`, `glob`, `read_file`, and `codebase_investigator`.

**1.5 Pro-Tip**
Run a `code-researcher` pass before *any* major refactor to ensure you understand hidden side effects.

---

### Chapter 2: Mapping Entry Points & Routes
**2.1 Objective**
Identify where execution starts and how it propagates through the system.

**2.2 Finding the "Main"**
Locate the primary index file, server entry point, or CLI dispatcher.

**2.3 Routing & Endpoints**
Map out the API routes or command namespaces to understand the user interface.

**2.4 Middleware & Hooks**
Identify the "interceptor" logic that runs between the entry point and the core logic.

**2.5 Expected Outcome**
A "North-to-South" map of the application's surface area.

---

### Chapter 3: Tracing Data Flows
**3.1 Objective**
Follow a single piece of data (e.g., a User Object) from input to storage.

**3.2 Variable Tracking**
Use `grep` to find all occurrences of a specific variable or type definition.

**3.3 Functional Chaining**
Trace how a value is passed through a sequence of functions or services.

**3.4 State Management**
Identify where data is mutated and how state is persisted (Database, Redux, Context).

**3.5 Pro-Tip**
Use "Visual Debugging" by asking the agent to create a Mermaid.js flowchart of the data path.

---

### Chapter 4: Pattern Recognition
**4.1 Objective**
Identify the coding standards, architectural patterns, and "dialects" used in the project.

**4.2 Identifying Architecture**
Is it MVC, Microservices, Hexagonal, or a monolithic "Spaghetti" structure?

**4.3 Common Utilities**
Find the "Helper" or "Utils" folders to see how the developers handle common tasks.

**4.4 Error Handling Patterns**
Do they use Try/Catch, Result objects, or just ignore errors?

**4.5 Expected Outcome**
An "Style Guide" based on the actual code, ensuring your new code feels "native" to the project.

---

### Chapter 5: Dependency & Impact Analysis
**5.1 Objective**
Understand the external and internal connections of a module.

**5.2 External Libraries**
Read `package.json`, `Cargo.toml`, or `requirements.txt` to see what the project relies on.

**5.3 Circular Dependencies**
Identify messy loops where Module A depends on B, which depends back on A.

**5.4 Impact "Blast Radius"**
Determine which other modules will break if you modify a specific function or class.

**5.5 Pro-Tip**
Search for "TODO" or "FIXME" comments to find the "fragile" parts of the codebase.

---

### Chapter 6: Documenting Technical Debt
**6.1 Objective**
Identify "AI Slop," obsolete code, and areas in need of refactoring.

**6.2 Identifying Duplication**
Find similar code blocks that should be abstracted into a single function.

**6.3 Complexity Audit**
Identify "God Objects" or "Mega-Functions" that handle too much logic.

**6.4 Obsolete Code**
Find functions or variables that are defined but never used (Dead Code).

**6.5 Expected Outcome**
A prioritized list of refactoring targets for the `ruthless-refactorer` skill.

---

### Chapter 7: Research Synthesis & Reporting
**7.1 Objective**
Communicate findings clearly to other agents or human developers.

**7.2 The Research Report**
Generate a structured Markdown report of all findings (Entry points, flows, patterns).

**7.3 Actionable Insights**
Translate "What I found" into "What we should do next."

**7.4 Updating the Conductor**
Feed the research results back into the `conductor/tech-stack.md` or `plan.md`.

**7.5 Pro-Tip**
Save your research reports in a `docs/research/` folder for future reference.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for codebase analysis tools.

**8.2 Core Tools**
*   `grep_search`, `read_file`, `list_directory`, `codebase_investigator`.

**8.3 FAQ: Can it analyze binary files?**
No, it focuses on source code. For binaries, use external tools like `strings` or `objdump`.

**8.4 FAQ: How large a codebase can it handle?**
It works best on specific modules or directories. For massive repos, research one "Track" at a time.

**8.5 Final Pro-Tip**
The best way to understand code is to try to break it. Use `code-researcher` to find the "weak spots."
