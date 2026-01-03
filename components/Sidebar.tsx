
import React from 'react';
import { Logo } from './Logo';
import { Tool } from '../types';
import { TOOLS } from '../constants';

interface SidebarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool, isSidebarOpen, setSidebarOpen }) => {

  const handleToolClick = (tool: Tool) => {
    setActiveTool(tool);
    if(isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-primary text-primary-foreground">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <div className="md:hidden">
            <Logo />
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
          {TOOLS.map((category) => (
            <div key={category.name}>
              {category.name !== 'Home' && <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{category.name}</h3>}
              <div className="mt-2 space-y-1">
                {category.tools.map((tool) => (
                  <a
                    key={tool.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleToolClick(tool);
                    }}
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      activeTool.id === tool.id
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{tool.icon}</span>
                    {tool.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
  );


  return (
    <>
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
           <SidebarContent />
        </div>
      </div>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
         <div className="flex flex-col w-64">
           <SidebarContent />
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true" onClick={() => setSidebarOpen(false)}>
           {/* Dummy element to close sidebar on outside click */}
        </div>
      </div>
       {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
    </>
  );
};
