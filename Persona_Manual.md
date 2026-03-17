# Gemini Extension Manual: Persona
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Roles & Skills
**1.1 Objective**
Master the `persona` toolset to dynamically load specialized behaviors and instructions.

**1.2 Roles vs. Skills**
*   **Roles:** Tell the AI *how* to behave (e.g., "Python Programmer").
*   **Skills:** Tell the AI *what* specialized tools and workflows to use (e.g., "PRISMA Review").

**1.3 The Registry**
A central library of curated roles and skills that can be matched and downloaded on the fly.

**1.4 Storage Protocol**
All data MUST be stored in the local `.persona/` directory (not `/tmp` or `scratch`).

**1.5 Pro-Tip**
Use roles to change the "vibe" of your chat instantly, from "Meticulous Technical Writer" to "Expert Hacker."

---

### Chapter 2: Discovering & Assuming Roles
**2.1 Objective**
Search for and adopt a specific professional persona.

**2.2 Matching a Role**
Search the registry for a role that fits your current task.
```bash
# In chat:
Find a role for a senior Terraform engineer.
```

**2.3 Retrieving the Role**
Use `get_role` or `install_role` to pull the full prompt instructions into your session.

**2.4 Standby Protocol**
Once a role is assumed, the AI will wait for your first explicit command in that role.

**2.5 Expected Outcome**
The agent’s responses will shift to match the expertise, tone, and constraints of the selected role.

---

### Chapter 3: Specialized Skills Management
**3.1 Objective**
Enhance the agent's capabilities with specialized skill folders.

**3.2 Matching a Skill**
Search for a skill when you encounter a complex, specialized task.
```bash
# In chat:
Find a skill for conducting systematic literature reviews.
```

**3.3 Installing Skills**
Download the skill files (instructions, scripts, resources) into `.persona/skills/`.

**3.4 Initialization**
The agent reads the `SKILL.md` file to understand the new workflow it must follow.

**3.5 Pro-Tip**
Always call the `version` tool of a skill before using it to ensure you have the latest implementation.

---

### Chapter 4: Creating Custom Roles
**4.1 Objective**
Design and save your own unique personas for future use.

**4.2 Role Structure**
Roles are stored as Markdown files with YAML frontmatter (Name and Description).

**4.3 The Template Prompt**
Use the `persona:roles:template` to generate a high-quality role prompt on the fly.

**4.4 Saving to Disk**
Store your new role in `.persona/roles/<folder_name>/ROLE.md`.

**4.5 Expected Outcome**
A permanent, reusable persona that you can call upon in any future project.

---

### Chapter 5: Skill Execution & Sync
**5.1 Objective**
Verify and synchronize local skills with the registry.

**5.2 Local Check**
The agent checks if the `.persona/skills/` directory exists before performing actions.

**5.3 Syncing Decision**
If a skill is missing locally but found in the registry, it is automatically installed.

**5.4 Instruction Precedence**
Specialized skills always override the agent's default behavior for that specific task.

**5.5 Pro-Tip**
Use `list_directory` on `.persona/` to see your currently installed "superpowers."

---

### Chapter 6: Prompt Library Access
**6.1 Objective**
Use professionally crafted library prompts for common tasks.

**6.2 Categorized Prompts**
Access prompts for Code Review, Documentation, Testing, and Architecture.

**6.3 Variable Substitution**
Library prompts support dynamic variables like `{{code}}` or `{{context}}`.

**6.4 Triggering Prompts**
Call a prompt (e.g., `/prompts:code-review-security`) to execute a specialized analysis.

**6.5 Expected Outcome**
High-quality, standardized results for common development and writing workflows.

---

### Chapter 7: Security & Storage Rules
**7.1 Objective**
Maintain a clean and secure `.persona` environment.

**7.2 Non-Negotiable Storage**
Never store roles/skills in temporary directories. They must live in `.persona/`.

**7.3 Relative Path Prohibition**
Always use absolute or project-root paths; relative paths (starting with `.`) are forbidden.

**7.4 Registry Trust**
Only install roles/skills from trusted registries to prevent prompt-injection attacks.

**7.5 Pro-Tip**
Add `.persona/` to your `.gitignore` if you want to keep your specific roles private to your local machine.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for all `persona` MCP tools.

**8.2 Key Tools**
*   `match_role`, `get_role`, `match_skill`, `install_skill`, `list_installed`.

**8.3 FAQ: Can I use multiple roles?**
It is best to switch roles one at a time. Loading too many roles can confuse the agent's persona.

**8.4 FAQ: Where are the files?**
They are in your current working directory under the hidden `.persona/` folder.

**8.5 Final Pro-Tip**
Combine a "Senior Architect" role with the "Research" skill for a powerful system-design session.
