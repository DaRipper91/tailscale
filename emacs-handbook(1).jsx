import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA: Complete handbook content structured for rendering
// ═══════════════════════════════════════════════════════════════

const PARTS = [
  {
    id: "install",
    num: "I",
    title: "Get Running",
    icon: "⚡",
    sections: [
      {
        title: "Install the Android App (org.gnu.emacs)",
        platform: "android",
        content: `Emacs 30.2 is a native Android GUI application. It runs directly on the Pixel 9's Tensor G4 with touch input, on-screen keyboard, and native SurfaceView rendering. No root required.`,
        table: {
          headers: ["Source", "Method", "Auto-Update"],
          rows: [
            ["F-Droid", "Install from F-Droid repo", "Yes"],
            ["Obtainium", "Track SourceForge or F-Droid", "Yes"],
            ["SourceForge APK", "Sideload arm64-v8a APK", "No"],
          ],
        },
        callout: { type: "warning", text: "SourceForge hosts two APK variants: standard and Termux-enabled. The Termux-enabled build (in the termux/ subfolder) has its shared user ID set to com.termux, letting Emacs see Termux binaries (git, ripgrep). If you need git inside Emacs, use the Termux-enabled APK." },
      },
      {
        title: "First Launch Checklist (Android)",
        platform: "android",
        steps: [
          "Tap the Emacs icon. Splash screen appears.",
          "Grant storage: Settings → Apps → Emacs → Permissions → Files → Allow all",
          "Android 11+: Also enable Settings → Apps → Emacs → Special App Access → All Files Access",
          "Tap any writable buffer. On-screen keyboard should appear.",
          "Type M-x (via modifier bar or Unexpected Keyboard). Minibuffer opens = working.",
        ],
        callout: { type: "info", text: "Emacs home on Android: /data/data/org.gnu.emacs/files/. Only Emacs can access this path. To import config: open /sdcard/init.el with C-x C-f, then C-x C-w to write it to ~/.emacs.d/init.el." },
      },
      {
        title: "Install on CachyOS (Arch Linux)",
        platform: "cachyos",
        code: { title: "Terminal", body: `sudo pacman -S emacs-nativecomp\nemacs --version` },
        table: {
          headers: ["Package", "Backend", "Wayland", "Use Case"],
          rows: [
            ["emacs-nativecomp", "GTK3+XWayland", "No", "Default. KDE Plasma X11."],
            ["emacs-pgtk-nativecomp (AUR)", "Pure GTK4", "Yes", "KDE Plasma Wayland."],
            ["emacs-nox", "Terminal only", "N/A", "SSH, headless."],
          ],
        },
        callout: { type: "tip", text: "CachyOS emacs-nativecomp includes libgccjit. Elisp compiles to native machine code on first load. Cached in ~/.emacs.d/eln-cache/." },
      },
      {
        title: "Platform Comparison",
        platform: "both",
        table: {
          headers: ["Feature", "Android App", "CachyOS Desktop"],
          rows: [
            ["Display", "Native GUI + touch", "Native GUI (GTK) + kb/mouse"],
            ["Native Comp", "No (precompiled)", "Yes (libgccjit)"],
            ["CLI Tools", "Bridge from Termux", "Full system shell"],
            ["Home Dir", "/data/data/org.gnu.emacs/files/", "~/"],
            ["Best For", "Org, notes, mobile", "Development, full power"],
          ],
        },
      },
    ],
  },
  {
    id: "android",
    num: "II",
    title: "Android App Deep Dive",
    icon: "📱",
    sections: [
      {
        title: "Touch Input & Gestures",
        platform: "android",
        table: {
          headers: ["Gesture", "Behavior"],
          rows: [
            ["Tap", "Move point + show keyboard (if writable)"],
            ["Long press", "Context menu (cut/copy/paste)"],
            ["Drag", "Select region"],
            ["Two-finger scroll", "Scroll buffer"],
            ["Tap toolbar", "Execute command"],
          ],
        },
        callout: { type: "info", text: "Keyboard hides in read-only buffers by default. Set (setq touch-screen-display-keyboard t) to force it on all taps — essential for commands in read-only contexts like Agenda or Magit." },
      },
      {
        title: "Virtual Keyboard: Modifier Bar vs Unexpected Keyboard",
        platform: "android",
        content: "The stock Android keyboard lacks Ctrl, Meta, and Esc. Two solutions:",
        code: { title: "Modifier Bar (built-in)", body: `;; Enable modifier key buttons alongside toolbar
(when (eq system-type 'android)
  (modifier-bar-mode 1)
  (setq touch-screen-display-keyboard t)
  (setq tool-bar-position 'bottom))` },
        table: {
          headers: ["Feature", "Gboard", "Unexpected Keyboard"],
          rows: [
            ["Ctrl key", "❌", "✅"],
            ["Meta/Alt", "❌", "✅"],
            ["Esc", "❌", "✅"],
            ["Arrow keys", "Limited", "✅ Dedicated row"],
            ["F1–F12", "❌", "✅ Via layer"],
          ],
        },
        callout: { type: "tip", text: "Install Unexpected Keyboard from F-Droid. Enable: Settings → System → Keyboard → On-screen keyboard → Manage → Enable. Switch via the keyboard icon in the nav bar." },
      },
      {
        title: "Text Conversion & Evil Mode Fix",
        platform: "android",
        content: "Android input methods use text conversion — a protocol different from raw key events. Packages like Evil that read raw keys conflict with this system.",
        code: { title: "Fix Evil / raw-key conflicts", body: `;; Disable text conversion globally
(setq overriding-text-conversion-style nil)

;; Or per-buffer only
;; (setq-local text-conversion-style nil)` },
        callout: { type: "warning", text: "Disabling text conversion globally removes auto-correct and swipe typing. Only disable if Evil or similar packages require it." },
      },
      {
        title: "Storage & File Access",
        platform: "android",
        table: {
          headers: ["Storage Tier", "Path", "Access"],
          rows: [
            ["App home (private)", "/data/data/org.gnu.emacs/files/", "Emacs only"],
            ["External storage", "/sdcard/", "Requires permission"],
            ["Document providers", "content:// URIs", "Via system file picker"],
          ],
        },
        code: { title: "Point org to shared storage", body: `(when (eq system-type 'android)
  (setq org-directory "/sdcard/org/")
  (setq org-default-notes-file "/sdcard/org/inbox.org")
  (setq org-agenda-files '("/sdcard/org/")))` },
        callout: { type: "danger", text: "Never store your only copy of files in /data/data/org.gnu.emacs/files/. This directory is wiped if you uninstall Emacs. Keep org files on /sdcard/ and sync to desktop." },
      },
      {
        title: "Termux Binary Bridge",
        platform: "android",
        content: "The Android app has no built-in shell. To use git, ripgrep, etc., install Termux and expose its binaries:",
        code: { title: "early-init.el — Termux bridge", body: `(when (eq system-type 'android)
  (setenv "PATH"
    (format "%s:%s"
      "/data/data/com.termux/files/usr/bin"
      (getenv "PATH")))
  (push "/data/data/com.termux/files/usr/bin" exec-path))` },
        callout: { type: "warning", text: "Only works with the Termux-enabled Emacs APK from SourceForge, or with Shizuku cross-app access. Standard F-Droid Emacs + standard Termux cannot share binaries." },
      },
      {
        title: "Custom Touch Menus",
        platform: "android",
        code: { title: "Custom menu for tap-friendly access", body: `(when (eq system-type 'android)
  (easy-menu-define my-menu global-map
    "Quick access for Android."
    '("Quick"
      ("Files"
       ["Open" find-file] ["Save" save-buffer]
       ["Recent" recentf-open-files])
      ("Org"
       ["Agenda" org-agenda-list]
       ["Capture" org-capture]
       ["Todo List" org-todo-list])
      ("Git"
       ["Status" magit-status]
       ["Log" magit-log-current]))))` },
      },
      {
        title: "Display Optimization (Pixel 9)",
        platform: "android",
        code: { title: "Pixel 9 display config", body: `(when (eq system-type 'android)
  (set-face-attribute 'default nil :height 150)
  (pixel-scroll-precision-mode 1)
  (global-visual-line-mode 1)
  (menu-bar-mode 1)    ; Keep for touch
  (tool-bar-mode 1)    ; Keep for touch
  (scroll-bar-mode -1)
  (setq tool-bar-position 'bottom))` },
      },
    ],
  },
  {
    id: "keys",
    num: "III",
    title: "Core Skills",
    icon: "⌨️",
    sections: [
      {
        title: "Movement",
        platform: "both",
        table: {
          headers: ["Key", "Action", "Key", "Action"],
          rows: [
            ["C-f / C-b", "Char fwd/back", "M-f / M-b", "Word fwd/back"],
            ["C-n / C-p", "Line down/up", "C-v / M-v", "Page down/up"],
            ["C-a / C-e", "Line start/end", "M-< / M->", "Buffer start/end"],
            ["M-g g", "Go to line", "C-l", "Recenter view"],
          ],
        },
      },
      {
        title: "Editing",
        platform: "both",
        table: {
          headers: ["Key", "Action"],
          rows: [
            ["C-d", "Delete char"], ["M-d / M-DEL", "Kill word fwd/back"],
            ["C-k", "Kill to EOL"], ["C-w", "Cut region"], ["M-w", "Copy region"],
            ["C-y", "Paste"], ["M-y", "Cycle kill ring"], ["C-/", "Undo"],
          ],
        },
      },
      {
        title: "Files, Buffers & Windows",
        platform: "both",
        table: {
          headers: ["Key", "Action"],
          rows: [
            ["C-x C-f", "Open file"], ["C-x C-s", "Save"], ["C-x C-c", "Quit"],
            ["C-g", "Cancel anything"], ["C-x b", "Switch buffer"], ["C-x k", "Kill buffer"],
            ["C-x 2 / 3", "Split h/v"], ["C-x 0 / 1", "Close/maximize window"],
          ],
        },
      },
      {
        title: "Help System",
        platform: "both",
        table: {
          headers: ["Key", "Shows You"],
          rows: [
            ["C-h f", "Function docs + source link"], ["C-h v", "Variable docs"],
            ["C-h k", "What a key does"], ["C-h m", "Current mode bindings"],
            ["C-h a", "Search commands"], ["C-h i", "Info manual"],
          ],
        },
        callout: { type: "tip", text: "On Android: if C-h is hard to type, use menu bar → Help → Describe → Describe Key. Or tap the splash screen link to access the full Info system." },
      },
    ],
  },
  {
    id: "config",
    num: "IV",
    title: "Build Your Config",
    icon: "🔧",
    sections: [
      {
        title: "File Hierarchy",
        platform: "both",
        table: {
          headers: ["Order", "File", "Purpose"],
          rows: [
            ["1", "early-init.el", "GC tuning, Termux PATH bridge, frame params"],
            ["2", "init.el", "Main config: packages, modes, keybindings"],
            ["3", "custom.el", "M-x customize output (keep init.el clean)"],
          ],
        },
      },
      {
        title: "early-init.el (Cross-Platform)",
        platform: "both",
        code: { title: "~/.emacs.d/early-init.el", body: `;;; early-init.el -*- lexical-binding: t; -*-
(setq gc-cons-threshold (* 100 1024 1024))
(add-hook 'emacs-startup-hook
  (lambda () (setq gc-cons-threshold
    (if (eq system-type 'android) (* 8 1024 1024) (* 16 1024 1024)))))
(setq read-process-output-max (* 4 1024 1024))

;; Android: Termux binary bridge
(when (eq system-type 'android)
  (setenv "PATH" (format "%s:%s" "/data/data/com.termux/files/usr/bin" (getenv "PATH")))
  (push "/data/data/com.termux/files/usr/bin" exec-path))

;; CachyOS: remove chrome
(unless (eq system-type 'android)
  (setq default-frame-alist
    '((menu-bar-lines . 0) (tool-bar-lines . 0)
      (vertical-scroll-bars . nil))))
(setq package-enable-at-startup nil)
(when (featurep 'native-compile)
  (setq native-comp-async-report-warnings-errors 'silent))` },
      },
      {
        title: "Platform Detection",
        platform: "both",
        code: { title: "init.el — Platform flags", body: `(defconst IS-ANDROID (eq system-type 'android))
(defconst IS-LINUX   (and (eq system-type 'gnu/linux) (not IS-ANDROID)))
(defconst IS-GUI     (display-graphic-p))

(when IS-ANDROID
  (set-face-attribute 'default nil :height 150)
  (modifier-bar-mode 1)
  (setq touch-screen-display-keyboard t tool-bar-position 'bottom)
  (server-start))

(when IS-LINUX
  (when IS-GUI
    (set-face-attribute 'default nil :family "JetBrains Mono" :height 120))
  (setq select-enable-clipboard t))` },
      },
      {
        title: "use-package Cheat Sheet",
        platform: "both",
        table: {
          headers: ["Keyword", "Purpose", "Example"],
          rows: [
            [":ensure", "Install if missing", ":ensure t"],
            [":demand", "Force immediate load", ":demand t"],
            [":defer", "Lazy load", ":defer t"],
            [":hook", "Attach to mode hook", ":hook (python-mode . eglot-ensure)"],
            [":bind", "Set keybinding", ':bind ("C-s" . swiper)'],
            [":when", "Conditional", ":when IS-ANDROID"],
          ],
        },
      },
    ],
  },
  {
    id: "completion",
    num: "V",
    title: "Completion & Search",
    icon: "🔍",
    sections: [
      {
        title: "The Modern Stack",
        platform: "both",
        table: {
          headers: ["Package", "Role"],
          rows: [
            ["Vertico", "Vertical minibuffer completion UI"],
            ["Orderless", "Flexible matching"],
            ["Marginalia", "Rich annotations"],
            ["Consult", "Enhanced search, buffers, lines"],
            ["Corfu", "In-buffer completion popup"],
          ],
        },
        code: { title: "Full stack config", body: `(use-package vertico :demand t
  :custom (vertico-count 15) (vertico-cycle t)
  :init (vertico-mode 1))
(use-package orderless :demand t
  :custom (completion-styles '(orderless basic)))
(use-package marginalia :demand t :init (marginalia-mode 1))
(use-package consult
  :bind (("C-s" . consult-line) ("C-x b" . consult-buffer)
         ("M-s r" . consult-ripgrep) ("M-y" . consult-yank-pop)))
(use-package embark :bind (("C-." . embark-act)))
(use-package corfu :demand t
  :custom (corfu-auto t) (corfu-auto-delay 0.2)
  :init (global-corfu-mode 1))` },
        callout: { type: "tip", text: "On Android, consult-line (C-s) gives a searchable line list — much easier than incremental search on touchscreen." },
      },
    ],
  },
  {
    id: "dev",
    num: "VI",
    title: "Development",
    icon: "💻",
    sections: [
      {
        title: "Eglot (Built-in LSP)",
        platform: "both",
        code: { title: "Eglot config", body: `(use-package eglot :ensure nil
  :hook ((python-mode python-ts-mode) . eglot-ensure)
        ((rust-mode rust-ts-mode) . eglot-ensure)
        ((c-mode c-ts-mode) . eglot-ensure)
        ((js-mode typescript-ts-mode) . eglot-ensure)
        ((dart-mode) . eglot-ensure)
  :custom (eglot-autoshutdown t) (eglot-events-buffer-size 0))` },
        callout: { type: "info", text: "On Android, language servers only work with the Termux binary bridge (Part II) and Termux-enabled APK." },
      },
      {
        title: "Magit (Git)",
        platform: "both",
        code: { title: "Magit", body: `(use-package magit
  :bind ("C-x g" . magit-status)
  :custom (magit-diff-refine-hunk 'all)
          (magit-save-repository-buffers 'dontask))` },
        table: {
          headers: ["Key", "Action", "Key", "Action"],
          rows: [
            ["s / u", "Stage/Unstage", "c c", "Commit"],
            ["P p", "Push", "F p", "Pull"],
            ["l l", "Log", "q", "Quit"],
          ],
        },
      },
    ],
  },
  {
    id: "org",
    num: "VII",
    title: "Org Mode",
    icon: "📋",
    sections: [
      {
        title: "Core Setup",
        platform: "both",
        code: { title: "Org Mode (cross-platform)", body: `(use-package org :ensure nil
  :hook (org-mode . visual-line-mode)
  :custom
  (org-directory (if IS-ANDROID "/sdcard/org/" "~/org/"))
  (org-default-notes-file
    (expand-file-name "inbox.org" org-directory))
  (org-agenda-files (list org-directory))
  (org-startup-indented t) (org-startup-folded 'content)
  (org-hide-emphasis-markers t) (org-log-done 'time)
  (org-todo-keywords
   '((sequence "TODO(t)" "NEXT(n)" "IN-PROGRESS(i)"
               "WAITING(w)" "|" "DONE(d)" "CANCELLED(c)")))
  (org-src-fontify-natively t))

(global-set-key (kbd "C-c c") #'org-capture)
(global-set-key (kbd "C-c a") #'org-agenda)` },
      },
      {
        title: "Capture Templates",
        platform: "both",
        code: { title: "Templates", body: `(setq org-capture-templates
  '(("t" "Task" entry
     (file+headline org-default-notes-file "Tasks")
     "* TODO %?\\n:CREATED: %U\\n")
    ("n" "Note" entry
     (file+headline "notes.org" "Notes")
     "* %? :reference:\\n:CREATED: %U\\n")
    ("j" "Journal" entry
     (file+olp+datetree "journal.org")
     "* %<%H:%M> %?\\n")))` },
        callout: { type: "tip", text: "On Android, use the custom menu (Part II) for fast capture: Menu → Quick → Org → Capture. Works with a single tap sequence." },
      },
      {
        title: "Syncing Between Devices",
        platform: "both",
        table: {
          headers: ["Method", "How", "Pros"],
          rows: [
            ["Syncthing", "P2P sync Pixel ↔ CachyOS", "No cloud, real-time"],
            ["Git", "Private repo, push/pull", "Version history"],
            ["Google Drive", "Org files in Drive", "Auto sync"],
          ],
        },
      },
    ],
  },
  {
    id: "theme",
    num: "VIII",
    title: "Appearance",
    icon: "🎨",
    sections: [
      {
        title: "Themes",
        platform: "both",
        table: {
          headers: ["Theme", "Style", "Package"],
          rows: [
            ["Catppuccin", "Pastel dark, 4 flavors", "catppuccin-theme"],
            ["Modus (built-in)", "WCAG AAA accessible", "modus-themes"],
            ["Doom Themes", "50+ themes", "doom-themes"],
          ],
        },
        code: { title: "Theme setup", body: `(use-package catppuccin-theme :demand t
  :custom (catppuccin-flavor 'mocha)
  :config (load-theme 'catppuccin t))` },
      },
      {
        title: "Modeline",
        platform: "both",
        code: { title: "Doom modeline", body: `(use-package doom-modeline :demand t
  :custom (doom-modeline-height (if IS-ANDROID 35 30))
          (doom-modeline-icon (not IS-ANDROID))
  :init (doom-modeline-mode 1))` },
      },
    ],
  },
  {
    id: "evil",
    num: "IX",
    title: "Evil Mode",
    icon: "🗡️",
    sections: [
      {
        title: "Core Setup",
        platform: "both",
        callout: { type: "warning", text: "Evil conflicts with Android text conversion. Add (setq overriding-text-conversion-style nil) for Android." },
        code: { title: "Evil Mode", body: `(use-package evil :demand t
  :init (setq evil-want-integration t evil-want-keybinding nil
              evil-want-C-u-scroll t evil-undo-system 'undo-redo)
  :config (evil-mode 1)
  (when IS-ANDROID
    (setq overriding-text-conversion-style nil)))
(use-package evil-collection :after evil :demand t
  :config (evil-collection-init))
(use-package evil-surround :after evil
  :config (global-evil-surround-mode 1))` },
      },
      {
        title: "Leader Key (SPC)",
        platform: "both",
        code: { title: "General.el leader keys", body: `(use-package general :demand t
  :config
  (general-create-definer leader-def
    :states '(normal visual) :keymaps 'override :prefix "SPC")
  (leader-def
    "SPC" '(execute-extended-command :wk "M-x")
    "ff" '(find-file :wk "Find") "fs" '(save-buffer :wk "Save")
    "bb" '(consult-buffer :wk "Buffer") "bd" '(kill-current-buffer :wk "Kill")
    "gg" '(magit-status :wk "Git") "oa" '(org-agenda :wk "Agenda")
    "oc" '(org-capture :wk "Capture") "qq" '(save-buffers-kill-terminal :wk "Quit")))
(use-package which-key :demand t :config (which-key-mode 1))` },
      },
    ],
  },
  {
    id: "perf",
    num: "XI",
    title: "Performance",
    icon: "⚙️",
    sections: [
      {
        title: "Startup Targets & GC Tuning",
        platform: "both",
        table: {
          headers: ["", "CachyOS", "Android App"],
          rows: [
            ["Startup target", "< 1 second", "< 3 seconds"],
            ["GC during init", "100 MB", "50 MB"],
            ["GC at runtime", "16 MB", "8 MB"],
          ],
        },
        code: { title: "Measure startup", body: `(add-hook 'emacs-startup-hook
  (lambda ()
    (message "Loaded in %.2fs with %d GCs."
      (float-time (time-subtract after-init-time before-init-time))
      gcs-done)))` },
        callout: { type: "danger", text: "Never leave gc-cons-threshold at startup levels permanently. It causes massive memory growth and eventual hard freezes." },
      },
      {
        title: "Android Battery Savers",
        platform: "android",
        table: {
          headers: ["Optimization", "Setting"],
          rows: [
            ["Disable JIT", "(setq native-comp-jit-compilation nil)"],
            ["Lower GC", "(setq gc-cons-threshold (* 8 1024 1024))"],
            ["No auto-revert", "(global-auto-revert-mode -1)"],
            ["No line nums in org", "(add-hook 'org-mode-hook ...)"],
          ],
        },
      },
    ],
  },
  {
    id: "ref",
    num: "XII",
    title: "Quick Reference",
    icon: "📖",
    sections: [
      {
        title: "Survival Card",
        platform: "both",
        table: {
          headers: ["Action", "Key", "Mnemonic"],
          rows: [
            ["Open file", "C-x C-f", "find"],
            ["Save", "C-x C-s", "save"],
            ["Quit", "C-x C-c", "close"],
            ["Cancel", "C-g", "go-away"],
            ["Run command", "M-x", "execute"],
            ["Undo", "C-/", "slash"],
            ["Copy", "M-w", "write ring"],
            ["Cut", "C-w", "wipe"],
            ["Paste", "C-y", "yank"],
            ["Search", "C-s", "search"],
            ["Buffer switch", "C-x b", "buffer"],
            ["Help any key", "C-h k", "key"],
          ],
        },
      },
      {
        title: "Troubleshooting",
        platform: "both",
        table: {
          headers: ["Problem", "Platform", "Fix"],
          rows: [
            ["No config loads", "Both", "Delete legacy ~/.emacs file"],
            ["Keyboard missing (read-only)", "Android", "(setq touch-screen-display-keyboard t)"],
            ["Evil keys broken", "Android", "(setq overriding-text-conversion-style nil)"],
            ["Can't open /sdcard", "Android", "Grant All Files Access in Settings"],
            ["Git not found", "Android", "Need Termux-signed APK + bridge"],
            ["Package install fails", "Both", "M-x package-refresh-contents"],
            ["Slow startup", "Both", "M-x use-package-report"],
            ["Fonts too small", "Android", "(set-face-attribute 'default nil :height 160)"],
          ],
        },
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// THEME SYSTEM
// ═══════════════════════════════════════════════════════════════

const themes = {
  dark: {
    bg: "#0f172a", surface: "#1e293b", surfaceHover: "#334155", border: "#334155",
    text: "#e2e8f0", textMuted: "#94a3b8", textDim: "#64748b",
    accent: "#3b82f6", accentGlow: "rgba(59,130,246,0.15)", accentText: "#93c5fd",
    codeBg: "#0c1222", codeBorder: "#1e3a5f", codeText: "#a5d8ff",
    danger: "#fca5a5", dangerBg: "rgba(239,68,68,0.1)", dangerBorder: "#7f1d1d",
    warning: "#fcd34d", warningBg: "rgba(245,158,11,0.1)", warningBorder: "#78350f",
    tip: "#86efac", tipBg: "rgba(34,197,94,0.1)", tipBorder: "#14532d",
    info: "#67e8f9", infoBg: "rgba(6,182,212,0.1)", infoBorder: "#164e63",
    navBg: "#0b1120", partNumColor: "#f59e0b",
    searchBg: "#1e293b", searchBorder: "#475569", searchFocus: "#3b82f6",
    badgeAndroid: "#22c55e", badgeCachyos: "#8b5cf6", badgeBoth: "#3b82f6",
  },
  light: {
    bg: "#f8fafc", surface: "#ffffff", surfaceHover: "#f1f5f9", border: "#e2e8f0",
    text: "#1e293b", textMuted: "#64748b", textDim: "#94a3b8",
    accent: "#2563eb", accentGlow: "rgba(37,99,235,0.08)", accentText: "#1d4ed8",
    codeBg: "#f1f5f9", codeBorder: "#cbd5e1", codeText: "#1e293b",
    danger: "#dc2626", dangerBg: "#fef2f2", dangerBorder: "#fecaca",
    warning: "#d97706", warningBg: "#fffbeb", warningBorder: "#fde68a",
    tip: "#16a34a", tipBg: "#f0fdf4", tipBorder: "#bbf7d0",
    info: "#0891b2", infoBg: "#ecfeff", infoBorder: "#a5f3fc",
    navBg: "#ffffff", partNumColor: "#b45309",
    searchBg: "#ffffff", searchBorder: "#cbd5e1", searchFocus: "#2563eb",
    badgeAndroid: "#16a34a", badgeCachyos: "#7c3aed", badgeBoth: "#2563eb",
  },
};

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function CodeBlock({ title, body, t }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(body); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ margin: "12px 0", borderRadius: 8, border: `1px solid ${t.codeBorder}`, overflow: "hidden" }}>
      {title && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 14px", background: t.codeBorder, fontSize: 12, fontWeight: 600, color: t.textMuted, letterSpacing: 0.5 }}>
          <span>{title}</span>
          <button onClick={copy} style={{ background: "none", border: "none", color: t.accentText, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: "14px 16px", background: t.codeBg, color: t.codeText, fontSize: 13, lineHeight: 1.6, overflowX: "auto", fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace" }}>
        {body}
      </pre>
    </div>
  );
}

function Callout({ type, text, t }) {
  const cfg = {
    danger: { bg: t.dangerBg, border: t.dangerBorder, color: t.danger, icon: "✖ DANGER" },
    warning: { bg: t.warningBg, border: t.warningBorder, color: t.warning, icon: "⚠ WARNING" },
    tip: { bg: t.tipBg, border: t.tipBorder, color: t.tip, icon: "✔ TIP" },
    info: { bg: t.infoBg, border: t.infoBorder, color: t.info, icon: "ℹ INFO" },
  }[type];
  return (
    <div style={{ margin: "12px 0", padding: "12px 16px", background: cfg.bg, borderLeft: `4px solid ${cfg.color}`, borderRadius: "0 8px 8px 0" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: cfg.color, marginBottom: 4, letterSpacing: 0.8 }}>{cfg.icon}</div>
      <div style={{ fontSize: 13.5, color: t.text, lineHeight: 1.55 }}>{text}</div>
    </div>
  );
}

function DataTable({ headers, rows, t }) {
  return (
    <div style={{ margin: "12px 0", overflowX: "auto", borderRadius: 8, border: `1px solid ${t.border}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i} style={{ padding: "8px 12px", background: t.surface, borderBottom: `2px solid ${t.accent}`, textAlign: "left", color: t.accentText, fontWeight: 700, fontSize: 12, letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 1 ? t.accentGlow : "transparent" }}>
              {row.map((cell, ci) => <td key={ci} style={{ padding: "7px 12px", borderBottom: `1px solid ${t.border}`, color: t.text, fontSize: 13 }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlatformBadge({ platform, t }) {
  const cfg = { android: { color: t.badgeAndroid, label: "Android" }, cachyos: { color: t.badgeCachyos, label: "CachyOS" }, both: { color: t.badgeBoth, label: "Both" } }[platform];
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: cfg.color, background: `${cfg.color}18`, border: `1px solid ${cfg.color}40`, marginLeft: 8, verticalAlign: "middle" }}>
      {cfg.label.toUpperCase()}
    </span>
  );
}

function Section({ section, t, platformFilter }) {
  const [open, setOpen] = useState(false);
  if (platformFilter !== "all" && section.platform !== "both" && section.platform !== platformFilter) return null;

  return (
    <div style={{ marginBottom: 4 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px", background: open ? t.accentGlow : "transparent",
        border: "none", borderBottom: `1px solid ${t.border}`, cursor: "pointer",
        textAlign: "left", color: t.text, transition: "all 0.15s",
      }}>
        <span style={{ fontSize: 14.5, fontWeight: 600 }}>
          {section.title}
          <PlatformBadge platform={section.platform} t={t} />
        </span>
        <span style={{ fontSize: 18, color: t.textDim, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</span>
      </button>
      {open && (
        <div style={{ padding: "12px 14px", animation: "fadeIn 0.2s ease" }}>
          {section.content && <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6, color: t.text }}>{section.content}</p>}
          {section.steps && (
            <ol style={{ margin: "0 0 10px", paddingLeft: 20 }}>
              {section.steps.map((s, i) => <li key={i} style={{ fontSize: 13.5, lineHeight: 1.7, color: t.text, marginBottom: 4 }}>{s}</li>)}
            </ol>
          )}
          {section.table && <DataTable headers={section.table.headers} rows={section.table.rows} t={t} />}
          {section.code && <CodeBlock title={section.code.title} body={section.code.body} t={t} />}
          {section.callout && <Callout type={section.callout.type} text={section.callout.text} t={t} />}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function EmacsHandbook() {
  const [mode, setMode] = useState("dark");
  const [search, setSearch] = useState("");
  const [activePart, setActivePart] = useState(null);
  const [platform, setPlatform] = useState("all");
  const [navOpen, setNavOpen] = useState(false);
  const t = themes[mode];
  const contentRef = useRef(null);

  const filteredParts = useMemo(() => {
    if (!search) return PARTS;
    const q = search.toLowerCase();
    return PARTS.map(part => {
      const matchedSections = part.sections.filter(s => {
        const text = [s.title, s.content || "", s.code?.body || "", s.callout?.text || "",
          ...(s.table?.rows?.flat() || []), ...(s.steps || [])].join(" ").toLowerCase();
        return text.includes(q);
      });
      if (matchedSections.length > 0 || part.title.toLowerCase().includes(q))
        return { ...part, sections: matchedSections.length > 0 ? matchedSections : part.sections };
      return null;
    }).filter(Boolean);
  }, [search]);

  const scrollToTop = useCallback(() => { contentRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div style={{ display: "flex", height: "100vh", background: t.bg, color: t.text, fontFamily: "'DM Sans', 'Segoe UI', -apple-system, sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
        button:hover { filter: brightness(1.1); }
      `}</style>

      {/* NAV SIDEBAR */}
      <nav style={{
        width: navOpen ? 260 : 0, minWidth: navOpen ? 260 : 0, background: t.navBg,
        borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column",
        transition: "all 0.25s ease", overflow: "hidden",
        position: "absolute", zIndex: 20, height: "100%",
      }}>
        <div style={{ padding: "20px 16px 12px", borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.textDim, marginBottom: 4 }}>HANDBOOK</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: t.accent }}>GNU Emacs 30.2</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {PARTS.map(part => (
            <button key={part.id} onClick={() => { setActivePart(part.id); setNavOpen(false); scrollToTop(); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 16px",
                background: activePart === part.id ? t.accentGlow : "transparent",
                border: "none", borderLeft: activePart === part.id ? `3px solid ${t.accent}` : "3px solid transparent",
                cursor: "pointer", textAlign: "left", color: activePart === part.id ? t.accentText : t.textMuted,
                fontSize: 13, fontWeight: activePart === part.id ? 600 : 400, transition: "all 0.15s",
              }}>
              <span style={{ fontSize: 16 }}>{part.icon}</span>
              <span style={{ flex: 1 }}>{part.title}</span>
              <span style={{ fontSize: 11, color: t.partNumColor, fontWeight: 700, opacity: 0.8 }}>{part.num}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: 12, borderTop: `1px solid ${t.border}`, display: "flex", gap: 6 }}>
          {["all", "android", "cachyos"].map(pf => (
            <button key={pf} onClick={() => setPlatform(pf)} style={{
              flex: 1, padding: "5px 0", borderRadius: 6, border: `1px solid ${platform === pf ? t.accent : t.border}`,
              background: platform === pf ? t.accentGlow : "transparent",
              color: platform === pf ? t.accentText : t.textDim, fontSize: 10, fontWeight: 600,
              cursor: "pointer", letterSpacing: 0.5,
            }}>{pf === "all" ? "ALL" : pf === "android" ? "📱 Android" : "🖥 CachyOS"}</button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* TOP BAR */}
        <header style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
          borderBottom: `1px solid ${t.border}`, background: t.surface, zIndex: 10,
        }}>
          <button onClick={() => setNavOpen(!navOpen)} style={{ background: "none", border: "none", color: t.text, fontSize: 20, cursor: "pointer", padding: "2px 6px" }}>☰</button>
          <input type="text" placeholder="Search handbook..." value={search}
            onChange={e => { setSearch(e.target.value); setActivePart(null); }}
            style={{
              flex: 1, padding: "8px 14px", borderRadius: 8, border: `1px solid ${t.searchBorder}`,
              background: t.searchBg, color: t.text, fontSize: 14, outline: "none",
              fontFamily: "inherit",
            }}
            onFocus={e => e.target.style.borderColor = t.searchFocus}
            onBlur={e => e.target.style.borderColor = t.searchBorder}
          />
          <div style={{ display: "flex", gap: 4 }}>
            {["all", "android", "cachyos"].map(pf => (
              <button key={pf} onClick={() => setPlatform(pf)} style={{
                padding: "6px 10px", borderRadius: 6, border: `1px solid ${platform === pf ? t.accent : t.border}`,
                background: platform === pf ? t.accentGlow : "transparent",
                color: platform === pf ? t.accentText : t.textDim, fontSize: 11, fontWeight: 600,
                cursor: "pointer",
              }}>{pf === "all" ? "All" : pf === "android" ? "📱" : "🖥"}</button>
            ))}
          </div>
          <button onClick={() => setMode(m => m === "dark" ? "light" : "dark")} style={{
            padding: "6px 10px", borderRadius: 6, border: `1px solid ${t.border}`,
            background: "transparent", color: t.text, fontSize: 16, cursor: "pointer",
          }}>{mode === "dark" ? "☀️" : "🌙"}</button>
        </header>

        {/* CONTENT */}
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "0" }}>
          {!activePart && !search && (
            <div style={{ padding: "48px 24px", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: t.accent, marginBottom: 12 }}>HANDBOOK</div>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: t.text, margin: "0 0 8px", lineHeight: 1.2 }}>GNU Emacs 30.2</h1>
              <p style={{ fontSize: 16, color: t.textMuted, margin: "0 0 32px" }}>Android App (Pixel 9) · CachyOS (Arch Linux)</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
                {PARTS.map(part => (
                  <button key={part.id} onClick={() => { setActivePart(part.id); scrollToTop(); }}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                      padding: "16px 12px", borderRadius: 10, border: `1px solid ${t.border}`,
                      background: t.surface, cursor: "pointer", transition: "all 0.2s",
                      color: t.text,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.background = t.accentGlow; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.surface; }}
                  >
                    <span style={{ fontSize: 24 }}>{part.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: t.partNumColor, letterSpacing: 1 }}>PART {part.num}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{part.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {(activePart || search) && filteredParts.map(part => {
            if (activePart && part.id !== activePart) return null;
            return (
              <div key={part.id} style={{ animation: "fadeIn 0.25s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", background: t.surface, borderBottom: `1px solid ${t.border}` }}>
                  {activePart && <button onClick={() => { setActivePart(null); setSearch(""); }} style={{ background: "none", border: "none", color: t.accent, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>← Back</button>}
                  <span style={{ fontSize: 22 }}>{part.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: t.partNumColor, letterSpacing: 1.5 }}>PART {part.num}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{part.title}</div>
                  </div>
                </div>
                {part.sections.map((section, si) => (
                  <Section key={si} section={section} t={t} platformFilter={platform} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay to close nav */}
      {navOpen && <div onClick={() => setNavOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 15, background: "rgba(0,0,0,0.3)" }} />}
    </div>
  );
}
