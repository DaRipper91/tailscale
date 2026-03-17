
import React, { useState, useEffect, lazy, Suspense } from 'react';

// --- Helper Components ---
const GlobalStyle = () => (
  <style>{`
    :root {
      --bg-color: #1a1b26;
      --fg-color: #a9b1d6;
      --card-bg: #24283b;
      --accent-color: #7aa2f7;
      --border-color: #414868;
      --hover-bg: #2e334d;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-color);
      color: var(--fg-color);
      margin: 0;
      padding: 2rem;
      font-size: 16px;
      line-height: 1.6;
    }
    #root {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 2rem;
      max-width: 1600px;
      margin: 0 auto;
    }
    h1, h2, h3 { color: var(--accent-color); font-weight: 500; }
  `}</style>
);

const LoadingSpinner = () => (
  <div style={{ display: 'grid', placeContent: 'center', height: '100%' }}>
    <h2>Loading...</h2>
  </div>
);

// --- File-based Component Loading ---
const MANUAL_FILES = [
  "acode_interactive_manual.jsx",
  "adb-control-gemini_Manual.md",
  "code-researcher_Manual.md",
  "company-research_Manual.md",
  "ComputerUse_Manual.md",
  "Conductor_Manual.md",
  "critical-analysis_Manual.md",
  "Dev_and_Systems_Knowledge_Engineer.md",
  "Doc_Creation_workflow.md",
  "Elitle_Onto;logical_Deep_Researcher.md",
  "emacs-handbook.jsx",
  "Exa_MCP_Server_Manual.md",
  "Gemini_Relay_Chains_Master_Manual.md",
  "Git_Expert_Manual.md",
  "Hyper-Interative_Ideation_Specialist_Engine.md",
  "implementation-planner_Manual.md",
  "lateral-thinking_Manual.md",
  "literature-review_Manual.md",
  "MCP_Toolbox_Manual.md",
  "Omni_Epistemplogical_Knowledge_Elite_Architect.md",
  "people-research_Manual.md",
  "Persona_Manual.md",
  "Pickle_Rick_Manual.md",
  "prd-drafter_Manual.md",
  "run-long-command_Manual.md",
  "ruthless-refactorer_Manual.md",
  "scout_interactive_spec.jsx",
  "Scribe_Manual.md",
  "skill-creator_Manual.md",
  "termux-handbook.jsx",
  "video-downloader_Manual.md",
  "video-editing_Manual.md"
];

const dynamicImports = Object.fromEntries(
  MANUAL_FILES.filter(file => file.endsWith('.jsx')).map(file => {
    // Vite requires a static path string for dynamic imports.
    // We can't use a variable like `file` directly in the import path.
    // This is a common pattern to work around it for known file sets.
    return [file, lazy(() => import(`../${file}`))];
  })
);

// --- Markdown Renderer ---
const MarkdownViewer = ({ file }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/${file}`)
      .then(res => res.text())
      .then(text => setContent(text));
  }, [file]);

  const renderMd = () => {
    // A simple, non-comprehensive markdown to JSX converter
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i}>{line.substring(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={i}>{line.substring(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i}>{line.substring(4)}</h3>;
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={i} style={{ marginLeft: '2rem' }}>{line.substring(2)}</li>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i}>{line}</p>;
    });
  };

  return <div style={{ padding: '1rem 2rem', background: 'var(--card-bg)', borderRadius: '8px' }}>{renderMd()}</div>;
};

// --- Main App Component ---
function App() {
  const [selectedFile, setSelectedFile] = useState(MANUAL_FILES[0]);

  const renderContent = () => {
    if (selectedFile.endsWith('.jsx')) {
      const ManualComponent = dynamicImports[selectedFile];
      return ManualComponent ? <ManualComponent /> : <p>Error loading component.</p>;
    }
    if (selectedFile.endsWith('.md')) {
      return <MarkdownViewer file={selectedFile} />;
    }
    return <p>Select a file to view.</p>;
  };

  const NavMenu = () => (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '90vh', overflowY: 'auto' }}>
      <h2 style={{marginTop: 0, marginBottom: '1rem'}}>Manuals Library</h2>
      {MANUAL_FILES.map(file => (
        <button
          key={file}
          onClick={() => setSelectedFile(file)}
          style={{
            background: selectedFile === file ? 'var(--accent-color)' : 'var(--card-bg)',
            color: selectedFile === file ? 'var(--bg-color)' : 'var(--fg-color)',
            border: 'none',
            padding: '0.75rem 1rem',
            textAlign: 'left',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: selectedFile === file ? '600' : '400',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {file.replace(/_Manual.md|.jsx|.md/g, '').replace(/_/g, ' ')}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      <GlobalStyle />
      <NavMenu />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          {renderContent()}
        </Suspense>
      </main>
    </>
  );
}

export default App;
