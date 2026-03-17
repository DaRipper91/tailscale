
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
  {
    id: "intro",
    num: "I",
    title: "Introduction & Environment",
    icon: "🔌",
    sections: [
      {
        title: "Objective",
        platform: "both",
        content: "Control Android devices (physical or emulated) via ADB through the Gemini CLI.",
      },
      {
        title: "Pre-requisites",
        platform: "both",
        steps: [
          "`android-tools` installed (`sudo pacman -S android-tools`).",
          "USB Debugging enabled on the target device.",
          "Device connected and authorized: `adb devices`.",
        ],
      },
      {
        title: "Waking the Device",
        platform: "both",
        content: "If the screen is off, use the home action to wake it up.",
        code: { title: "Bash", body: "/android:home" },
      },
      {
        title: "Strategy: Scripting over Tapping",
        platform: "both",
        content: "Prioritize `run_ai_script` for complex logic rather than individual tap commands.",
      },
      {
        title: "Pro-Tip",
        platform: "both",
        callout: { type: "tip", text: "Use wireless ADB (`adb connect <ip>`) to control devices across your local network without cables." },
      },
    ],
  },
  {
    id: "perception",
    num: "II",
    title: "Smart Perception & Inspection",
    icon: "👀",
    sections: [
      {
        title: "Objective",
        platform: "both",
        content: "Understand what is currently on the Android screen.",
      },
      {
        title: "Screen Summary",
        platform: "both",
        content: "Get a token-efficient list of interactive elements (buttons, text fields).",
        code: { title: "Bash", body: "/android:get_screen_summary" },
      },
      {
        title: "Inspect UI",
        platform: "both",
        content: "Retrieve the full XML layout tree for deep element identification.",
        code: { title: "Bash", body: "/android:inspect_ui" },
      },
       {
        title: "Visual Perception",
        platform: "both",
        content: "Use OCR and image matching for elements that don't appear in the XML tree.",
        code: { title: "Bash", body: `/android:visual_perception prompt="Where is the 'Skip' button?"` },
      },
      {
        title: "Expected Outcome",
        platform: "both",
        content: "A detailed map of the current UI state, allowing for precise targeting.",
      },
    ],
  },
    {
    id: "automation",
    num: "III",
    title: "High-Speed Automation",
    icon: "🚀",
    sections: [
      {
        title: "Objective",
        platform: "both",
        content: "Execute complex Python-based logic locally for fast device control.",
      },
      {
        title: "The `run_ai_script` Tool",
        platform: "both",
        content: "Write Python logic to handle \"Find -> Wait -> Click\" loops.",
        code: { title: "Python", body: `if find(\"Search\"):\n    click(\"Search\")\n    type(\"Hello World\")` },
      },
      {
        title: "Batch Execution",
        platform: "both",
        content: "Run a sequence of ADB actions in a single tool call to reduce latency.",
        code: { title: "Bash", body: `/android:execute_batch actions='[{"action":"tap", "x":100, "y":200}, {"action":"type", "text":"test"}]'` },
      },
       {
        title: "Waiting for Elements",
        platform: "both",
        content: "Use `wait_for(text)` to ensure the UI has loaded before the next action.",
      },
      {
        title: "Pro-Tip",
        platform: "both",
        callout: {type: "tip", text:"Use scripts to automate repetitive mobile tasks like \"Claim Daily Reward\" or \"Clear Cache\"."}
      },
    ],
  },
  {
    id: "communication",
    num: "IV",
    title: "Communication & Messaging",
    icon: "💬",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Automate reading and replying to messages (SMS, WhatsApp, Telegram)."
        },
        {
            title: "Reading Messages",
            platform: "both",
            content: "Extract the most recent notifications or chat history.",
            code: { title: "Python", body: "msgs = read_messages()\nprint(msgs[-1])" }
        },
        {
            title: "Smart Replying",
            platform: "both",
            content: "Analyze incoming context and generate a relevant response.",
            code: { title: "Python", body: `reply(\"I'm in a meeting, talk soon.\")` }
        },
        {
            title: "Handling Logic",
            platform: "both",
            content: "Implement filters: \"Only reply to John\" or \"If message contains 'urgent' then alert me\"."
        },
        {
            title: "Expected Outcome",
            platform: "both",
            content: "Hands-free messaging management directly from your terminal."
        }
    ]
  },
  {
    id: "management",
    num: "V",
    title: "System & App Management",
    icon: "🛠️",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Install apps, clear data, and manage system-level settings."
        },
        {
            title: "Installing APKs",
            platform: "both",
            content: "Install a local file to the connected device.",
            code: { title: "Bash", body: "adb install my_app.apk" }
        },
        {
            title: "App Lifecycle",
            platform: "both",
            content: "Force stop or clear data for specific packages.",
            code: { title: "Bash", body: `/android:execute_command command=\"shell pm clear com.example.app\"` }
        },
        {
            title: "Logcat Monitoring",
            platform: "both",
            content: "Stream system logs to debug app crashes or behavior.",
            code: { title: "Bash", body: `/android:adb_logcat filter=\"* E\" # Show only errors` }
        },
        {
            title: "Pro-Tip",
            platform: "both",
            callout: { type: "tip", text: "Use `pm list packages -3` to quickly find the package names of third-party apps you want to automate." }
        }
    ]
  },
  {
    id: "navigation",
    num: "VI",
    title: "Navigation & Gestures",
    icon: "👉",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Navigate the OS using standard Android navigation and custom gestures."
        },
        {
            title: "Key Events",
            platform: "both",
            content: "Send specific hardware key signals (Back, Recent, Volume).",
            code: { title: "Bash", body: "/android:back" }
        },
        {
            title: "Swiping & Scrolling",
            platform: "both",
            content: "Simulate finger movements for list navigation.",
            code: { title: "Bash", body: `/android:swipe start_x=500 start_y=800 end_x=500 end_y=200 duration=500` }
        },
        {
            title: "Unlocking the Device",
            platform: "both",
            content: "Automate PIN entry or swipe-to-unlock (if security allows)."
        },
        {
            title: "Pro-Tip",
            platform: "both",
            callout: { type: "tip", text: "Combine `get_screen_summary` with `swipe` to programmatically scroll until a specific button is found." }
        }
    ]
  },
  {
    id: "security",
    num: "VII",
    title: "Security & Best Practices",
    icon: "🛡️",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Protect your device data and ensure stable automation."
        },
        {
            title: "USB Debugging Risks",
            platform: "both",
            content: "Always disable USB Debugging when not in use to prevent unauthorized access."
        },
        {
            title: "Authorization",
            platform: "both",
            content: "Ensure you \"Always allow from this computer\" when first connecting a device."
        },
        {
            title: "Script Timeouts",
            platform: "both",
            content: "Always include timeouts in your `wait_for` calls to prevent infinite loops if the app crashes."
        },
        {
            title: "Expected Outcome",
            platform: "both",
            content: "A reliable, secure connection that allows for professional-grade mobile automation."
        }
    ]
  },
  {
    id: "reference",
    num: "VIII",
    title: "Command Reference & FAQ",
    icon: "📚",
    sections: [
        {
            title: "Objective",
            platform: "both",
            content: "Quick lookup for the 100+ supported ADB commands."
        },
        {
            title: "Core Commands",
            platform: "both",
            steps: ["`tap`", "`type`", "`swipe`", "`home`", "`back`", "`find`", "`read_messages`", "`reply`"]
        },
        {
            title: "Custom Shell Commands",
            platform: "both",
            content: "You can run any `adb shell` command using the `execute_command` tool."
        },
        {
            title: "FAQ: Can I control multiple devices?",
            platform: "both",
            content: "Yes, use `adb -s <serial_number>` in your commands to target specific hardware."
        },
        {
            title: "Final Pro-Tip",
            platform: "both",
            callout: { type: "tip", text: "Use `adb-control-gemini` for mobile testing in CI/CD pipelines to ensure app stability." }
        }
    ]
  }
];

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

export default function AdbControlGeminiManual() {
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
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.textDim, marginBottom: 4 }}>MANUAL</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: t.accent }}>ADB Control</div>
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
            }}>{pf.toUpperCase()}</button>
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
          <input type="text" placeholder="Search manual..." value={search}
            onChange={e => { setSearch(e.target.value); setActivePart(null); }}
            style={{
              flex: 1, padding: "8px 14px", borderRadius: 8, border: `1px solid ${t.searchBorder}`,
              background: t.searchBg, color: t.text, fontSize: 14, outline: "none",
              fontFamily: "inherit",
            }}
            onFocus={e => e.target.style.borderColor = t.searchFocus}
            onBlur={e => e.target.style.borderColor = t.searchBorder}
          />
        </header>

        {/* CONTENT */} 
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "0" }}>
          {!activePart && !search && (
            <div style={{ padding: "48px 24px", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
               <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: t.accent, marginBottom: 12 }}>MANUAL</div>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: t.text, margin: "0 0 8px", lineHeight: 1.2 }}>ADB Control for Gemini</h1>
              <p style={{ fontSize: 16, color: t.textMuted, margin: "0 0 32px" }}>Control Android devices via the Gemini CLI.</p>
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
      {navOpen && <div onClick={() => setNavOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 15, background: "rgba(0,0,0,0.3)" }} />}
    </div>
  );
}
