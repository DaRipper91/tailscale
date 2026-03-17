# 🚀 Starship Master Manual: Customization & Architecture
*A deep dive into building elite shell prompts with Starship.*

## 1. Core Architecture: The "Modular" System
Starship works by dividing your prompt into **Modules** (e.g., `directory`, `git_branch`, `nodejs`). 

### The `format` String
The `format` string is the "blueprint" of your prompt. It determines the order and appearance of modules.
- **Variable Injection:** Use `$module_name` to place a module.
- **Line Breaks:** A literal newline in the `format` string creates a multi-line prompt.
- **Backslashes (`\`)** Use at the end of a line in the TOML to tell Starship to join the next line without adding a space or newline. This is critical for stable "Powerline" bars.

---

## 2. Colors and Palettes
Starship supports Hex codes (`#RRGGBB`) and standard ANSI names.

### Custom Palettes
You can define a palette to reuse colors easily:
```toml
[palettes.tokyo_night]
storm_blue = "#7aa2f7"
pistachio = "#9ece6a"

[directory]
style = "bg:storm_blue" # References the palette
```

---

## 3. Shapes & Logos (Nerd Fonts)
To use logos (Arch, Python, etc.) or shapes (Powerline triangles), you **must** have a Nerd Font installed.

### Common Symbols
- `` / `` : Rounded start/end caps.
- `` / `` : Hard Powerline triangles.
- `` / `` : Thin Powerline separators.

### Example: The "Pill" Module
```toml
format = "[](purple)$username[](purple)"
```

---

## 4. Advanced: The `fill` Module & Width Control
One of Starship's most powerful capabilities is the `fill` module. It dynamically stretches to fill the space between the left and right sides of your terminal.

### Preventing "Stacking" and Wrapping
If your prompt "messes up" or stacks on one side, it is usually because:
1. **Missing `fill`:** Without `$fill`, everything clumps to the left.
2. **Double Line Logic:** If you use a double-line prompt, the `fill` module must be on the **first** line.
3. **Width Calculation:** Complex escape codes inside manual strings can confuse Starship's width counter. Always wrap colors in the `[text](color)` syntax.

### The "Dotted Gradient" Trick
To create the "fade" effect we used:
1. We manually placed 5 dots with manual colors at the start.
2. We used `$fill` for the middle (it handles the variable width).
3. We manually placed 5 dots at the end before the right-side modules.

---

## 5. Module Customization Examples

### Directory (Truncation)
```toml
[directory]
truncation_length = 3    # Show only 3 parents
truncation_symbol = "…/" # Use a pretty symbol for hidden paths
```

### Git Status (Informative)
```toml
[git_status]
ahead = "⇡"
behind = "⇣"
diverged = "⇕"
renamed = "»"
deleted = "✘"
```

---

## 6. Troubleshooting "Messed Up" Layouts
- **Check Font:** If you see boxes instead of icons, your terminal isn't using a Nerd Font.
- **Backslash Check:** Ensure every line in your `format = """..."""` block ends with `\` if you want a single continuous line.
- **Terminal Width:** If the prompt wraps too early, check if your terminal window is too narrow for the modules you've enabled.

---
*Manual generated for daripper on Sunday, February 15, 2026.*
