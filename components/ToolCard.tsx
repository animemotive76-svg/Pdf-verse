
import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-6 bg-white dark:bg-primary rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 flex items-center justify-center bg-accent/10 text-accent rounded-lg">
            {React.cloneElement(tool.icon, { className: "w-6 h-6" })}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-primary-foreground">{tool.name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
        </div>
      </div>
    </div>
  );
};
