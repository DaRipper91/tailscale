# Gemini Skill Manual: skill-creator
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Meta-Skills
**1.1 Objective**
Master the ability to create new, specialized skills that extend Gemini's capabilities.

**1.2 What is a Skill?**
A skill is a folder containing a `SKILL.md` file (instructions) and optional scripts or resources.

**1.3 The Creation Pipeline**
Analyze Needs -> Draft Instructions -> Define Tools -> Test & Iterate.

**1.4 Portability**
Skills are designed to be shared and reused across different projects and environments.

**1.5 Pro-Tip**
Use `skill-creator` whenever you find yourself repeating the same complex instructions in every chat.

---

### Chapter 2: Designing the `SKILL.md`
**2.1 Objective**
Write clear, non-ambiguous instructions that the AI can follow with high precision.

**2.2 Section: Role & Persona**
Define the expertise level and "brain" of the skill (e.g., "PhD-level Microbiologist").

**2.3 Section: Core Mandates**
List the non-negotiable rules the skill must follow (e.g., "Always cite sources").

**2.4 Section: Workflow**
Provide a step-by-step phased approach (Phase 1: Analyze, Phase 2: Act, etc.).

**2.5 Expected Outcome**
A robust instruction set that turns a general-purpose AI into a specialized expert.

---

### Chapter 3: Defining Custom Tools
**3.1 Objective**
Map existing MCP tools or shell scripts to the skill's specific tasks.

**3.2 Tool Integration**
Explain which tools (like `grep` or `exa`) the skill should use and when.

**3.3 Data Input/Output**
Define how the skill should handle files and what format its responses should take.

**3.4 Parameter Constraints**
Set strict rules for how tools should be called (e.g., "Always use `--json` output").

**3.5 Pro-Tip**
A good skill doesn't just talk; it *acts* by using tools to gather and process data.

---

### Chapter 4: Testing & Iteration
**4.1 Objective**
Refine the skill through practical use cases and failure analysis.

**4.2 The "Dry Run"**
Ask the agent to simulate the skill's workflow and point out any ambiguities.

**4.3 Debugging Instructions**
Identify where the AI gets confused or deviates from the plan and update the `SKILL.md`.

**4.4 Handling Edge Cases**
Add "If/Then" logic to the instructions to handle unexpected data or errors.

**4.5 Expected Outcome**
A "battle-tested" skill that performs reliably even with complex or messy inputs.

---

### Chapter 5: Skill Packaging & Installation
**5.1 Objective**
Ensure the skill is correctly structured for the `persona` extension to load.

**5.2 The Folder Structure**
`.persona/skills/<skill_name>/SKILL.md` (and optional subfolders).

**5.3 Frontmatter & Metadata**
Use the `persona` standard for naming and describing the skill for registry discovery.

**5.4 Dependency Management**
List any external tools (like `nodejs` or `pip`) required for the skill to function.

**5.5 Pro-Tip**
Keep your skills "atomic"—one skill should do one thing perfectly rather than ten things poorly.

---

### Chapter 6: Sharing & Collaboration
**6.1 Objective**
Prepare your skills to be shared with other users or teams.

**6.2 Documentation**
Write a `README.md` for the *human* user explaining what the skill does and how to call it.

**6.3 Versioning**
Keep track of changes in a `CHANGELOG` to avoid breaking workflows for others.

**6.4 Licensing**
Choose an appropriate license (like MIT) if you plan to share the skill on GitHub.

**6.5 Expected Outcome**
A professional-grade skill package that can be instantly installed and used by anyone.

---

### Chapter 7: Advanced Meta-Programming
**7.1 Objective**
Create "Higher-Order" skills that manage or orchestrate other skills.

**7.2 Skill Chaining**
Design a workflow where Skill A produces output specifically for Skill B.

**7.3 Self-Correction**
Include a "Review" phase where the skill audits its own output for errors.

**7.4 Dynamic Instruction Injection**
Techniques for making a skill adapt its instructions based on the current project context.

**7.5 Pro-Tip**
Build a "Manager" skill to oversee complex projects by delegating tasks to other specialized skills.

---

### Chapter 8: Reference & Skill Registry
**8.1 Objective**
Quick lookup for skill creation standards.

**8.2 Required Files**
`SKILL.md`, `gemini-extension.json` (if part of an extension).

**8.3 FAQ: Can skills use Python?**
Yes, if they call the `run_shell_command` or an MCP tool that executes Python scripts.

**8.4 FAQ: Where do I store them?**
Always store your local creations in `~/.gemini/skills/` or the project's `.persona/skills/`.

**8.5 Final Pro-Tip**
The best skill is one that you forget is there—it just works seamlessly as part of your natural workflow.
