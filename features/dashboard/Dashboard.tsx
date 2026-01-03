
import React from 'react';
import { FileUpload } from '../../components/FileUpload';
import { ToolCard } from '../../components/ToolCard';
import { TOOLS } from '../../constants';

interface DashboardProps {
  setPdfFile: (file: File) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setPdfFile }) => {
  const featuredTools = TOOLS.flatMap(c => c.tools).filter(
    (tool) => ['ai-summary', 'translate', 'convert-to-word', 'secure-password', 'merge', 'split'].includes(tool.id)
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">PDFVerse</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Every PDF Tool. One Place. Free Forever.</p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <FileUpload onFileSelect={setPdfFile} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Popular Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onClick={() => alert(`Please upload a file first to use the ${tool.name} tool.`)} />
          ))}
        </div>
      </div>
    </div>
  );
};
