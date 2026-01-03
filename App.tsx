
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './features/dashboard/Dashboard';
import { AIAnalyzer } from './features/ai/AIAnalyzer';
import { TranslateTool } from './features/translate/TranslateTool';
import { ToolPlaceholder } from './features/placeholder/ToolPlaceholder';
import { Tool } from './types';
import { TOOLS } from './constants';

// Set PDF.js worker source
// @ts-ignore
if (window.pdfjsLib) {
  // @ts-ignore
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(TOOLS[0].tools[0]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // On file upload, switch to a relevant tool like AI Analyzer
    if (pdfFile) {
      const aiTool = TOOLS.flatMap(c => c.tools).find(t => t.id === 'ai-summary');
      if (aiTool) {
        setActiveTool(aiTool);
      }
    } else {
        const dashboardTool = TOOLS.flatMap(c => c.tools).find(t => t.id === 'dashboard');
        if (dashboardTool) {
            setActiveTool(dashboardTool);
        }
    }
  }, [pdfFile]);

  const renderActiveTool = useCallback(() => {
    if (!pdfFile && activeTool.id !== 'dashboard') {
        return <Dashboard setPdfFile={setPdfFile} />;
    }

    switch (activeTool.id) {
      case 'dashboard':
        return <Dashboard setPdfFile={setPdfFile} />;
      case 'ai-summary':
      case 'ai-ask':
      case 'ai-extract':
        return <AIAnalyzer pdfFile={pdfFile} activeTool={activeTool} />;
      case 'translate':
        return <TranslateTool pdfFile={pdfFile} />;
      // Placeholders for other tools
      case 'edit':
      case 'convert-to-word':
      case 'convert-from-image':
      case 'secure-password':
      case 'merge':
      case 'split':
      case 'compress':
        return <ToolPlaceholder tool={activeTool} />;
      default:
        return <Dashboard setPdfFile={setPdfFile} />;
    }
  }, [activeTool, pdfFile]);

  const handleClearPdf = () => {
    setPdfFile(null);
    const dashboardTool = TOOLS.flatMap(c => c.tools).find(t => t.id === 'dashboard');
    if (dashboardTool) setActiveTool(dashboardTool);
  };

  return (
    <div className="flex h-screen bg-secondary text-secondary-foreground font-sans">
      <Sidebar 
        activeTool={activeTool} 
        setActiveTool={setActiveTool}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          pdfFile={pdfFile} 
          onClearPdf={handleClearPdf}
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-secondary">
          {renderActiveTool()}
        </main>
      </div>
    </div>
  );
};

export default App;
