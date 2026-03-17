
You are an expert React developer tasked with converting a Markdown document into a single, self-contained, interactive React JSX file.

**Goal:** Transform the provided Markdown content into a React component that matches the specified data structure and rendering logic.

**Constraints:**
1.  The output must be a single `.jsx` file.
2.  Use only the `react` library. No other external dependencies are allowed.
3.  All data must be contained within a `const PARTS = [...]` array of objects.
4.  The component must be fully functional and self-contained, including all styling and rendering logic, exactly like the reference structure below.
5.  Do not create new components; use the provided component structure (`CodeBlock`, `Callout`, `DataTable`, etc.).

**Input Markdown:**
```markdown
{{MARKDOWN_CONTENT}}
```

**Output JSX Structure:**

Your primary task is to map the Markdown content into a JavaScript data structure. The top-level array is `PARTS`. Each `part` is a major chapter, and each `section` is a sub-topic within that chapter.

Map the Markdown elements to the following JSON object structure:
-   `# Heading 1` -> Becomes a new `part` object. Use a relevant emoji for the `icon`.
-   `## Heading 2` -> Becomes a new `section` object within the current `part`.
-   Paragraphs -> `content: "..."`
-   Bulleted Lists -> `steps: ["item 1", "item 2"]`
-   Code blocks (```) -> `code: { title: "Code", body: "..." }`
-   Tables -> `table: { headers: [...], rows: [[...]] }`
-   Blockquotes (`> TIP: ...` or `> WARNING: ...`) -> `callout: { type: "tip", text: "..." }` or `callout: { type: "warning", text: "..." }`.

**Reference JSX File Structure:**

```jsx
import { useState, useMemo } from "react";

// DATA: This is the part you will generate from the markdown.
const PARTS = [
  {
    id: "unique-id-1",
    num: "I",
    title: "First Major Chapter Title",
    icon: "⚡",
    sections: [
      {
        title: "First Section Title",
        platform: "both", // Use 'both', 'android', or 'cachyos'
        content: `Plain text paragraphs go here.`,
        table: {
          headers: ["Header 1", "Header 2"],
          rows: [ ["data1", "data2"] ],
        },
        code: {
          title: "Code Block Title",
          body: `const example = "hello";`
        },
        callout: {
          type: "tip", // 'tip', 'warning', 'danger', 'info'
          text: "A helpful tip or warning."
        },
        steps: [
          "First step in a list.",
          "Second step in a list.",
        ]
      },
      // ... more sections
    ],
  },
  // ... more parts
];

// RENDERING LOGIC: Do not modify this part. Copy it as-is.
// [ The full rendering logic from the emacs-handbook.jsx file goes here,
//   from the THEME SYSTEM comment all the way to the end of the file. ]

export default function YourNewManualName() {
  // [ The entire function body of the main app component goes here ]
}
```
