
import React from 'react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactElement;
  category: string;
}

export interface ToolCategory {
  name: string;
  tools: Tool[];
}

export enum AIAction {
    SUMMARIZE = 'summarize',
    ASK = 'ask',
    EXTRACT_POINTS = 'extract',
    GENERATE_FLASHCARDS = 'flashcards',
}
