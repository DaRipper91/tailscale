import { useState, useMemo, useEffect } from "react";

const spec = [
  {
    id: "s1", title: "Core Features (MVP)", icon: "🎯",
    sections: [
      { id: "s1.1", title: "Smart Contact Import & Sync", content: null, bullets: [
        "Bidirectional sync with Android system contacts + Scout metadata",
        "CLI import/export, incremental sync, conflict resolution",
        "System = source of truth for core fields (name, phone, email)",
        "Import dry-run preview with conflict highlights before commit",
      ]},
      { id: "s1.2", title: "Advanced Tagging & Categories", content: null, bullets: [
        "Color/icon tags, hierarchical categories (materialized path)",
        "Smart auto-tags with confidence scoring",
        "Tag templates for bulk application during onboarding",
        "Per-contact typed custom fields, FTS5-indexed",
      ]},
      { id: "s1.3", title: "AI-Powered Search", content: null, bullets: [
        "Text search: FTS5 with unicode61 tokenizer",
        "Semantic: sqlite-vec embeddings (MiniLM variants)",
        "Hybrid: score = α * semantic + (1-α) * text, tunable α",
        "Fuzzy: rapidfuzz with configurable cutoff",
        "Explainable results: show top contributing fields",
      ]},
      { id: "s1.4", title: "Duplicate Detection", content: null, bullets: [
        "Multi-algorithm: exact phone, fuzzy name, email heuristic, vector similarity",
        "Confidence-scored groups, clustering",
        "Auto-merge above 0.95 threshold, manual review 0.70–0.95",
        "Merge audit log with full pre/post snapshots and undo",
      ]},
      { id: "s1.5", title: "Relationship Graph", content: null, bullets: [
        "14 typed relationships (family, colleague, mentor, client, etc.)",
        "Computed strength: frequency, shared tags, co-events",
        "Graph queries and GraphML export for visualization",
      ]},
      { id: "s1.6", title: "Interaction Tracking", content: null, bullets: [
        "Aggregate call/SMS/email logs → recency + frequency",
        "Importance score: 0.0–1.0 with configurable decay rate",
        "Sources: system, manual entry, import",
      ]},
    ]
  },
  {
    id: "s2", title: "Architecture & Data", icon: "🏗️",
    sections: [
      { id: "s2.1", title: "Schema Design", content: "23 tables including FTS5 virtual table, 29 indexes, 1 trigger. Strict typing with CHECK constraints. UUID primary keys for cross-device safety. Soft-delete with is_deleted + deleted_at. ISO-8601 UTC timestamps. WAL journal mode for concurrent reads." },
      { id: "s2.2", title: "Key Tables", content: null,
        table: { headers: ["Table", "Purpose", "Key Details"], rows: [
          ["contacts", "Core entity + Scout metadata", "UUID PK, system_contact_id link, importance_score 0–1"],
          ["phone_numbers", "E.164 normalized phones", "Per-contact, labeled (mobile/home/work)"],
          ["email_addresses", "Contact emails", "Lowercase stored, labeled"],
          ["categories", "Hierarchical via materialized path", "path = '/Work/Eng/Backend', parent_id FK"],
          ["tags", "Flat tags with color/icon", "Unique name, auto-tag flag"],
          ["contact_tags", "Contact ↔ Tag junction", "assigned_by (user/auto/import/merge), confidence"],
          ["custom_field_definitions", "Typed field schemas", "text/number/date/url/email/phone/boolean/select"],
          ["custom_field_values", "Per-contact field values", "Stored as TEXT, parsed by field_type"],
          ["relationships", "Contact graph edges", "14 types, strength 0–1, bidirectional flag"],
          ["interactions", "Call/SMS/email logs", "10 types, duration, summary, source"],
          ["duplicate_groups", "Suspected duplicate clusters", "Status, confidence, detection method"],
          ["merge_audit_log", "Immutable merge history", "Pre/post JSON snapshots, undo support"],
          ["contact_embeddings", "Vector store for semantic search", "Model versioned, source_text_hash for incremental"],
          ["sync_metadata", "Bidirectional sync state", "Version counters, conflict_data JSON"],
          ["import_batches", "Import audit trail", "Dry-run reports, batch stats, status tracking"],
          ["embedding_models", "Model registry", "Backend (tflite/sentence_transformers/server/stub)"],
          ["app_config", "Key-value settings", "Search α, thresholds, sync intervals"],
          ["edit_history", "Field-level audit trail", "old_value/new_value, edited_by source"],
          ["tag_templates", "Pre-built tag collections", "Bulk application during onboarding"],
          ["schema_version", "Schema versioning", "Semver, checksum, migration tracking"],
        ]}},
      { id: "s2.3", title: "Adapter Pattern", content: "Modular adapter layer (Strangler migration): isolate system contact sources behind adapters. Shadow system_contact table stores only metadata in Scout DB, references system IDs. Pluggable embedding backend interface swaps models without schema changes." },
      { id: "s2.4", title: "Default Configuration", content: null,
        table: { headers: ["Config Key", "Default", "Purpose"], rows: [
          ["hybrid_search_alpha", "0.6", "Weight for semantic score in hybrid ranking"],
          ["importance_decay_rate", "0.05", "Daily decay rate for recency component"],
          ["sync_interval_minutes", "30", "Min interval between auto system syncs"],
          ["max_import_batch_size", "1000", "Max contacts per import batch"],
          ["embedding_batch_size", "50", "Contacts per embedding batch operation"],
          ["auto_merge_threshold", "0.95", "Confidence above which auto-merge triggers"],
          ["review_threshold", "0.70", "Confidence below which manual review required"],
          ["fuzzy_match_cutoff", "85", "rapidfuzz score cutoff (0–100)"],
        ]}},
    ]
  },
  {
    id: "s3", title: "ML, Search & Performance", icon: "🧠",
    sections: [
      { id: "s3.1", title: "Embedding Strategy", content: null, bullets: [
        "Quantized/distilled on-device models (MiniLM variants) for low memory/CPU",
        "TFLite for Flutter, sentence-transformers for Python CLI",
        "Incremental updates: recompute only when source_text_hash changes",
        "Batch operations + bulk upserts for imports",
        "Model registry tracks version; triggers re-embed on model change",
      ]},
      { id: "s3.2", title: "Hybrid Search Formula", content: "score = α × semantic_score + (1−α) × text_score. Default α = 0.6, tunable per-query via app_config. Explainable results show which fields contributed most." },
      { id: "s3.3", title: "Performance Optimizations", content: null, bullets: [
        "Materialized-path categories: fast hierarchical queries via LIKE",
        "FTS5 with unicode61 remove_diacritics=2 for locale-aware search",
        "29 targeted indexes on FK columns and common query patterns",
        "WAL journal mode for concurrent reads during writes",
        "Embedding cache: hash-based skip for unchanged contacts",
        "Batch vector DB operations minimize write overhead",
      ]},
    ]
  },
  {
    id: "s4", title: "UX & Product", icon: "🎨",
    sections: [
      { id: "s4.1", title: "Import Experience", content: "Dry-run preview with conflict highlights and suggested merges before commit. Progressive duplicates UI: auto-merge high-confidence (≥0.95), manual review for medium (0.70–0.95), dismiss low-confidence." },
      { id: "s4.2", title: "Onboarding", content: "Permission rationale screens explaining why each permission is needed. Import walkthrough with progress indicators. Sample tag templates (Professional Networking, Family, etc.) for quick start." },
      { id: "s4.3", title: "Accessibility & Localization", content: null, bullets: [
        "RTL layout support for Arabic, Hebrew, etc.",
        "Large text / dynamic type support",
        "TalkBack (Android) and VoiceOver (iOS) screen reader compatibility",
        "Locale-aware date, time, and number formatting",
      ]},
      { id: "s4.4", title: "Search UX", content: "Explainable search: show top contributing fields (tags, notes, interactions) for each semantic result. Highlight matching terms. Progressive loading for large result sets." },
    ]
  },
  {
    id: "s5", title: "Security & Privacy", icon: "🔒",
    sections: [
      { id: "s5.1", title: "Encryption", content: "Local-first: encrypt SQLite with user passphrase or platform keystore (Android Keystore / iOS Keychain). Encrypted backup archives. At-rest encryption for all sensitive data." },
      { id: "s5.2", title: "Privacy-First Design", content: null, bullets: [
        "Opt-in aggregated local-only telemetry; no PII in telemetry",
        "Minimize permissions: only request what's necessary with rationale",
        "Follow Scoped Storage on Android 10+",
        "No cloud sync by default; explicit opt-in required",
      ]},
      { id: "s5.3", title: "Export & Audit", content: "Full data export (JSON, CSV, vCard). Complete deletion controls. Immutable merge and edit audit logs with timestamps and actor identification. Edit history tracks every field-level change." },
    ]
  },
  {
    id: "s6", title: "DevOps & Testing", icon: "🧪",
    sections: [
      { id: "s6.1", title: "CI Pipeline", content: null, bullets: [
        "Python test matrix across supported versions (3.10, 3.11, 3.12)",
        "Flutter integration tests on target Android API levels",
        "Pre-commit hooks: linting, formatting, type checking",
        "Automated schema validation tests against canonical schema.sql",
      ]},
      { id: "s6.2", title: "Migration Testing", content: "Fixtures simulating ContactsContract changes across Android versions. v1→v2 migration test harness with sample data. Schema diff validation to prevent accidental breaking changes." },
      { id: "s6.3", title: "Developer Tooling", content: null, bullets: [
        "Dev environment setup scripts (one-command bootstrap)",
        "Icon generation pipeline",
        "Seed dev DB with realistic test data",
        "Local TFLite inference testing",
        "Observability: local metrics for embedding latency, import duration, sync errors",
      ]},
    ]
  },
  {
    id: "s7", title: "Mobile Engineering", icon: "📱",
    sections: [
      { id: "s7.1", title: "WorkManager Tuning", content: "Incremental syncs via WorkManager. Exponential backoff on failure. Low-battery mode reduces sync frequency. Wi-Fi/charging constraints for heavy tasks (batch embedding, full re-sync)." },
      { id: "s7.2", title: "Photo Handling", content: "Store URIs only, never raw blobs. Lazy fetch and resize on display. Cached thumbnails to save storage and bandwidth. Clean up orphaned caches periodically." },
      { id: "s7.3", title: "ML on Device", content: null, bullets: [
        "Run heavy inference only on Wi-Fi + charging",
        "Server fallback option for users who prefer cloud processing",
        "User opt-in required for any off-device processing",
        "Limit inference concurrency to prevent UI jank",
        "Allow user to schedule heavy embedding jobs",
      ]},
    ]
  },
  {
    id: "s8", title: "Sprint 1 & Risks", icon: "🏃",
    sections: [
      { id: "s8.1", title: "Sprint 1 Quick Wins", content: null, bullets: [
        "Lock canonical shared/schema.sql + automated validation tests",
        "Import dry-run CLI + minimal Flutter preview screen",
        "Pluggable embedding interface with local stub implementation",
        "CI skeleton: Python unit tests + Flutter build workflow + pre-commit hooks",
      ],
        callout: { type: "tip", text: "These four items establish the foundation. Everything else builds on a locked schema, working import pipeline, and green CI." }},
      { id: "s8.2", title: "Risks & Mitigations", content: null,
        table: { headers: ["Risk", "Impact", "Mitigation"], rows: [
          ["Large imports / DB bloat", "High", "Chunked imports, dedupe during import, VACUUM, retention policies"],
          ["On-device ML resource limits", "Medium", "Quantized models, server fallback, user opt-in for cloud"],
          ["Sync conflicts with system contacts", "High", "System = source of truth for core; metadata conflicts surfaced with merge UI + versioned audit logs"],
          ["Privacy / regulatory risk", "Critical", "Local-only default, encrypted backups, explicit opt-in for external sync"],
          ["Schema drift between platforms", "Medium", "Single canonical schema.sql; automated validation in CI for both Drift and SQLAlchemy"],
        ]}},
      { id: "s8.3", title: "Suggested Next Deliverables", content: null, bullets: [
        "Prioritized Sprint 1 checklist with story points and acceptance criteria",
        "Drift (Flutter) and SQLAlchemy (Python) models generated from canonical schema",
        "Duplicate-merge UI wireframe + CLI UX flows with example commands",
      ]},
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
          <thead><tr>{headers.map((h, i) => (<th key={i} onClick={() => toggle(i)} style={{ background: "#145A32", color: "#fff", padding: "8px 10px", textAlign: "left", cursor: "pointer", whiteSpace: "nowrap", userSelect: "none", borderBottom: "2px solid #0E3B20" }}>{h} {sortCol === i ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}</th>))}</tr></thead>
          <tbody>{sorted.map((row, ri) => (<tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#EAFAF1" }}>{row.map((cell, ci) => (<td key={ci} style={{ padding: "7px 10px", borderBottom: "1px solid #E8E8E8", verticalAlign: "top" }}>{cell}</td>))}</tr>))}{sorted.length === 0 && <tr><td colSpan={headers.length} style={{ padding: 12, textAlign: "center", color: "#999" }}>No matching rows</td></tr>}</tbody>
        </table>
      </div>
    </div>
  );
};

const Section = ({ section, open, onToggle }) => (
  <div style={{ marginBottom: 2 }}>
    <button onClick={onToggle} style={{ width: "100%", textAlign: "left", padding: "10px 14px", background: open ? "#EAFAF1" : "#FDFEFE", border: "1px solid #E8E8E8", borderRadius: 4, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.92rem", fontWeight: 600, color: "#1C2833", transition: "background 0.15s" }}>
      <span>{section.title}</span><span style={{ fontSize: "0.8rem", color: "#7F8C8D", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
    </button>
    {open && (
      <div style={{ padding: "10px 14px", borderLeft: "3px solid #27AE60", marginLeft: 8, marginTop: 2 }}>
        {section.content && <p style={{ margin: "0 0 8px", lineHeight: 1.6, fontSize: "0.88rem", color: "#2C3E50" }}>{section.content}</p>}
        {section.bullets && <ul style={{ margin: "4px 0 8px", paddingLeft: 20, lineHeight: 1.7, fontSize: "0.88rem", color: "#2C3E50" }}>{section.bullets.map((b, i) => <li key={i} style={{ marginBottom: 3 }}>{b}</li>)}</ul>}
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

  const expandAll = () => { const c = {}, s = {}; spec.forEach(ch => { c[ch.id] = true; ch.sections.forEach(sec => { s[sec.id] = true; }); }); setExpCh(c); setExpSec(s); };
  const collapseAll = () => { const c = {}, s = {}; spec.forEach(ch => { c[ch.id] = false; ch.sections.forEach(sec => { s[sec.id] = false; }); }); setExpCh(c); setExpSec(s); };

  const filtered = useMemo(() => {
    if (!search) return spec;
    const q = search.toLowerCase();
    return spec.map(ch => {
      const ms = ch.sections.filter(s => [s.title, s.content || "", ...(s.bullets || []), ...(s.table ? s.table.rows.flat() : [])].join(" ").toLowerCase().includes(q));
      if (ms.length > 0 || ch.title.toLowerCase().includes(q)) return { ...ch, sections: ms.length > 0 ? ms : ch.sections };
      return null;
    }).filter(Boolean);
  }, [search]);

  useEffect(() => {
    if (search) { const c = {}, s = {}; filtered.forEach(ch => { c[ch.id] = true; ch.sections.forEach(sec => { s[sec.id] = true; }); }); setExpCh(p => ({ ...p, ...c })); setExpSec(p => ({ ...p, ...s })); }
  }, [search, filtered]);

  const scrollTo = (id) => { setExpCh(p => ({ ...p, [id]: true })); setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100); };
  const total = spec.reduce((a, c) => a + c.sections.length, 0);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif", color: "#1C2833" }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}} *{box-sizing:border-box} ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#f1f1f1} ::-webkit-scrollbar-thumb{background:#bbb;border-radius:3px} button:hover{opacity:0.92} input::placeholder{color:rgba(255,255,255,0.5)}`}</style>
      <div style={{ background: "linear-gradient(135deg, #1E8449, #0D1117)", padding: "20px 24px 16px", color: "#fff", flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>🔍 Scout-Organizer v2.0 — Product Spec</h1>
        <p style={{ margin: "4px 0 12px", fontSize: "0.85rem", opacity: 0.8 }}>Smart Contact Manager — {spec.length} Sections · {total} Subsections · Features · Schema · Architecture</p>
        <input type="text" placeholder="🔍 Search spec..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "9px 14px", border: "none", borderRadius: 6, fontSize: "0.9rem", background: "rgba(255,255,255,0.15)", color: "#fff", outline: "none", boxSizing: "border-box" }} />
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button onClick={expandAll} style={{ padding: "5px 12px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: "0.78rem" }}>Expand All</button>
          <button onClick={collapseAll} style={{ padding: "5px 12px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: "0.78rem" }}>Collapse All</button>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <nav style={{ width: 210, minWidth: 170, background: "#F8F9FA", borderRight: "1px solid #E8E8E8", overflowY: "auto", flexShrink: 0, padding: "10px 0", fontSize: "0.8rem" }}>
          <div style={{ padding: "4px 12px 8px", fontWeight: 700, color: "#566573", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Contents</div>
          {spec.map(ch => (<button key={ch.id} onClick={() => scrollTo(ch.id)} style={{ width: "100%", textAlign: "left", padding: "6px 12px", border: "none", background: "transparent", cursor: "pointer", color: "#1C2833", fontWeight: 600, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6 }}><span>{ch.icon}</span><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.title.replace(/^[^:]+: ?/, "")}</span></button>))}
        </nav>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#999" }}><div style={{ fontSize: "2rem", marginBottom: 8 }}>🔍</div>No results for "{search}"</div>}
          {filtered.map(ch => (
            <div key={ch.id} id={ch.id} style={{ marginBottom: 12 }}>
              <button onClick={() => setExpCh(p => ({ ...p, [ch.id]: !p[ch.id] }))} style={{ width: "100%", textAlign: "left", padding: "12px 16px", background: expCh[ch.id] ? "#1E8449" : "#2C3E50", border: "none", borderRadius: 6, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", fontSize: "1rem", fontWeight: 700, transition: "background 0.2s" }}>
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
