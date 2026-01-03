
import React from 'react';
import { Tool } from '../../types';

interface ToolPlaceholderProps {
  tool: Tool;
}

export const ToolPlaceholder: React.FC<ToolPlaceholderProps> = ({ tool }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-24 h-24 flex items-center justify-center bg-accent/10 text-accent rounded-full mb-6">
        {React.cloneElement(tool.icon, { className: 'w-12 h-12' })}
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{tool.description}</p>
      <p className="mt-6 text-xl font-semibold text-accent">Coming Soon!</p>
    </div>
  );
};
