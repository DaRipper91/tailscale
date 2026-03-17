# Gemini Extension Manual: Conductor
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Project Tracks
**1.1 Objective**
Manage complex, multi-stage projects by breaking them into independent, parallel "Tracks".

**1.2 The Conductor Directory**
All project metadata lives in the `conductor/` folder at your project root.

**1.3 Track Architecture**
Each track has its own folder, specification, implementation plan, and metadata.

**1.4 The Tracks Registry**
A central file (`conductor/tracks.md`) that maps out every active and completed track.

**1.5 Pro-Tip**
Use Conductor when a project is too large for a single `/pickle` loop or involves multiple modules.

---

### Chapter 2: The Universal Resolution Protocol
**2.1 Objective**
Locate any project or track file instantly using a strict index-first protocol.

**2.2 Step 1: Identify Index**
Start with `conductor/index.md` for project context or `<track>/index.md` for track context.

**2.3 Step 2: Resolve Path**
Follow the links in the index file relative to that directory.

**2.4 Step 3: Verify & Fallback**
If the index is missing, use standard defaults (e.g., `product.md`, `tech-stack.md`).

**2.5 Expected Outcome**
Zero "lost" files. The agent always knows exactly where to find requirements or plans.

---

### Chapter 3: Setting Up a New Project
**3.1 Objective**
Initialize the Conductor environment and define the "North Star" for your project.

**3.2 Product Definition**
Create `conductor/product.md` to define the *What* and *Why* of the entire project.

**3.3 Tech Stack Selection**
Define your languages, frameworks, and infrastructure in `conductor/tech-stack.md`.

**3.4 Workflow Guidelines**
Set the rules for how code is written, tested, and reviewed in `conductor/workflow.md`.

**3.5 Pro-Tip**
Be as detailed as possible in the Product Definition; it becomes the "brain" for all subsequent tracks.

---

### Chapter 4: Managing Tracks & Lifecycle
**4.1 Objective**
Create, execute, and close individual implementation tracks.

**4.2 Creating a Track**
Generate a new track ID and folder: `conductor/tracks/<track_id>/`.

**4.3 The Track Specification**
Write a focused `spec.md` that defines the exact scope of this specific track.

**4.4 Implementation Planning**
Create a `plan.md` using the `implementation-planner` skill to map out the execution.

**4.5 Expected Outcome**
A modular project structure where features can be developed and tested in isolation.

---

### Chapter 5: Track Metadata & Tracking
**5.1 Objective**
Maintain machine-readable state for project automation.

**5.2 `metadata.json`**
Each track contains a JSON file tracking its status, priority, and dependencies.

**5.3 Dependency Mapping**
Define if Track B requires Track A to be finished before starting.

**5.4 Automatic Updates**
The agent updates the Tracks Registry (`tracks.md`) as work progresses.

**5.5 Pro-Tip**
Use the metadata to generate automatic project status reports for stakeholders.

---

### Chapter 6: Cross-Track Coordination
**6.1 Objective**
Manage shared resources and resolve conflicts between parallel tracks.

**6.2 Shared Libraries**
Define common modules in the `Tech Stack` to ensure consistency across tracks.

**6.3 Inter-Track Communication**
Use the registry to identify which tracks might be affected by a change in another track.

**6.4 Merging Tracks**
The process of integrating a completed track's code into the main project branch.

**6.5 Expected Outcome**
A coherent, unified codebase even when developed by multiple autonomous AI loops.

---

### Chapter 7: Troubleshooting & Protocol Errors
**7.1 Objective**
Resolve common issues like broken links or missing registries.

**7.2 Broken Link Handling**
If a link in `index.md` fails, the agent falls back to the Tracks Directory: `conductor/tracks/`.

**7.3 Registry Desync**
If `tracks.md` doesn't match the actual folders, run a "re-sync" task to update the registry.

**7.4 Missing Specifications**
Always ensure a `spec.md` exists before starting the implementation phase of a track.

**7.5 Pro-Tip**
Run a weekly "Audit" track to clean up project metadata and archive old files.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for Conductor file paths and roles.

**8.2 Default Project Paths**
*   `product.md`, `tech-stack.md`, `workflow.md`, `tracks.md`.

**8.3 Default Track Paths**
*   `spec.md`, `plan.md`, `metadata.json`.

**8.4 FAQ: Can I use Conductor without Pickle?**
Yes, Conductor is a management layer. You can execute tracks manually or with other tools.

**8.5 Final Pro-Tip**
Use Conductor to manage your life! Create a "Life" project and use tracks for different goals.
