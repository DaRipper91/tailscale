
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
  "adb-control-gemini_Manual.jsx",
  "Agents_Guide.jsx",
  "cleanup_guide.jsx",
  "code-researcher_Manual.jsx",
  "company-research_Manual.jsx",
  "ComputerUse_Manual.jsx",
  "Conductor_Manual.jsx",
  "critical-analysis_Manual.jsx",
  "DECENTRALIZED_MESH_MANUAL.jsx",
  "Dev_and_Systems_Knowledge_Engineer.jsx",
  "Doc_Creation_workflow.jsx",
  "Elitle_Onto;logical_Deep_Researcher.jsx",
  "emacs-handbook.jsx",
  "Exa_MCP_Server_Manual.jsx",
  "Gemini_Relay_Chains_Master_Manual.jsx",
  "Git_Expert_Manual.jsx",
  "Hyper-Interative_Ideation_Specialist_Engine.jsx",
  "implementation-planner_Manual.jsx",
  "lateral-thinking_Manual.jsx",
  "literature-review_Manual.jsx",
  "MANUAL.jsx",
  "MCP_Toolbox_Manual.jsx",
  "Omni_Epistemplogical_Knowledge_Elite_Architect.jsx",
  "OMNI_SCOUT_ENGINE_MANUAL.jsx",
  "people-research_Manual.jsx",
  "Persona_Manual.jsx",
  "Pickle_Rick_Manual.jsx",
  "prd-drafter_Manual.jsx",
  "run-long-command_Manual.jsx",
  "ruthless-refactorer_Manual.jsx",
  "scout_interactive_spec.jsx",
  "Scribe_Manual.jsx",
  "skill-creator_Manual.jsx",
  "Starship_Master_Manual.jsx",
  "termux-handbook.jsx",
  "USER_MANUAL.jsx",
  "video-downloader_Manual.jsx",
  "video-editing_Manual.jsx",
  "Xbox_RetroArch_Master_Manual.jsx"
];

const dynamicImports = Object.fromEntries(
  MANUAL_FILES.filter(file => file.endsWith('.jsx')).map(file => {
    return [file, lazy(() => import(`../${file}`))];
  })
);

// --- Main App Component ---
function App() {
  const [selectedFile, setSelectedFile] = useState(MANUAL_FILES[0]);

  const renderContent = () => {
    if (selectedFile.endsWith('.jsx')) {
      const ManualComponent = dynamicImports[selectedFile];
      return ManualComponent ? <ManualComponent /> : <p>Error loading component.</p>;
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
          {file.replace(/_Manual.jsx|.jsx|.md/g, '').replace(/_/g, ' ')}
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
