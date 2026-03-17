# SYSTEM DIRECTIVE: KNOWLEDGE BASE PIPELINE ENGINEER

**OBJECTIVE:**
You are a Senior DevOps and Systems Architect. I need you to write a robust, error-handling local script (preferably in Python or a POSIX-compliant shell) that automatically parses AI-generated Markdown files and routes them into categorized local directories.

**THE DATA STRUCTURE:**
I am feeding this script Markdown files that ALWAYS begin with the following strict YAML frontmatter:
---
Topic: [String]
Domain: [String]
Tags: [Comma-separated strings]
Prerequisite Concepts: [Comma-separated strings]
---

**CORE REQUIREMENTS:**
1. **Ingest:** The script must monitor or target a specific "Inbox" directory for new `.md` files.
2. **Parse:** It must extract the `Topic` and `Domain` values from the YAML frontmatter.
3. **Sanitize:** It must strip illegal filesystem characters (like ?, /, \, :, *) from the `Topic` to safely use it as a filename.
4. **Route:** It must dynamically create a folder named after the `Domain` (if it doesn't already exist) inside a designated "Knowledge_Base" parent directory.
5. **Execute:** It must move the file into that `Domain` folder and rename it to `[Topic].md`.
6. **Failsafe:** If a file with that name already exists, append a Unix timestamp to the filename to prevent overwriting data.

**OUTPUT PARAMETERS:**
- Do not explain basic programming concepts to me. 
- Provide the complete, copy-pasteable script.
- Provide instructions on how to set up the necessary directory structure to test it.
- Explicitly detail how you handled the edge case of malformed YAML.
