# Gemini Skill Manual: prd-drafter
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Requirements Engineering
**1.1 Objective**
Translate a raw product idea into a rigid, professional Product Requirement Document (PRD).

**1.2 Why a PRD?**
It prevents "Feature Creep," ensures team alignment, and provides a "God-Tier" plan for implementation.

**1.3 The "North Star" Principle**
Every feature in the PRD must serve the core mission of the product.

**1.4 The PRD Workflow**
Ideation -> Interview -> Draft -> Review -> Finalize.

**1.5 Pro-Tip**
Use the `prd-drafter` before starting any `/pickle` loop to avoid "Jerry-work" (messy, unplanned code).

---

### Chapter 2: The Project Foundation
**2.1 Objective**
Define the high-level purpose, audience, and "Success Metrics" for the product.

**2.2 Product Definition**
What problem are we solving? Who are we solving it for?

**2.3 User Personas**
Define the "Ideal User" (e.g., "The Busy Developer," "The Non-Technical Manager").

**2.4 Success Metrics (KPIs)**
How will we know if the product is successful? (e.g., "Load time < 1s," "Zero data loss").

**2.5 Expected Outcome**
A clear, 1-page summary that everyone on the team understands and agrees with.

---

### Chapter 3: Feature Scope & Prioritization
**3.1 Objective**
List all possible features and categorize them by their importance to the MVP.

**3.2 The MoSCoW Method**
**M**ust have. **S**hould have. **C**ould have. **W**on't have (for now).

**3.3 Functional Requirements**
Specific behaviors the system must perform (e.g., "User can log in with Google").

**3.4 Non-Functional Requirements**
System qualities (e.g., "Security," "Scalability," "Maintainability").

**3.5 Pro-Tip**
Be ruthless. If a feature isn't "Must Have" for the MVP, move it to the backlog.

---

### Chapter 4: User Flows & UX
**4.1 Objective**
Map out the step-by-step journey a user takes through the application.

**4.2 Creating User Stories**
"As a [Persona], I want to [Action], so that [Value]."

**4.3 The "Happy Path"**
The most common, error-free path a user takes to achieve their goal.

**4.4 Edge Cases & Error States**
What happens if the user enters a wrong password or the server goes down?

**4.5 Expected Outcome**
A logical map that ensures the user experience is intuitive and complete.

---

### Chapter 5: Technical Constraints & Stack
**5.1 Objective**
Define the architectural "Boundaries" within which the product must be built.

**5.2 Technology Stack**
Languages, databases, frameworks, and third-party APIs (e.g., "Next.js + Postgres + Gemini API").

**5.3 Infrastructure & Hosting**
Where will the app live? (e.g., "AWS," "Vercel," "Local Server").

**5.4 Security Requirements**
Encryption, authentication, and data privacy standards.

**5.5 Pro-Tip**
Consult the `tech-stack.md` in your `conductor/` directory to ensure alignment.

---

### Chapter 6: Milestones & Roadmap
**6.1 Objective**
Break the project into "Phases" with clear deadlines and deliverables.

**6.2 Phase 1: MVP (Minimum Viable Product)**
The absolute minimum set of features needed to launch and gather feedback.

**6.3 Phase 2: Core Enhancements**
The "Should Have" features that make the product "Great."

**6.4 Phase 3: Scaling & Polish**
Advanced features, performance optimization, and UI refinement.

**6.5 Expected Outcome**
A timeline that keeps the project on track and prevents "Analysis Paralysis."

---

### Chapter 7: PRD Review & Auditing
**7.1 Objective**
Ensure the PRD is logical, complete, and technically feasible.

**7.2 Internal Audit**
The agent checks the PRD for internal contradictions or missing requirements.

**7.3 Feasibility Check**
Can this actually be built with the selected tech stack and timeline?

**7.4 Stakeholder Sign-off**
Present the PRD to the "User" (you) for final approval before coding starts.

**7.5 Pro-Tip**
Use the `critical-analysis` skill to find "vague" requirements and make them specific.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for PRD-related prompts.

**8.2 Core Sections**
Summary, Audience, Requirements (Func/Non-Func), User Flows, Tech Stack, Roadmap.

**8.3 FAQ: How long should it be?**
As long as it needs to be to be "Complete" but as short as possible to be "Readable."

**8.4 FAQ: Can I change it later?**
Yes, but changing the PRD mid-implementation is expensive. Change it during the "Planning" phase.

**8.5 Final Pro-Tip**
A PRD is a living document. Update it as you learn more during the building process.
