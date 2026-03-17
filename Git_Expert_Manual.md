# Gemini Extension Manual: Git Expert
## Format: 8-5-4 Standard

### Chapter 1: Introduction & Semantic Workflows
**1.1 Objective**
Automate Git tasks using semantic standards and professional PR generation.

**1.2 Semantic Commits**
Strict adherence to Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, etc.

**1.3 The Core Loop**
Analyze Changes -> Generate Message/PR -> User Approval -> Execute.

**1.4 Safety First**
Force pushes (`-f`) are forbidden unless explicitly overridden by the user.

**1.5 Pro-Tip**
Use Git Expert to maintain a perfectly clean and readable project history with zero effort.

---

### Chapter 2: Automated Commits (`/commit`)
**2.1 Objective**
Generate professional, semantic commit messages for staged changes.

**2.2 Analyzing the Stage**
The tool runs `git diff --cached` to understand exactly what you are committing.

**2.3 Generating the Message**
Creates a 50-character imperative subject and a detailed "Why" in the body.
```bash
/commit # Generates: "feat: add user authentication module"
```

**2.4 The Confirmation Step**
The agent presents the message and asks: "Should I commit with this message?"

**2.5 Expected Outcome**
A professional commit that follows team standards without you having to type a word.

---

### Chapter 3: Pull Request Descriptions (`/pr-desc`)
**3.1 Objective**
Generate detailed PR summaries based on the difference between branches.

**2.2 Comparison Logic**
The tool analyzes `git diff main...HEAD` to find all changes in your current branch.

**2.3 Structured Output**
Generates a Markdown description with sections for Summary, Changes, Impact, and Testing.

**2.4 Contextual Awareness**
It links changes to existing issues if it finds issue numbers in your code or branch name.

**2.5 Pro-Tip**
Run `/pr-desc` before opening a GitHub PR to ensure your reviewers have all the context they need.

---

### Chapter 4: Issue Resolution (`/resolve-issue`)
**4.1 Objective**
Turn a bug report or feature request into an actionable implementation plan.

**4.2 Parsing the Issue**
Paste the text of a GitHub issue, and the agent breaks it down into code tasks.
```bash
/resolve-issue "Fix the login loop on Android 14"
```

**4.3 Task Breakdown**
The agent suggests a logical order of operations (e.g., Fix logic -> Update tests -> Verify).

**4.4 Transition to Pickle**
If the task is complex, use the output of `/resolve-issue` as the starting prompt for `/pickle`.

**4.5 Expected Outcome**
A clear roadmap for fixing a bug or implementing a feature, grounded in your actual codebase.

---

### Chapter 5: Advanced Branch Management
**5.1 Objective**
Automate branch creation and merging strategies.

**5.2 Clean Branches**
Automatically name branches based on the task: `feat/login-system` or `fix/issue-123`.

**5.3 Conflict Resolution**
The agent can analyze merge conflicts and suggest the most logical resolution based on history.

**5.4 Stashing & Popping**
Manage temporary work states safely during context switches.

**5.5 Pro-Tip**
Always run `git status` before calling Git Expert to ensure you are on the correct branch.

---

### Chapter 6: Semantic Versioning & Tags
**6.1 Objective**
Manage project releases and version numbers using semantic logic.

**6.2 Automatic Tagging**
Suggest version bumps (Major, Minor, Patch) based on the commit history since the last tag.

**6.3 Changelog Generation**
Use the `git-expert` history to generate a professional `CHANGELOG.md` file.

**6.4 Remote Synchronization**
Automate the pushing of tags to GitHub/GitLab as part of the release process.

**6.5 Expected Outcome**
A perfectly tracked release history that makes it easy to revert or audit changes.

---

### Chapter 7: Security & Best Practices
**7.1 Objective**
Ensure Git operations are safe and compliant with security standards.

**7.2 No Secrets in Commits**
The agent will warn you if it detects API keys or hardcoded secrets in the diff before committing.

**7.3 Signed Commits**
Ensure your GPG signing is configured; the agent will respect your local Git config.

**7.4 Atomic Commits**
The agent encourages committing small, logical chunks rather than massive "monolithic" changes.

**7.5 Pro-Tip**
Use `.gitignore` aggressively. The agent will remind you if you're tracking files that should be ignored.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for common Git Expert commands.

**8.2 Core Tools**
*   `/commit`, `/pr-desc`, `/resolve-issue`.

**8.3 FAQ: Does it support GitLab?**
Yes, it works with any Git-based system as it relies on local Git commands.

**8.4 FAQ: Can it push to remote?**
It will usually ask for your confirmation before running `git push`.

**8.5 Final Pro-Tip**
Combine Git Expert with the `code-review` extension for a fully automated QA pipeline.
