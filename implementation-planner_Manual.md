# Gemini Skill Manual: implementation-planner
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Atomic Planning
**1.1 Objective**
Master the ability to break a complex feature into a step-by-step, atomic implementation strategy.

**1.2 The Planner Mindset**
Think like a General. Map the terrain, identify risks, and plan the "Attack" (implementation) in phases.

**1.3 The Core Principle**
"Atomic Tasks": Every step must be small enough to be completed and tested in one go.

**1.4 Planning Workflow**
Analyze Spec -> Identify Dependencies -> Break into Steps -> Sequence -> Review.

**1.5 Pro-Tip**
A perfect plan makes the implementation phase trivial. Spend 20% of your time planning and 80% executing.

---

### Chapter 2: Analyzing the Specification
**2.1 Objective**
Understand exactly *what* needs to be built before deciding *how* to build it.

**2.2 Parsing the PRD/Spec**
Identify the core requirements, constraints, and success criteria.

**2.3 Identifying "Unknowns"**
List any part of the spec that is vague or relies on technologies you haven't used yet.

**2.4 Defining the Scope**
Draw a hard line around what is "In-Scope" and "Out-of-Scope" for this specific task.

**2.5 Expected Outcome**
A "Requirement Map" that ensures the plan covers every single part of the specification.

---

### Chapter 3: Dependency Mapping
**3.1 Objective**
Identify the order of operations to prevent "Blocking" or rework.

**3.2 Internal Dependencies**
"Module A must exist before Module B can import it."

**3.3 External Dependencies**
"We need the Stripe API Key before we can test the payment flow."

**3.4 The "Critical Path"**
Identify the sequence of tasks that determines the total duration of the implementation.

**3.5 Pro-Tip**
Use a "Bottom-Up" approach: Build the smallest, most independent utility functions first.

---

### Chapter 4: Task Breakdowns (Atomic Steps)
**4.1 Objective**
Translate the specification into a series of 15-30 minute coding tasks.

**4.2 The "Single File" Rule**
Try to make each step focus on a single file or a very small, related group of files.

**4.3 Describing the "How"**
Each step should explain not just what to do, but which tool to use (e.g., "Use `write_file` to create X").

**4.4 Definition of Done (DoD)**
Every step must have a clear "Success State" (e.g., "Script runs with zero errors").

**4.5 Expected Outcome**
A "Checklist" of tasks that any competent developer (or agent) could follow blindly.

---

### Chapter 5: Sequence & Phasing
**5.1 Objective**
Organize the tasks into logical phases (e.g., Setup, Core, UI, Testing).

**5.2 Phase 1: Infrastructure & Data**
Setting up the boilerplate, database schemas, and configuration.

**5.3 Phase 2: Core Logic**
Implementing the "Engine" of the feature (the business logic).

**5.4 Phase 3: Integration & UI**
Connecting the logic to the user interface or API endpoints.

**5.5 Pro-Tip**
Always include a "Phase 0" for environment setup and a "Phase 4" for cleanup and refactoring.

---

### Chapter 6: Risk & Mitigation Planning
**6.1 Objective**
Identify what could go wrong and have a "Plan B" ready.

**6.2 Identifying Fragile Code**
Which existing parts of the codebase are most likely to break during this implementation?

**6.3 Performance Risks**
Could this new feature slow down the app? Plan for optimization.

**6.4 Rollback Strategy**
How do we undo the changes if the implementation fails catastrophically?

**6.5 Expected Outcome**
A "Safety Manual" that accompanies the implementation plan to protect the codebase.

---

### Chapter 7: Plan Review & Validation
**7.1 Objective**
Audit the plan for logical gaps, missing steps, or architectural flaws.

**7.2 The `plan-reviewer` Skill**
Use this specialized skill to get a second opinion on your implementation strategy.

**7.3 Sanity Check**
Does the order of tasks actually make sense? Are any steps too large or too vague?

**7.4 Final Approval**
The plan is ready when it can be handed to a "junior" developer (or an AI) for execution.

**7.5 Pro-Tip**
If a plan has more than 20 steps, consider breaking it into two smaller "Tracks" in Conductor.

---

### Chapter 8: Reference & Planning Template
**8.1 Objective**
Quick lookup for implementation planning standards.

**8.2 The "Perfect Plan" Template**
Title -> Goal -> Tech Stack -> Tasks (Phase-by-Phase) -> Verification.

**8.3 FAQ: How detailed should I be?**
Be detailed enough that you don't have to "think" during the implementation phase.

**8.4 FAQ: What if I have to change the plan?**
Change the plan first, then resume implementation. Never code "off-plan."

**8.5 Final Pro-Tip**
A good plan is the ultimate antidote to "Developer Fatigue." Just follow the steps!
