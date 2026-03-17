# Gemini Skill Manual: ruthless-refactorer
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Clean Code
**1.1 Objective**
Eliminate technical debt, simplify logic, and ensure every line of code is necessary and efficient.

**1.2 The "Ruthless" Mindset**
If code is redundant, confusing, or "slop," it MUST be deleted or rewritten. No mercy.

**1.3 The Refactoring Goal**
High Readability + High Performance + Low Complexity = Clean Code.

**1.4 Identification Phase**
Find smells: Duplication, Long Methods, Large Classes, and "Magic Numbers."

**1.5 Pro-Tip**
Run this skill on "AI-Generated" code from other models; it is excellent at removing "Slop."

---

### Chapter 2: Eliminating Code Duplication (DRY)
**2.1 Objective**
Ensure every piece of knowledge has a single, unambiguous representation within the system.

**2.2 Finding Patterns**
Identify similar logic repeated in multiple functions or files.

**2.3 Abstraction & Extracting Methods**
Move repeated logic into a shared "Util" or "Helper" function.

**2.4 Parameterizing Logic**
Transform hardcoded variations into a single function that takes arguments.

**2.5 Expected Outcome**
A smaller, more maintainable codebase where a bug fix only needs to happen in one place.

---

### Chapter 3: Simplifying Complex Logic
**3.1 Objective**
Reduce "Cyclomatic Complexity" (the number of paths through a function).

**3.2 Flattening Nested Ifs**
Use "Guard Clauses" and early returns to remove deep indentation.

**3.3 Replacing Conditionals with Polymorphism**
Use objects or classes to handle variations instead of massive `switch` statements.

**3.4 Boolean Simplification**
Clean up messy `if (a && b || (c && !d))` logic into readable, named variables.

**3.5 Pro-Tip**
If a function is more than 20 lines long, it likely needs to be broken down.

---

### Chapter 4: Improving Naming & Readability
**4.1 Objective**
Ensure code "reads like prose" and describes its purpose without needing comments.

**4.2 Descriptive Variables**
Replace `const d = 86400;` with `const SECONDS_IN_A_DAY = 86400;`.

**4.3 Verb-Based Functions**
Functions should be actions: `calculateTotal()`, `validateUser()`, `sendEmail()`.

**4.4 Removing Obvious Comments**
Delete comments that just repeat what the code does (`// Add one to i`).

**4.5 Expected Outcome**
A codebase where a new developer can understand the logic just by reading the names.

---

### Chapter 5: Optimizing Performance & Memory
**5.1 Objective**
Identify and fix "slow" code patterns and memory leaks.

**5.2 Loop Optimization**
Avoid expensive operations (like DB queries or API calls) inside loops.

**5.3 Efficient Data Structures**
Choose the right tool for the job (e.g., Use a `Set` for fast lookups instead of an `Array`).

**5.4 Removing Dead Code**
Aggressively delete variables and functions that are defined but never used.

**5.5 Pro-Tip**
Use "Lazy Loading" to ensure you only process data when it is actually needed.

---

### Chapter 6: Decoupling & Module Design
**6.1 Objective**
Reduce "Tightly Coupled" code to make modules easier to test and swap.

**6.2 Dependency Injection**
Pass dependencies into a function instead of hardcoding them inside.

**6.3 Single Responsibility Principle (SRP)**
Ensure every class or function does ONE thing perfectly.

**6.4 Standardizing Interfaces**
Ensure different modules communicate using a consistent, predictable format.

**6.5 Expected Outcome**
A "Plug-and-Play" architecture where changing the Database doesn't break the UI.

---

### Chapter 7: Verification & Testing
**7.1 Objective**
Ensure that "Refactoring" didn't change the behavior of the code (Regression Testing).

**7.2 Unit Test Execution**
Run existing tests after every major refactoring step.

**7.3 Identifying Test Gaps**
If a piece of code is too hard to refactor, it usually means it lacks tests.

**7.4 Continuous Integration (CI)**
Integrate refactoring into the daily dev cycle to prevent debt from accumulating.

**7.5 Pro-Tip**
Refactor *before* you add a new feature to ensure you are building on a solid foundation.

---

### Chapter 8: Reference & Refactoring Checklist
**8.1 Objective**
Quick lookup for "Smells" and "Fixes."

**8.2 The "Smell" List**
Primitive Obsession, Shotgun Surgery, Feature Envy, and Inappropriate Intimacy.

**8.3 FAQ: Should I refactor working code?**
Yes, if it is "hard to read" or "slow." Good code is not just code that "works."

**8.4 FAQ: Can I automate this?**
Partially. Tools like `eslint` help, but the `ruthless-refactorer` provides the "Human-like" logic.

**8.5 Final Pro-Tip**
Refactoring is not a "Project"—it is a habit. Leave the code cleaner than you found it.
