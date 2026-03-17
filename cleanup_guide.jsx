
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
  {
    id: "aur",
    num: "1",
    title: "Arch Linux AUR Helper Cache (yay)",
    icon: "📦",
    sections: [
        {
            title: "Problem",
            content: "The `yay` cache stores downloaded and built packages. Over time, this can grow massively."
        },
        {
            title: "Location",
            code: { body: "~/.cache/yay/"}
        },
        {
            title: "Solution",
            code: { title: "Bash", body: "rm -rf ~/.cache/yay/*\n# OR for an interactive clean:\nyay -Scc" }
        }
    ]
  },
  {
    id: "gradle",
    num: "2",
    title: "Gradle Cache",
    icon: "🐘",
    sections: [
        {
            title: "Problem",
            content: "Gradle stores dependencies and build cache. Old project dependencies can linger indefinitely."
        },
        {
            title: "Location",
            code: { body: "~/.gradle/caches/"}
        },
        {
            title: "Solution",
            code: { title: "Bash", body: "rm -rf ~/.gradle/caches/*" }
        }
    ]
  },
    {
    id: "dev-caches",
    num: "6",
    title: "Development Package Manager Caches",
    icon: "npm",
    sections: [
        {
            title: "Problem",
            content: "Package managers for Python and Node.js often cache downloaded archives to speed up future installations. Over time, these can grow to multiple gigabytes."
        },
        {
            title: "Locations",
            steps: ["`~/.cache/uv/`", "`~/.cache/pip/`", "`~/.local/share/pnpm/store/`"]
        },
        {
            title: "Solution",
            code: { title: "Bash", body: "rm -rf ~/.cache/uv/* ~/.cache/pip/* ~/.local/share/pnpm/store/*" }
        }
    ]
  },
  {
      id: "flatpak",
      num: "15",
      title: "Flatpak Caches & Unused Runtimes",
      icon: "📦",
      sections: [
          {
              title: "Problem",
              content: "Flatpak apps can leave behind unused runtimes or temporary cache files."
          },
          {
              title: "Solution",
              code: {title: "Bash", body: "flatpak uninstall --unused -y && rm -rf ~/.local/share/flatpak/tmp/*"}
          }
      ]
  }
];

// FULL RENDERER LOGIC HERE
export default function CleanupGuide() {
    // ...
}
