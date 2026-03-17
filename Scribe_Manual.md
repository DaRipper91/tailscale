# Gemini Extension Manual: Scribe
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Expert Documentation
**1.1 Objective**
Master the art of creating, auditing, and polishing professional-grade documentation.

**1.2 The Scribe Persona**
A meticulous technical writer and auditor who focuses on clarity, consistency, and precision.

**1.3 Core Mandates**
1. Adhere to established project styles. 2. Focus on "Why" over "What". 3. Ensure visual accessibility.

**1.4 Supported Formats**
Markdown, LaTeX, PDF, and high-quality structured text files.

**1.5 Pro-Tip**
Use Scribe to turn complex, messy engineering notes into beautiful, readable user manuals.

---

### Chapter 2: Planning & Structuring (`/scribe:plan`)
**2.1 Objective**
Create a logical roadmap for any long-form document or manual.

**2.2 Analyzing User Needs**
The tool analyzes the audience and purpose before suggesting a structure.

**2.3 Generating the Outline**
Creates a hierarchical structure (Chapters, Sections) based on best practices.
```bash
/scribe:plan "I need a structure for a Linux Kernel module guide."
```

**2.4 Logical Flow**
Ensures that pre-requisites are covered before complex steps are introduced.

**2.5 Expected Outcome**
A comprehensive Table of Contents that serves as the "skeleton" for your document.

---

### Chapter 3: Content Drafting (`/scribe:draft`)
**3.1 Objective**
Generate detailed, high-signal content for specific sections or chapters.

**3.2 The Research Input**
Scribe uses the output from `deep-research` or `codebase_investigator` to write factual content.

**3.3 Maintaining Tone**
Ensures that the language remains consistent (e.g., professional, instructional, or academic).

**3.4 Integrating Code Blocks**
Automatically formats and explains code snippets as part of the instructional flow.

**3.5 Pro-Tip**
Draft one chapter at a time to maintain high detail and avoid generic "hallucinated" filler text.

---

### Chapter 4: Polishing & Consistency (`/scribe:polish`)
**3.1 Objective**
Refine existing drafts for better readability, grammar, and flow.

**3.2 Identifying Passive Voice**
Converts weak, passive language into strong, active instructions.

**3.3 Formatting Uniformity**
Ensures that headers, bolding, and lists follow a consistent style throughout the project.

**3.4 Removing Redundancy**
Aggressively cuts out "fluff" and repetitive sentences to keep the reader engaged.

**3.5 Expected Outcome**
A professional, "published-quality" document that is easy to skim and understand.

---

### Chapter 5: Technical Auditing (`/scribe:audit`)
**5.1 Objective**
Verify the accuracy and safety of technical documentation and instructions.

**5.2 Step-by-Step Validation**
The agent "mentally simulates" the instructions to check for missing steps or logical gaps.

**5.3 Safety Checks**
Flags dangerous commands (like `rm -rf /`) and ensures appropriate warnings are present.

**5.4 Link Verification**
Checks that all internal and external links mentioned in the document are valid and relevant.

**5.5 Pro-Tip**
Always run an `/scribe:audit` on your installation guides before sharing them with users.

---

### Chapter 6: The 8-5-4 Workflow
**6.1 Objective**
Implement the high-performance "8 Chapters, 5 Sections, 4 Visuals" documentation strategy.

**6.2 Chapter 1-8 Breakdown**
1: Intro, 2: Setup, 3-5: Core, 6: Advanced, 7: Reference, 8: FAQ.

**6.3 Section Requirements**
Each section MUST contain: Objective, Pre-reqs, Steps, Outcome, and Pro-Tip.

**6.4 Visual Density**
Every section is required to have 4 high-value visual elements (code, diagrams, or tables).

**6.5 Expected Outcome**
A manual that is visually rich, logically perfect, and practically useful.

---

### Chapter 7: Morphing & Archiving
**7.1 Objective**
Repurpose content for different audiences and manage document versions.

**7.2 The `/scribe:morph` Command**
Transform a technical spec for engineers into a simple guide for non-technical users.

**7.3 Status Tracking**
Use `/scribe:status` to see which parts of your manual are drafted, reviewed, or done.

**7.4 Managing the Archive**
Move old versions of documentation into the `archive/` folder to prevent confusion.

**7.5 Pro-Tip**
Archive your "Thoughts" and "Plans" once a project is finished to keep your workspace clean.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for all Scribe commands and sub-commands.

**8.2 Core Namespace: `/scribe`**
*   `plan`, `draft`, `polish`, `audit`, `morph`, `status`, `review`, `iterate`.

**8.3 FAQ: Can it write in LaTeX?**
Yes, simply specify the format in your prompt (e.g., "Draft Chapter 1 in LaTeX").

**8.4 FAQ: Where are the files saved?**
Scribe follows the Project root or standard `Documents/` paths unless specified.

**8.5 Final Pro-Tip**
Use Scribe to document *yourself*. Keep a daily log using `/scribe:draft` to track your progress.
