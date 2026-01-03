
import React from 'react';
import { ToolCategory } from './types';
import { HomeIcon, PencilIcon, SwitchHorizontalIcon, TranslateIcon, SparklesIcon, ShieldCheckIcon } from './components/icons/Icons';

export const TOOLS: ToolCategory[] = [
  {
    name: 'Home',
    tools: [
      { id: 'dashboard', name: 'Dashboard', description: 'Start here', icon: <HomeIcon />, category: 'Home' },
    ]
  },
  {
    name: 'AI Tools',
    tools: [
      { id: 'ai-summary', name: 'AI Summary', description: 'Get a quick summary of your PDF.', icon: <SparklesIcon />, category: 'AI' },
      { id: 'ai-ask', name: 'Ask PDF', description: 'Ask questions and get answers from your document.', icon: <SparklesIcon />, category: 'AI' },
      { id: 'ai-extract', name: 'Extract Points', description: 'Pull out key points and takeaways.', icon: <SparklesIcon />, category: 'AI' },
    ]
  },
  {
    name: 'Translate',
    tools: [
      { id: 'translate', name: 'Translate PDF', description: 'Translate PDF text between English and Hindi.', icon: <TranslateIcon />, category: 'Translate' },
    ]
  },
  {
    name: 'Edit & Sign',
    tools: [
        { id: 'edit', name: 'Edit PDF', description: 'Add text, shapes, and annotations.', icon: <PencilIcon />, category: 'Edit' },
    ]
  },
  {
    name: 'Convert',
    tools: [
      { id: 'convert-to-word', name: 'PDF to Word', description: 'Convert your PDF to an editable Word document.', icon: <SwitchHorizontalIcon />, category: 'Convert' },
      { id: 'convert-from-image', name: 'Image to PDF', description: 'Create a PDF from JPG, PNG, and other images.', icon: <SwitchHorizontalIcon />, category: 'Convert' },
    ]
  },
  {
    name: 'Security',
    tools: [
      { id: 'secure-password', name: 'Protect PDF', description: 'Add a password and encrypt your PDF.', icon: <ShieldCheckIcon />, category: 'Security' },
    ]
  },
  {
    name: 'Organize',
    tools: [
        { id: 'merge', name: 'Merge PDF', description: 'Combine multiple PDFs into one.', icon: <PencilIcon />, category: 'Organize' },
        { id: 'split', name: 'Split PDF', description: 'Extract pages from your PDF.', icon: <PencilIcon />, category: 'Organize' },
        { id: 'compress', name: 'Compress PDF', description: 'Reduce the file size of your PDF.', icon: <PencilIcon />, category: 'Organize' },
    ]
  }
];
