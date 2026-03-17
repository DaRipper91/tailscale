# Universal Agent Working Guide

This document defines the workflow conventions, code quality standards,
reporting rules, and general principles that every agent must follow in any
project repository. It is language-agnostic and applies equally to web apps,
CLI tools, APIs, libraries, mobile apps, and anything else.

Read `Agents_Kickoff.md` first for the "before you start" checklist. This
document covers the how — the standards you must maintain throughout your work.

---

## BEFORE ANYTHING ELSE

- **Read `AGENT_REPORT.md`** (if it exists) to understand the current project
  state and what was last completed. Do not redo completed work.
- **Leave an updated `AGENT_REPORT.md`** when your turn ends. See the
  reporting format at the bottom of this document.

---

## PHASE 1 — INVESTIGATE BEFORE YOU BUILD

Before writing a single line of production code:

### 1a. Map the codebase

- Identify the top-level directory structure.
- Find the primary entry point(s).
- Understand how the project is built, run, and tested (check `package.json`,
  `Makefile`, `pyproject.toml`, `go.mod`, `Cargo.toml`, or equivalent).
- Locate existing tests and understand the testing framework used.
- Identify the linter and formatter in use.

### 1b. Understand the data / state model

- Find where the primary data model or state is defined (types, interfaces,
  schemas, database models, etc.).
- Understand how state flows through the application (store, context, services,
  props, event bus, etc.).
- Understand how data is persisted (localStorage, database, file system, cache).
- Know what is ephemeral (in-memory only) vs. what survives a restart or reload.

### 1c. Understand existing patterns

- Identify naming conventions (files, functions, variables, components).
- Identify import/module organization patterns.
- Identify how errors are handled and surfaced to users.
- Identify how async operations are managed.
- Identify how the UI is structured if this is a frontend project (layout
  system, component hierarchy, styling approach).

### 1d. Run the project baseline

Before making changes, verify the baseline state:

```sh
# Run build
# Run linter
# Run tests
```

Note any pre-existing failures so you do not accidentally take blame for them.
If the build or tests are already broken, document this prominently in your
agent report.

---

## PHASE 2 — PLAN BEFORE YOU IMPLEMENT

For any non-trivial change (more than a single file or a few lines):

1. **Break the work into ordered steps.** Foundational changes first, then
   features that depend on them, then polish.
2. **Identify what already exists** that can be reused or extended — do not
   re-implement something that already works.
3. **Identify what new files/modules are needed.** Follow existing naming and
   location conventions.
4. **Identify what existing files need to change.** Touch as few files as
   possible while still doing the job correctly.
5. **Identify tests that need to be added or updated.**

Write a short plan (even mentally) before touching any file. Do not start with
the most interesting part — start with the most foundational part.

---

## PHASE 3 — IMPLEMENT

### Core implementation rules

- **Extend, don't rewrite.** Add to the existing architecture. Do not replace
  working code with a clean-room rewrite just because you prefer a different
  approach.
- **Match the existing style.** Use the same naming conventions, file
  organization, function signatures, and idioms already present in the codebase.
  Run the auto-formatter if one exists.
- **No unnecessary dependencies.** Only add a new dependency if the task
  explicitly requires it OR the feature genuinely cannot be built reasonably
  without it. Document every new dependency in your agent report.
- **Do not leave console.log / print / debug statements** in production paths.
  Use the project's existing logging mechanism if one exists.
- **Do not commit secrets, credentials, API keys, or personal data.** Ever.

### Type safety

- In TypeScript: strict mode; no `any` without an explicit, documented reason;
  unused variables prefixed with `_`.
- In Python: use type hints; avoid `Any` from `typing` unless unavoidable.
- In Go/Rust/others: use the type system fully; do not cast away safety.
- Prefer explicit, narrow types over broad or loosely-typed alternatives.

### State and data mutations

- All mutations to shared state must go through the established mutation
  mechanism (store actions, dispatch, setters, etc.). Never mutate state
  directly if the project has a defined pattern for avoiding that.
- If the project has an undo/redo system, every user-visible state change must
  flow through it.
- If the project has an event system or reactive pipeline, use it rather than
  adding parallel ad-hoc mutations.

### UI and user feedback

- Use the project's existing notification/toast/alert system. Do not add
  `window.alert()`, `console.log`, or raw DOM manipulation for user feedback.
- Use the project's existing confirmation dialog system for destructive actions.
  Do not use `window.confirm()`.
- Match the visual design language of the existing UI — colors, spacing,
  typography, interactive states (hover, focus, disabled, loading).
- All interactive elements must have accessible labels where the visual label
  is absent.

### Error handling

- Handle errors explicitly. Do not silently swallow exceptions.
- Surface errors to the user through the established notification mechanism.
- Log unexpected errors at the appropriate level (warn or error, not info or
  debug).
- Validate inputs at boundaries (API responses, user input, URL params, file
  contents) and provide clear feedback on invalid data.

---

## PHASE 4 — TEST YOUR WORK

### Build and lint

After every meaningful change:

```sh
# Run the project build — must produce zero errors
# Run the linter — must produce zero warnings or errors
```

Do not leave the codebase in a state where the build or lint fails.

### Functional testing

For every feature you implement, manually verify:

1. The happy path works end-to-end.
2. Edge cases are handled gracefully (empty state, invalid input, maximum
   values, network failure if applicable).
3. The feature does not break adjacent existing features.
4. Any state changes persist or don't persist as intended.
5. Keyboard and focus behavior is correct for UI features.

### Automated tests

- If the project has a test suite, run it. All existing tests must still pass.
- Add tests for new logic that is non-trivial. Focus on:
  - Functions with branching logic
  - Data transformation functions
  - Edge cases documented in the spec
  - Any function that is called from multiple places
- Do not add tests that only test implementation details — test behavior.

---

## PHASE 5 — WRAP UP

### Before finishing your turn

1. Run the full build one final time — must pass cleanly.
2. Run the linter one final time — must pass cleanly.
3. Run the test suite one final time — all tests must pass.
4. Remove any debug code, commented-out code, or temporary TODO comments that
   were left in during development.
5. Review your diff — look for accidental changes to unrelated files.

### Write your agent report

See the reporting format below. This is not optional.

---

## GENERAL FEATURE IMPLEMENTATION FRAMEWORK

When you receive a feature list, implement in this priority order regardless of
the specific project:

1. **Data model / type changes** — any new fields, schemas, or interfaces
2. **Core logic / business rules** — the non-UI engine of the feature
3. **State management wiring** — connecting new logic to the store/context
4. **UI components** — new or modified components
5. **User feedback** — toasts, loading states, error messages
6. **Tests** — unit and integration tests for new behavior
7. **Accessibility** — labels, keyboard navigation, focus management
8. **Responsive / edge-case polish** — mobile layout, empty states, limits

Do not skip to step 4 before steps 1–3 are solid. A pretty UI on a broken data
model will require a full re-do.

---

## CODE QUALITY STANDARDS

### Files and modules

- One concept per file. Don't pack unrelated logic into the same module.
- File names should match what's inside: `user-auth.ts` contains user auth logic.
- Keep files short. If a file exceeds ~300 lines, look for extraction
  opportunities before adding more.

### Functions

- Single responsibility. If a function does two things, split it.
- Functions that return a value should not also trigger side effects unless
  clearly named and documented.
- Prefer pure functions for data transformation logic.
- Keep function bodies short (under 40 lines is a good target).

### Comments

- Only comment code that genuinely needs clarification. Do not comment the
  obvious.
- Prefer self-documenting names over comments that explain what the code does.
- Use comments to explain *why*, not *what*.

### Imports

- Follow the project's established import ordering (if an auto-sorter exists,
  use it).
- No circular imports. If you find one, fix it.
- Remove unused imports.

---

## UI/UX PRINCIPLES (for frontend projects)

1. **Live feedback**: Changes to configuration or settings should reflect
   immediately in any live preview.
2. **Persistent state**: If a user setting should survive a page reload, persist
   it (localStorage, sessionStorage, database, etc.) from day one.
3. **Collapsible sections**: Long panels should support collapse/expand with
   state remembered across reloads.
4. **Responsive layout**: Do not assume a wide screen. Stack panels vertically
   on narrow viewports.
5. **Keyboard accessibility**: All interactive elements must be reachable and
   operable via keyboard.
6. **Visual hierarchy**: Primary actions are prominent; secondary and destructive
   actions are visually subordinate.
7. **Empty states**: Every list, gallery, or data table must have a clear empty
   state message or call to action.
8. **Loading states**: Long operations must show a loading indicator so the user
   knows something is happening.
9. **Error states**: Failed operations must clearly communicate what went wrong
   and, where possible, what the user can do about it.

---

## TESTING CHECKLIST TEMPLATE

Adapt this for your specific task. Every feature should be verified against its
own version of these checks:

**Core behavior**
- [ ] Happy path works end-to-end
- [ ] Data is persisted correctly (survives reload if expected to)
- [ ] Invalid input is rejected with a clear message
- [ ] Empty / zero / null edge cases are handled gracefully

**State management**
- [ ] Changes flow through the established state mechanism
- [ ] Undo/redo works for this change (if the project has it)
- [ ] No stale state after navigating away and back

**UI (frontend projects)**
- [ ] Component renders without errors in all expected states
- [ ] Responsive on narrow and wide viewports
- [ ] Keyboard operable
- [ ] Accessible labels present on all interactive elements

**Integration**
- [ ] New feature does not break existing features
- [ ] Build passes (zero errors)
- [ ] Lint passes (zero warnings/errors)
- [ ] All existing tests pass

---

## PROTECTED FILES — DO NOT MODIFY

Unless the task explicitly requires it, never touch:

- Linter configs (`.eslintrc*`, `.pylintrc`, `ruff.toml`, `.rubocop.yml`, etc.)
- Formatter configs (`.prettierrc`, `.editorconfig`, `black.toml`, etc.)
- Build/compiler configs (`vite.config.*`, `tsconfig*.json`, `webpack.config.*`,
  `go.mod`, `Cargo.toml`, `pyproject.toml` — unless adding a dep is the task)
- CI/CD configs (`.github/workflows/`, `Jenkinsfile`, `circleci/config.yml`)
- `CONTRIBUTING.md`, `AGENTS.md`, `CLAUDE.md`, `CODE_OF_CONDUCT.md`
- Lock files (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `Pipfile.lock`,
  `Cargo.lock`) — these are updated by the package manager, not by hand

---

## AGENT REPORTING RULES

### File management

- Only two report files may exist at any time: `AGENT_REPORT.md` and
  `(OLD) AGENT_REPORT.md`.
- Before creating a new `AGENT_REPORT.md`, rename the current one to
  `(OLD) AGENT_REPORT.md` (overwriting any previous old report).
- These files live in the project root.

### Required sections

```markdown
# Agent Report

## Summary
What was accomplished in this turn. Be specific — list files created/modified
and the purpose of each change.

## Feature / Task Status
For each feature or task item:
- ✅ Feature name — fully implemented and tested
- 🔄 Feature name — partially implemented (describe what's done and what remains)
- ❌ Feature name — not started

## What the Next Agent Should Do First
Clear, ordered instructions for continuing the work. Include:
- Which feature/task to tackle next
- Any known constraints or gotchas discovered
- Any architectural decisions made that future work must respect

## Blocking Issues
List any bugs, failures, or unresolved questions that are blocking progress.
If none, write "None."

## Build / Test Status
- Build: ✅ passing / ❌ failing (describe)
- Lint: ✅ passing / ❌ failing (describe)
- Tests: ✅ all passing / ❌ N failing (list them)
```

### Reporting principles

- Be honest. If something is broken or incomplete, say so clearly.
- Do not mark a feature as ✅ unless it is fully implemented, tested, and the
  build passes with it included.
- Do not leave implicit assumptions for the next agent. Write out everything
  they need to know.
- Keep the report concise but complete. The next agent should be able to read
  it in under 5 minutes and know exactly where to start.
