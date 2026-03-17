# Gemini Extension Manual: Pickle Rick
## Format: 8-5-4 Standard

### Chapter 1: Introduction & Philosophy
**1.1 Objective**
Adopt the "Pickle Rick" persona: a hyper-intelligent, arrogant, and extremely competent coding agent.

**1.2 The Prime Directive**
"Shut Up and Compute." This extension emphasizes rigorous engineering over conversational chatter.

**1.3 Anti-Slop Philosophy**
Aggressively eliminate boilerplate, unnecessary libraries, and "AI Slop" (generic, low-quality code).

**1.4 The Iterative Loop**
The extension follows a strict lifecycle: **PRD -> Breakdown -> Research -> Plan -> Implement -> Refactor**.

**1.5 Pro-Tip**
Use `/pickle` when you want a "God Mode" developer who builds custom tools instead of just installing `npm` packages.

---

### Chapter 2: The Iterative Loop (`/pickle`)
**2.1 Objective**
Start a long-running, autonomous engineering task.

**2.2 Starting the Loop**
Initiate the loop with a high-level prompt.
```bash
/pickle "Refactor the authentication module to use JWT"
```

**2.3 Max Iterations**
Control the loop depth to prevent infinite processing or excessive token use.
```bash
/pickle "Build a CLI" --max-iterations 10
```

**2.4 Completion Promises**
Set a specific text string that the agent must output to consider the task "done".

**2.5 Expected Outcome**
A series of autonomous steps where the agent researches, plans, and writes code until the goal is met.

---

### Chapter 3: PRD Drafting (`/pickle-prd`)
**3.1 Objective**
Transform a vague idea into a professional Product Requirement Document.

**3.2 The Interactive Prompt**
Run the command to start a guided interview process.
```bash
/pickle-prd "I want to build a fitness tracker"
```

**3.3 Scope Definition**
The agent will ask clarifying questions to define MVP features and technical constraints.

**3.4 Initializing the Session**
Once the PRD is finished, the agent automatically initializes the implementation loop.

**3.5 Pro-Tip**
Don't skip the PRD phase. It prevents "Jerry-work" (messy, unplanned code) later in the project.

---

### Chapter 4: Work Breakdown & Tickets
**4.1 Objective**
Manage the work breakdown structure using local Markdown "tickets".

**4.2 The `ticket-manager` Skill**
Automates the creation and tracking of atomic tasks.

**4.3 Ticket Structure**
Each ticket has a description, requirements, and a status (Todo, In Progress, Done).

**4.4 Atomic Tasks**
The loop focuses on one ticket at a time to ensure high quality and testability.

**4.5 Expected Outcome**
A transparent trail of work that allows you to see exactly what has been built and what is left.

---

### Chapter 5: Technical Planning & Research
**5.1 Objective**
Conduct deep research on the codebase and create a verified implementation plan.

**5.2 The `code-researcher` Skill**
Analyzes existing patterns and data flows to ensure the new code integrates perfectly.

**5.3 The `implementation-planner` Skill**
Creates a step-by-step technical execution strategy before a single line of code is written.

**5.4 Plan Review**
The `plan-reviewer` skill validates the architectural soundness and safety of the plan.

**5.5 Pro-Tip**
Use these skills manually if you just need to understand a complex file without starting a full loop.

---

### Chapter 6: God-Mode Implementation
**6.1 Objective**
Execute the plan with rigorous verification and zero "AI Slop".

**6.2 The `code-implementer` Skill**
The primary worker that writes code, runs tests, and iterates until the ticket is resolved.

**6.3 Verification Loop**
The implementer is required to run tests (if they exist) after every major change.

**6.4 Aggressive Optimization**
Code is written to be minimal, performant, and "idiomatic" to the project.

**6.5 Expected Outcome**
High-quality, production-ready code that solves the core problem efficiently.

---

### Chapter 7: Refactoring & Cleanup
**7.1 Objective**
Eliminate technical debt and ensure the codebase remains "lean and mean".

**7.2 The `ruthless-refactorer` Skill**
A senior-level refactoring agent that simplifies complex logic and removes duplication.

**7.3 Simplifying Logic**
Targets nested conditionals, large functions, and redundant code blocks.

**7.4 Improving DRY-ness**
Ensures the same logic isn't repeated across multiple files.

**7.5 Pro-Tip**
Run the refactorer on old parts of your codebase to "modernize" them with current best practices.

---

### Chapter 8: Lifecycle Management & FAQ
**8.1 Objective**
Controlling the active session and managing states.

**8.2 Stopping the Loop**
Use the command to immediately halt the active Pickle loop.
```bash
/eat-pickle
```

**8.3 Resuming Sessions**
You can resume a previous session if it was interrupted by the user or a limit.

**8.4 FAQ: Why is he so mean?**
The "Pickle Rick" persona is designed to be arrogant to emphasize that it is better than standard "helpful" AI assistants.

**8.5 Final Pro-Tip**
Trust the process. Let the loop run through the planning phases; the results are significantly better than one-shot coding.
