import { useState, useMemo, useRef, useEffect } from "react";

const manual = [
  {
    id: "ch1", title: "Chapter 1: Front Matter", icon: "📋",
    sections: [
      { id: "1.1", title: "1.1 Title Page", content: null,
        table: { headers: ["Field", "Value"], rows: [
          ["Manual Title", "Acode Complete User Manual"],
          ["Application", "Acode — Code Editor for Android"],
          ["App Version", "1.11.x (CodeMirror 6 branch)"],
          ["Manual Version", "2.0"],
          ["Release Date", "March 2026"],
          ["Developer", "Foxbiz Software Pvt. Ltd. (Acode Foundation)"],
          ["Lead Maintainers", "Ajit Kumar (deadlyjack) / bajrangCoder"],
          ["License", "MIT License (open source)"],
          ["Repository", "github.com/Acode-Foundation/Acode"],
          ["Docs Site", "docs.acode.app"],
        ]}},
      { id: "1.2", title: "1.2 About This Manual", content: "This document is the authoritative reference for every feature, setting, workflow, and plugin in Acode. It targets four audience tiers: Beginners (first-time mobile coders), Intermediate users (configuring themes/plugins), Power users (terminal + LSP + Git), and Plugin developers (building extensions)." },
      { id: "1.3", title: "1.3 System Requirements", content: null,
        table: { headers: ["Requirement", "Minimum", "Recommended"], rows: [
          ["Android", "7.0 (Nougat)", "12+ (Snow Cone)"],
          ["RAM", "2 GB", "4 GB+ (8 GB+ for LSP)"],
          ["Storage", "100 MB free", "500 MB+ (terminal + plugins)"],
          ["Processor", "ARMv7 / ARM64", "ARM64 (Tensor G4, Snapdragon 8)"],
          ["Screen", "Any size", "Tablet or phone + keyboard"],
          ["Network", "Optional", "Required for plugins/GitHub/FTP"],
        ]}},
      { id: "1.4", title: "1.4 Installation Sources", content: null,
        table: { headers: ["Source", "Package ID", "Notes"], rows: [
          ["Google Play", "com.foxdebug.acodefree", "Free (ads) + Pro (paid, no ads)"],
          ["F-Droid", "com.foxdebug.acode", "Fully FOSS, no ads"],
          ["GitHub Releases", "Acode-Foundation/Acode", "APK sideloading, latest builds"],
          ["SourceForge", "acode.mirror", "Mirror of GitHub releases"],
        ]},
        callout: { type: "tip", text: "All core features are identical between Free and Pro. The Pro version removes ads. F-Droid builds may lag behind Play Store by a few days." }},
    ]
  },
  {
    id: "ch2", title: "Chapter 2: Introduction", icon: "🚀",
    sections: [
      { id: "2.1", title: "2.1 What Acode Is", content: "Acode is a lightweight, high-performance code editor and web IDE for Android. Built with Apache Cordova and CodeMirror 6, it delivers a near-desktop editing experience on mobile. It supports 100+ language syntax highlighting, GitHub integration, FTP/SFTP, and a full Alpine Linux terminal." },
      { id: "2.2", title: "2.2 Design Philosophy", content: null, bullets: [
        "Lightweight and fast — loads in seconds, runs on 2 GB RAM devices",
        "Offline-capable — core editing works without network",
        "Plugin-extendable — 30+ plugins in the official registry",
        "Developer-friendly — keyboard shortcuts, command palette, QuickTools",
        "Open source — MIT-licensed, active community on GitHub",
      ]},
      { id: "2.3", title: "2.3 Capabilities Overview", content: null,
        table: { headers: ["Category", "Capabilities"], rows: [
          ["Editing", "100+ languages, CodeMirror 6, folding, rainbow brackets, indent guides, color preview, autocomplete, snippets, search/replace"],
          ["Terminal", "Alpine Linux proot, apk package manager, shell customization, multiple tabs, acode CLI"],
          ["Remote Access", "FTP and SFTP for remote file editing"],
          ["Plugins", "30+ plugins: terminals, themes, formatters, linters, language tools, utilities"],
          ["Web Preview", "In-app HTML/Markdown preview, JavaScript console (Legacy / Eruda)"],
          ["Projects", "File browser with SAF, workspace persistence, templates, ZIP import, file recovery, GitHub"],
          ["Code Intel", "LSP diagnostics, completions, go-to-definition, references, rename, inlay hints; Prettier"],
        ]}},
    ]
  },
  {
    id: "ch3", title: "Chapter 3: Getting Started", icon: "▶️",
    sections: [
      { id: "3.1", title: "3.1 First Launch", content: "On first open, Acode requests no special permissions beyond SAF storage access. The Welcome tab provides links to docs, plugin store, and settings. Defaults: CodeMirror 6, Roboto Mono 12px, tab size 2, soft tabs, rainbow brackets on, text wrap on, QuickTools visible." },
      { id: "3.2", title: "3.2 UI Overview", content: "The interface has six regions: Editor (central workspace), File Browser (sidebar hub for all files), Command Palette (Ctrl+Shift+P), QuickTools (configurable toolbar above keyboard), Tabs (open files), and Terminal Panel (built-in or plugin)." },
      { id: "3.3", title: "3.3 Creating & Opening Files", content: null, steps: [
        "Open File Browser via sidebar icon or swipe from left",
        "Navigate to target directory (or add path via + icon)",
        "Tap + > New File, enter filename with extension",
        "File opens with syntax highlighting auto-applied",
        "Save via Ctrl+S or save icon",
      ]},
      { id: "3.4", title: "3.4 Basic Navigation", content: null, bullets: [
        "Tabs: tap to switch, swipe to close, long-press for context",
        "Sidebar: swipe from left edge or tap hamburger icon",
        "Command Palette: Ctrl+Shift+P — fastest way to any command",
        "Find Files: Ctrl+P — quick file finder across workspace",
      ]},
    ]
  },
  {
    id: "ch4", title: "Chapter 4: Core Editing", icon: "✏️",
    sections: [
      { id: "4.1", title: "4.1 Syntax Highlighting", content: "100+ languages via CodeMirror 6 with async mode loading. Auto-applied by file extension. Manually set via file menu or command palette." },
      { id: "4.2", title: "4.2 Code Folding", content: "Collapse/expand code blocks (functions, classes, tags, JSON). Fold widgets in the gutter. Fade Fold Widgets setting controls visibility." },
      { id: "4.3", title: "4.3 Multi-Tab Editing", content: "Unlimited open files as tabs. Placement: header (default), sidebar, or bottom. No native split-view; use Android split-screen mode." },
      { id: "4.4", title: "4.4 Search & Replace", content: "In-file: Ctrl+F with plain text, case-sensitive, whole-word, and regex. Replace: Ctrl+H. Cross-file: Search in All Files (beta) from command palette." },
      { id: "4.5", title: "4.5 Snippets", content: "Expand abbreviations into code templates. Built-in for HTML/CSS/JS. Extensible via plugins (acode-plugin-snippets). Emmet plugin for advanced HTML/CSS expansion." },
      { id: "4.6", title: "4.6 Autocomplete", content: "Live suggestions from keywords, identifiers, snippets, and LSP. Navigate with arrows, accept with Tab/Enter, dismiss with Escape." },
      { id: "4.7", title: "4.7 Prettier Formatter", content: "Built-in Prettier for JS, TS, HTML, CSS, JSON, Markdown. Format on Save toggle. Configurable tab width, semicolons, quotes, trailing commas. Plugins can register additional formatters." },
      { id: "4.8", title: "4.8 Visual Features", content: "Rainbow Brackets: colored matching pairs. Indent Guides: vertical lines at each indent level. Color Preview: inline swatches for CSS colors. All independently toggleable." },
      { id: "4.9", title: "4.9 LSP Integration", content: "Language Server Protocol for diagnostics, completions, go-to-definition, find references, rename, inlay hints. Pre-configured for TypeScript, ESLint, Go, Rust. Requires running language server in terminal.",
        callout: { type: "note", text: "Install the server in the terminal first (e.g., npm install -g typescript-language-server). Configure via LSP settings." }},
    ]
  },
  {
    id: "ch5", title: "Chapter 5: File Management", icon: "📁",
    sections: [
      { id: "5.1", title: "5.1 Workspaces", content: "One folder at a time serves as Active Workspace (shown in sidebar). Remember Folders setting persists across restarts. Switch by opening a different folder." },
      { id: "5.2", title: "5.2 Project Structure", content: "No enforced layout. Templates available: File Browser > + > New Project. Import existing projects from ZIP. Use Exclude Files patterns for node_modules." },
      { id: "5.3", title: "5.3 File Operations", content: null,
        table: { headers: ["Operation", "Access", "Notes"], rows: [
          ["Create File", "+ > New File", "Auto syntax mode from extension"],
          ["Create Folder", "+ > New Folder", "Subdirectory in current location"],
          ["Rename", "Long-press > Rename", "Preserves editor tab"],
          ["Delete", "Long-press > Delete", "Permanent; no recycle bin"],
          ["Copy URI", "Long-press > Copy URI", "Full SAF URI to clipboard"],
          ["File Info", "Long-press > Info", "Size, permissions, full path"],
          ["Open With", "Long-press > Open With", "Specific mode or external app"],
          ["Import Project", "+ > Import Project", "From .zip archive"],
        ]}},
      { id: "5.4", title: "5.4 Storage Permissions", content: "Android SAF for folder access. External SD/USB OTG supported. All Files Access for terminal (non-Play Store only, Android 10+).",
        callout: { type: "warning", text: "Google Play policies restrict broad file access. If files vanish after update, clear app data and re-add paths via + icon." }},
      { id: "5.5", title: "5.5 Backup Strategies", content: null, bullets: [
        "Manual: copy folders via file manager or terminal cp -r",
        "Terminal Backup: Terminal Settings > Backup (full archive)",
        "ZIP Export: terminal zip -r project.zip /path/to/project",
        "Cloud Sync: Syncthing, Dropsync, FolderSync, or Git push",
      ]},
    ]
  },
  {
    id: "ch6", title: "Chapter 6: Remote Access", icon: "🌐",
    sections: [
      { id: "6.1", title: "6.1 FTP", content: "File Browser > + > Add FTP. Enter hostname, port (21), username, password. Remote files editable in tabs; saves auto-upload.",
        callout: { type: "warning", text: "FTP transmits in plain text. Prefer SFTP for sensitive connections." }},
      { id: "6.2", title: "6.2 SFTP", content: "File Browser > + > Add SFTP. Port 22, password or private key auth. Generate keys: ssh-keygen -t ed25519 in terminal." },
      { id: "6.3", title: "6.3 SSH (Terminal)", content: "Full SSH via terminal: apk add openssh-client && ssh user@host. Use tmux/screen for persistent sessions." },
      { id: "6.4", title: "6.4 Session Management", content: null,
        table: { headers: ["Action", "How"], rows: [
          ["Reconnect", "Tap connection in Home; Retry Remote auto-reconnects"],
          ["Disconnect", "Close the connection tab"],
          ["Remove saved", "Selection Mode > select > Delete"],
          ["Reset all", "Menu > Reset Connections"],
          ["Persistence", "Connections saved across app restarts"],
        ]}},
    ]
  },
  {
    id: "ch7", title: "Chapter 7: Terminal", icon: "💻",
    sections: [
      { id: "7.1", title: "7.1 Overview", content: "Full Linux terminal via proot + Alpine Linux. Runs as foreground service. Real bash shell with access to Alpine package ecosystem." },
      { id: "7.2", title: "7.2 Package Management (apk)", content: "apk update (refresh), apk search <pkg> (find), apk add <pkg> (install), apk del <pkg> (remove), apk upgrade (update all).",
        callout: { type: "note", text: "Alpine uses musl libc, not glibc. Package names may differ from Debian/Ubuntu." }},
      { id: "7.3", title: "7.3 Running Scripts", content: "Bash: chmod +x script.sh && ./script.sh. Python: apk add python3 py3-pip && python3 script.py. Node: apk add nodejs npm && node app.js." },
      { id: "7.4", title: "7.4 Acode CLI", content: "acode file.txt (open file), acode . (open current dir), acode ~/project (open folder), acode --help." },
      { id: "7.5", title: "7.5 Shell Customization", content: "Edit /initrc for session startup. Default: fish-style path shortening, command-not-found handler, MOTD. Also: ~/.bashrc, /etc/profile." },
      { id: "7.6", title: "7.6 Backup & Restore", content: null,
        table: { headers: ["Action", "Location", "Description"], rows: [
          ["Backup", "Terminal Settings", "Full archive of installation + config"],
          ["Restore", "Terminal Settings", "Restore from previous backup"],
          ["Uninstall", "Terminal Settings", "Complete removal"],
        ]}},
    ]
  },
  {
    id: "ch8", title: "Chapter 8: Customization", icon: "🎨",
    sections: [
      { id: "8.1", title: "8.1 Themes", content: "App themes (UI) and editor themes (syntax). Built-in: Monokai, Solarized, Dracula, One Dark, Nord, Material, etc. ThemeBuilder API for custom themes." },
      { id: "8.2", title: "8.2 Fonts", content: "Settings > App Settings > Fonts. Default: Roboto Mono. Add custom fonts (Fira Code, JetBrains Mono, Nerd Fonts). Available in editor and terminal." },
      { id: "8.3", title: "8.3 Keybindings", content: null,
        table: { headers: ["Shortcut", "Action"], rows: [
          ["Ctrl+S", "Save file"],
          ["Ctrl+Shift+P", "Command Palette"],
          ["Ctrl+P", "Find Files"],
          ["Ctrl+F", "Find in file"],
          ["Ctrl+H", "Find & Replace"],
          ["Ctrl+Z / Ctrl+Shift+Z", "Undo / Redo"],
          ["Ctrl+D", "Select next occurrence"],
          ["Ctrl+/", "Toggle line comment"],
          ["Tab / Shift+Tab", "Indent / Outdent"],
          ["Ctrl+K", "Open AcodeX terminal"],
          ["Ctrl+Shift+C/V", "Terminal Copy/Paste"],
        ]}},
      { id: "8.4", title: "8.4 QuickTools", content: "Configurable toolbar above keyboard. Drag-and-drop arrangement. Add: Ctrl, Tab, Esc, arrows, Command Palette button, terminal toggle." },
      { id: "8.5", title: "8.5 Editor Settings", content: null,
        table: { headers: ["Setting", "Default", "Notes"], rows: [
          ["Autosave", "0 (off)", "Min 1000ms if enabled"],
          ["Font Size", "12px", "CSS size string"],
          ["Soft Tab", "On", "Spaces instead of tabs"],
          ["Tab Size", "2", "Range 1–8"],
          ["Line Numbers", "On", "Gutter display"],
          ["Relative Numbers", "Off", "Distance from cursor"],
          ["Text Wrap", "On", "Wrap long lines"],
          ["Rainbow Brackets", "On", "Colored bracket pairs"],
          ["Indent Guides", "On", "Vertical guide lines"],
          ["Color Preview", "On", "Inline CSS swatches"],
          ["Format on Save", "Off", "Runs Prettier"],
          ["Cursor Controller", "Medium", "Touch handle size"],
        ]}},
      { id: "8.6", title: "8.6 Performance Tuning", content: null, bullets: [
        "Close unused tabs to free memory",
        "Exclude Files: **/node_modules/** to reduce indexing",
        "Disable Rainbow Brackets + Indent Guides for 50K+ line files",
        "Set Animation to No on low-end devices",
        "Limit installed plugins; each adds startup overhead",
      ]},
    ]
  },
  {
    id: "ch9", title: "Chapter 9: Plugin System", icon: "🔌",
    sections: [
      { id: "9.1", title: "9.1 Architecture", content: "Plugins are JS packages in the editor's execution context. Lifecycle: init (setPluginInit) → runtime (register commands/formatters/themes) → unmount (setPluginUnmount). TypeScript supported via build toolchain." },
      { id: "9.2", title: "9.2 Installing Plugins", content: "Registry: Settings > Plugins > Explore > Install. Local: + > LOCAL > select .zip. Remote: + > REMOTE > enter URL.",
        callout: { type: "warning", text: "Plugins execute JavaScript with full app access. Only install from the official registry or trusted sources." }},
      { id: "9.3", title: "9.3 Updating & Uninstalling", content: "Registry plugins auto-check for updates. Installed tab shows Update button. Uninstall: tap plugin > Uninstall. Unmount function cleans up commands/listeners." },
      { id: "9.4", title: "9.4 Plugin Permissions", content: null,
        table: { headers: ["Permission", "Scope"], rows: [
          ["File Access", "Read/write via acode.fsOperation()"],
          ["Network", "Full fetch/XMLHttpRequest"],
          ["Editor API", "Full editorManager, settings access"],
          ["Commands", "Add/remove in command palette"],
          ["DOM", "Full document manipulation"],
        ]}},
      { id: "9.5", title: "9.5 Plugin API Reference", content: null,
        table: { headers: ["Method", "Description"], rows: [
          ["acode.setPluginInit(id, fn)", "Register init callback"],
          ["acode.setPluginUnmount(id, fn)", "Register cleanup"],
          ["acode.define(name, module)", "Define shared module"],
          ["acode.require(name)", "Import shared module"],
          ["acode.registerFormatter(id, exts, fn)", "Register formatter"],
          ["acode.newEditorFile(name, opts)", "Create editor tab"],
          ["editorManager.addCommand(args)", "Add to palette"],
          ["editorManager.activeFile", "Current file object"],
          ["settings.get(key) / .update(obj)", "Read/write settings"],
          ["settings.on('update:key', fn)", "Listen for changes"],
        ]}},
    ]
  },
  {
    id: "ch10", title: "Chapter 10: Plugin Catalog", icon: "📦",
    sections: [
      { id: "10.1", title: "10.1 AcodeX (Terminal)", content: "150K+ downloads. Full Termux integration via xterm.js. Ctrl+K to open. Features: resizable panel, multiple sessions, background persistence, 10+ themes, transparency, Nerd Fonts, GUI viewer (noVNC), AI assistance, extensible API. Requires: Termux + acodeX-server." },
      { id: "10.2", title: "10.2 Acode Terminal", content: "Original terminal plugin. Tab-based interface, state persistence, WebSocket backend with reconnection. Simpler than AcodeX; suitable for basic terminal needs." },
      { id: "10.3", title: "10.3 Live Server", content: "Local dev server with auto-reload on save. Essential for web development. Requires Live Server Backend running." },
      { id: "10.4", title: "10.4 Emmet", content: "HTML/CSS abbreviation expansion. Type div.container>ul>li*5 and expand with one keypress. Full Emmet syntax support." },
      { id: "10.5", title: "10.5 Breadcrumbs", content: "Code hierarchy navigation bar. Shows classes/methods/functions. Ctrl+Alt+B to show, Ctrl+Shift+B to hide. Lightweight." },
      { id: "10.6", title: "10.6 Clone Repository", content: "Git clone with isomorphic-git. Authentication for private repos. Branch selection and directory choice." },
      { id: "10.7", title: "10.7 LSP Plugin", content: "Language Server Protocol integration with diagnostics, formatting, completions. Configurable server connections for TypeScript, ESLint, Go, Rust." },
      { id: "10.8", title: "10.8 All Categories", content: null,
        table: { headers: ["Category", "Plugins", "Purpose"], rows: [
          ["Terminal", "AcodeX, Acode Terminal", "Termux integration"],
          ["Web Dev", "Live Server, Emmet", "Dev server, abbreviations"],
          ["UI", "Breadcrumbs, React Icons", "Navigation, icons"],
          ["Language", "LSP, PhpSPA, Code Commenter", "Intelligence, highlighting"],
          ["Utility", "Clone Repo, Plugin SDK, Chat", "Git, dev tools, messaging"],
          ["Formatters", "Prettier (built-in) + bridges", "Code formatting"],
          ["Themes", "Material, Nord, Catppuccin", "Color schemes"],
        ]}},
    ]
  },
  {
    id: "ch11", title: "Chapter 11: Advanced Workflows", icon: "⚡",
    sections: [
      { id: "11.1", title: "11.1 Web Development", content: "Create project → edit with Emmet/autocomplete → preview with built-in browser or Live Server → debug with Eruda console → deploy via FTP/SFTP or Git push." },
      { id: "11.2", title: "11.2 Python", content: "apk add python3 py3-pip → pip3 install packages → python3 script.py → acode script.py to open in editor. Use venvs for isolation." },
      { id: "11.3", title: "11.3 Node.js", content: "apk add nodejs npm → npm init → npm install → node app.js. Full npm ecosystem available." },
      { id: "11.4", title: "11.4 Git Workflows", content: "Built-in GitHub integration for basics. Full Git: apk add git → configure → clone → edit → commit → push. SSH keys: ssh-keygen -t ed25519." },
      { id: "11.5", title: "11.5 Automation", content: "Build scripts (bash), npm scripts, Makefile. Multiple terminal tabs for watchers/servers. Background processes with & and jobs." },
      { id: "11.6", title: "11.6 Remote Development", content: "SFTP for file editing + SSH terminal for commands. rsync for sync. Git as source of truth." },
    ]
  },
  {
    id: "ch12", title: "Chapter 12: Troubleshooting", icon: "🔧",
    sections: [
      { id: "12.1", title: "12.1 Files Not Visible After Update", content: "Clear app data → reopen → re-add paths via + icon. Caused by Google Play permission policy changes." },
      { id: "12.2", title: "12.2 Terminal Won't Start", content: null, bullets: [
        "Verify 200 MB+ free storage",
        "Uninstall + reinstall from Terminal Settings",
        "Clear app cache and retry",
      ]},
      { id: "12.3", title: "12.3 Plugin Conflicts", content: "Uninstall plugins one-by-one starting with most recent. Clean Install State: App Settings > Advanced. No formal safe mode; simulate by resetting plugin states." },
      { id: "12.4", title: "12.4 Remote Access Failures", content: null, bullets: [
        "Check hostname, port, credentials",
        "SFTP keys: use OpenSSH format (not PuTTY .ppk)",
        "Enable Retry Remote for auto-reconnect",
        "SSH in terminal: use tmux/screen for persistence",
      ]},
      { id: "12.5", title: "12.5 Performance", content: "Exclude Files patterns, close unused tabs, disable visual features for huge files, limit plugins, set Animation: No." },
    ]
  },
  {
    id: "ch13", title: "Chapter 13: FAQ", icon: "❓",
    sections: [
      { id: "13.1", title: "Is Acode free?", content: "Yes. Free version has all features + ads. F-Droid is fully free/open source. Pro removes ads." },
      { id: "13.2", title: "Works offline?", content: "Core editing: fully offline. Internet needed for: plugins, GitHub, FTP/SFTP, updates." },
      { id: "13.3", title: "Bluetooth keyboard?", content: "Fully supported. All shortcuts work. Keybindings are customizable." },
      { id: "13.4", title: "Compiled languages?", content: "Install compilers in terminal: apk add build-base (C/C++), openjdk11 (Java), or Rust via rustup." },
      { id: "13.5", title: "Develop plugins?", content: "Fork github.com/Acode-Foundation/acode-plugin. JS/TS with Webpack+Babel. Docs at docs.acode.app/docs." },
      { id: "13.6", title: "Ace vs CodeMirror?", content: "Migrated to CodeMirror 6. Ace compat layers exist for old plugins. Check editorManager.isCodeMirror. New plugins should target CM6." },
    ]
  },
];

const CalloutBox = ({ type, text }) => {
  const s = { tip: { bg: "#EAFAF1", bc: "#27AE60", lb: "💡 TIP" }, note: { bg: "#EBF5FB", bc: "#3498DB", lb: "📝 NOTE" }, warning: { bg: "#FEF9E7", bc: "#F39C12", lb: "⚠️ WARNING" } }[type] || { bg: "#EBF5FB", bc: "#3498DB", lb: "📝 NOTE" };
  return (<div style={{ background: s.bg, borderLeft: `4px solid ${s.bc}`, padding: "10px 14px", margin: "8px 0", borderRadius: "0 6px 6px 0", fontSize: "0.88rem", lineHeight: 1.5 }}><strong style={{ color: s.bc }}>{s.lb}</strong><div style={{ marginTop: 4, color: "#1C2833" }}>{text}</div></div>);
};

const SortableTable = ({ headers, rows }) => {
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => { if (!filter) return rows; const f = filter.toLowerCase(); return rows.filter(r => r.some(c => c.toLowerCase().includes(f))); }, [rows, filter]);
  const sorted = useMemo(() => { if (sortCol === null) return filtered; return [...filtered].sort((a, b) => { const c = a[sortCol].localeCompare(b[sortCol]); return sortDir === "asc" ? c : -c; }); }, [filtered, sortCol, sortDir]);
  const toggle = (i) => { if (sortCol === i) setSortDir(d => d === "asc" ? "desc" : "asc"); else { setSortCol(i); setSortDir("asc"); } };
  return (
    <div style={{ margin: "8px 0" }}>
      {rows.length > 4 && <input type="text" placeholder="Filter table..." value={filter} onChange={e => setFilter(e.target.value)} style={{ width: "100%", padding: "6px 10px", marginBottom: 6, border: "1px solid #D5D8DC", borderRadius: 4, fontSize: "0.85rem", background: "#FDFEFE", boxSizing: "border-box" }} />}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
          <thead><tr>{headers.map((h, i) => (<th key={i} onClick={() => toggle(i)} style={{ background: "#154360", color: "#fff", padding: "8px 10px", textAlign: "left", cursor: "pointer", whiteSpace: "nowrap", userSelect: "none", borderBottom: "2px solid #0E2F44" }}>{h} {sortCol === i ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}</th>))}</tr></thead>
          <tbody>{sorted.map((row, ri) => (<tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#F2F8FD" }}>{row.map((cell, ci) => (<td key={ci} style={{ padding: "7px 10px", borderBottom: "1px solid #E8E8E8", verticalAlign: "top" }}>{cell}</td>))}</tr>))}{sorted.length === 0 && <tr><td colSpan={headers.length} style={{ padding: 12, textAlign: "center", color: "#999" }}>No matching rows</td></tr>}</tbody>
        </table>
      </div>
    </div>
  );
};

const Section = ({ section, open, onToggle }) => (
  <div style={{ marginBottom: 2 }}>
    <button onClick={onToggle} style={{ width: "100%", textAlign: "left", padding: "10px 14px", background: open ? "#EBF5FB" : "#FDFEFE", border: "1px solid #E8E8E8", borderRadius: 4, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.92rem", fontWeight: 600, color: "#1C2833", transition: "background 0.15s" }}>
      <span>{section.title}</span><span style={{ fontSize: "0.8rem", color: "#7F8C8D", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
    </button>
    {open && (
      <div style={{ padding: "10px 14px", borderLeft: "3px solid #2E86C1", marginLeft: 8, marginTop: 2 }}>
        {section.content && <p style={{ margin: "0 0 8px", lineHeight: 1.6, fontSize: "0.88rem", color: "#2C3E50" }}>{section.content}</p>}
        {section.bullets && <ul style={{ margin: "4px 0 8px", paddingLeft: 20, lineHeight: 1.7, fontSize: "0.88rem", color: "#2C3E50" }}>{section.bullets.map((b, i) => <li key={i} style={{ marginBottom: 3 }}>{b}</li>)}</ul>}
        {section.steps && <ol style={{ margin: "4px 0 8px", paddingLeft: 20, lineHeight: 1.7, fontSize: "0.88rem", color: "#2C3E50" }}>{section.steps.map((s, i) => <li key={i} style={{ marginBottom: 3 }}>{s}</li>)}</ol>}
        {section.table && <SortableTable headers={section.table.headers} rows={section.table.rows} />}
        {section.callout && <CalloutBox type={section.callout.type} text={section.callout.text} />}
      </div>
    )}
  </div>
);

export default function App() {
  const [expCh, setExpCh] = useState({});
  const [expSec, setExpSec] = useState({});
  const [search, setSearch] = useState("");

  const expandAll = () => { const c = {}, s = {}; manual.forEach(ch => { c[ch.id] = true; ch.sections.forEach(sec => { s[sec.id] = true; }); }); setExpCh(c); setExpSec(s); };
  const collapseAll = () => { const c = {}, s = {}; manual.forEach(ch => { c[ch.id] = false; ch.sections.forEach(sec => { s[sec.id] = false; }); }); setExpCh(c); setExpSec(s); };

  const filtered = useMemo(() => {
    if (!search) return manual;
    const q = search.toLowerCase();
    return manual.map(ch => {
      const ms = ch.sections.filter(s => [s.title, s.content || "", ...(s.bullets || []), ...(s.steps || []), ...(s.table ? s.table.rows.flat() : [])].join(" ").toLowerCase().includes(q));
      if (ms.length > 0 || ch.title.toLowerCase().includes(q)) return { ...ch, sections: ms.length > 0 ? ms : ch.sections };
      return null;
    }).filter(Boolean);
  }, [search]);

  useEffect(() => {
    if (search) { const c = {}, s = {}; filtered.forEach(ch => { c[ch.id] = true; ch.sections.forEach(sec => { s[sec.id] = true; }); }); setExpCh(p => ({ ...p, ...c })); setExpSec(p => ({ ...p, ...s })); }
  }, [search, filtered]);

  const scrollTo = (id) => { setExpCh(p => ({ ...p, [id]: true })); setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100); };
  const total = manual.reduce((a, c) => a + c.sections.length, 0);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif", color: "#1C2833" }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}} *{box-sizing:border-box} ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#f1f1f1} ::-webkit-scrollbar-thumb{background:#bbb;border-radius:3px} button:hover{opacity:0.92} input::placeholder{color:rgba(255,255,255,0.5)}`}</style>
      <div style={{ background: "linear-gradient(135deg, #1A5276, #0D1117)", padding: "20px 24px 16px", color: "#fff", flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>📱 Acode Complete User Manual v2.0</h1>
        <p style={{ margin: "4px 0 12px", fontSize: "0.85rem", opacity: 0.8 }}>Code Editor for Android — {manual.length} Chapters · {total} Sections</p>
        <input type="text" placeholder="🔍 Search all content..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "9px 14px", border: "none", borderRadius: 6, fontSize: "0.9rem", background: "rgba(255,255,255,0.15)", color: "#fff", outline: "none", boxSizing: "border-box" }} />
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button onClick={expandAll} style={{ padding: "5px 12px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: "0.78rem" }}>Expand All</button>
          <button onClick={collapseAll} style={{ padding: "5px 12px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: "0.78rem" }}>Collapse All</button>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <nav style={{ width: 210, minWidth: 170, background: "#F8F9FA", borderRight: "1px solid #E8E8E8", overflowY: "auto", flexShrink: 0, padding: "10px 0", fontSize: "0.8rem" }}>
          <div style={{ padding: "4px 12px 8px", fontWeight: 700, color: "#566573", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Contents</div>
          {manual.map(ch => (<button key={ch.id} onClick={() => scrollTo(ch.id)} style={{ width: "100%", textAlign: "left", padding: "6px 12px", border: "none", background: "transparent", cursor: "pointer", color: "#1C2833", fontWeight: 600, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6 }}><span>{ch.icon}</span><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.title.replace(/Chapter \d+: /, "")}</span></button>))}
        </nav>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#999" }}><div style={{ fontSize: "2rem", marginBottom: 8 }}>🔍</div>No results for "{search}"</div>}
          {filtered.map(ch => (
            <div key={ch.id} id={ch.id} style={{ marginBottom: 12 }}>
              <button onClick={() => setExpCh(p => ({ ...p, [ch.id]: !p[ch.id] }))} style={{ width: "100%", textAlign: "left", padding: "12px 16px", background: expCh[ch.id] ? "#1A5276" : "#2C3E50", border: "none", borderRadius: 6, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", fontSize: "1rem", fontWeight: 700, transition: "background 0.2s" }}>
                <span>{ch.icon} {ch.title}</span><span style={{ fontSize: "0.8rem", transition: "transform 0.2s", transform: expCh[ch.id] ? "rotate(180deg)" : "none" }}>▼</span>
              </button>
              {expCh[ch.id] && <div style={{ padding: "8px 4px 4px" }}>{ch.sections.map(s => <Section key={s.id} section={s} open={!!expSec[s.id]} onToggle={() => setExpSec(p => ({ ...p, [s.id]: !p[s.id] }))} />)}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
