import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
  {
    id: "arch",
    num: "1",
    title: "Core Architecture: The 'Modular' System",
    icon: "🚀",
    sections: [
      {
        title: "The `format` String",
        content: "The `format` string is the 'blueprint' of your prompt. It determines the order and appearance of modules.",
        steps: [
            "**Variable Injection:** Use `$module_name` to place a module.",
            "**Line Breaks:** A literal newline in the `format` string creates a multi-line prompt.",
            "**Backslashes (`\\`)** Use at the end of a line in the TOML to tell Starship to join the next line without adding a space or newline. This is critical for stable 'Powerline' bars."
        ]
      },
    ],
  },
  {
    id: "colors",
    num: "2",
    title: "Colors and Palettes",
    icon: "🎨",
    sections: [
      {
        title: "Custom Palettes",
        content: "Starship supports Hex codes (`#RRGGBB`) and standard ANSI names. You can define a palette to reuse colors easily:",
        code: {
            title: "TOML",
            body: `[palettes.tokyo_night]\nstorm_blue = \"#7aa2f7\"\npistachio = \"#9ece6a\"\n\n[directory]\nstyle = \"bg:storm_blue\" # References the palette`
        }
      },
    ],
  },
    {
    id: "shapes",
    num: "3",
    title: "Shapes & Logos (Nerd Fonts)",
    icon: "✨",
    sections: [
      {
        title: "Nerd Font Requirement",
        content: "To use logos (Arch, Python, etc.) or shapes (Powerline triangles), you **must** have a Nerd Font installed."
      },
      {
          title: "Common Symbols",
          table: {
              headers: ["Symbol", "Description"],
              rows: [
                  ["`` / ``", "Rounded start/end caps."],
                  ["`` / ``", "Hard Powerline triangles."],
                  ["`` / ``", "Thin Powerline separators."]
              ]
          }
      },
      {
          title: "Example: The 'Pill' Module",
          code: {
              title: "TOML",
              body: "format = \"[](purple)$username[](purple)\""
          }
      }
    ],
  },
  {
    id: "advanced",
    num: "4",
    title: "Advanced: The `fill` Module & Width Control",
    icon: "↔️",
    sections: [
        {
            title: "Preventing 'Stacking' and Wrapping",
            content: "If your prompt 'messes up' or stacks on one side, it is usually because:",
            steps: [
                "**Missing `fill`:** Without `$fill`, everything clumps to the left.",
                "**Double Line Logic:** If you use a double-line prompt, the `fill` module must be on the **first** line.",
                "**Width Calculation:** Complex escape codes inside manual strings can confuse Starship's width counter. Always wrap colors in the `[text](color)` syntax."
            ]
        },
        {
            title: "The 'Dotted Gradient' Trick",
            content: "To create the 'fade' effect we used:",
            steps: [
                "We manually placed 5 dots with manual colors at the start.",
                "We used `$fill` for the middle (it handles the variable width).",
                "We manually placed 5 dots at the end before the right-side modules."
            ]
        }
    ]
  },
  {
      id: "customization",
      num: "5",
      title: "Module Customization Examples",
      icon: "🛠️",
      sections: [
          {
              title: "Directory (Truncation)",
              code: {
                  title: "TOML",
                  body: `[directory]\ntruncation_length = 3    # Show only 3 parents\ntruncation_symbol = \"…/\" # Use a pretty symbol for hidden paths`
              }
          },
          {
              title: "Git Status (Informative)",
              code: {
                  title: "TOML",
                  body: `[git_status]\nahead = \"⇡\"\nbehind = \"⇣\"\ndiverged = \"⇕\"\nrenamed = \"»\"\ndeleted = \"✘\"`
              }
          }
      ]
  },
  {
      id: "troubleshooting",
      num: "6",
      title: "Troubleshooting 'Messed Up' Layouts",
      icon: "❓",
      sections: [
          {
              title: "Common Issues",
              steps: [
                  "**Check Font:** If you see boxes instead of icons, your terminal isn't using a Nerd Font.",
                  "**Backslash Check:** Ensure every line in your `format = \"\"\"...\"\"\"` block ends with `\\` if you want a single continuous line.",
                  "**Terminal Width:** If the prompt wraps too early, check if your terminal window is too narrow for the modules you've enabled."
              ]
          }
      ]
  }
];

// FULL RENDERER LOGIC HERE
export default function StarshipMasterManual() {
    // ...
}
