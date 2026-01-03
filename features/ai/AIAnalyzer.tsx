
import React, { useState, useEffect, useCallback } from 'react';
import { usePdfText } from '../../hooks/usePdfText';
import { summarizeText, askQuestion, extractKeyPoints } from '../../services/geminiService';
import { Tool, AIAction } from '../../types';

interface AIAnalyzerProps {
  pdfFile: File | null;
  activeTool: Tool;
}

export const AIAnalyzer: React.FC<AIAnalyzerProps> = ({ pdfFile, activeTool }) => {
  const { text, isLoading: isTextLoading, error: textError } = usePdfText(pdfFile);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');

  const getActionFromToolId = (id: string): AIAction => {
    switch (id) {
        case 'ai-summary': return AIAction.SUMMARIZE;
        case 'ai-ask': return AIAction.ASK;
        case 'ai-extract': return AIAction.EXTRACT_POINTS;
        default: return AIAction.SUMMARIZE;
    }
  }

  const [currentAction, setCurrentAction] = useState<AIAction>(getActionFromToolId(activeTool.id));

  useEffect(() => {
    setCurrentAction(getActionFromToolId(activeTool.id));
    setResult('');
    setQuestion('');
    setError('');
  }, [activeTool]);

  const handleAction = useCallback(async (action: AIAction) => {
    if (!text) {
      setError('PDF text not available.');
      return;
    }
    if (action === AIAction.ASK && !question) {
        setError('Please enter a question.');
        return;
    }

    setIsLoading(true);
    setResult('');
    setError('');

    try {
      let response = '';
      switch (action) {
        case AIAction.SUMMARIZE:
          response = await summarizeText(text);
          break;
        case AIAction.ASK:
          response = await askQuestion(text, question);
          break;
        case AIAction.EXTRACT_POINTS:
          response = await extractKeyPoints(text);
          break;
      }
      setResult(response);
    } catch (e) {
      setError('An error occurred while communicating with the AI. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [text, question]);
  
  const renderContent = () => {
    if (isTextLoading) {
      return <div className="text-center p-8">Extracting text from PDF...</div>;
    }
    if (textError) {
      return <div className="text-center p-8 text-red-500">Error extracting text: {textError}</div>;
    }

    return (
        <div className="space-y-4">
            {currentAction === AIAction.ASK && (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about the PDF..."
                className="flex-grow p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-accent"
                disabled={isLoading}
              />
              <button
                onClick={() => handleAction(AIAction.ASK)}
                disabled={isLoading || !question}
                className="px-4 py-2 bg-accent text-accent-foreground font-semibold rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Asking...' : 'Ask'}
              </button>
            </div>
            )}
            
            {currentAction !== AIAction.ASK && (
                 <button
                 onClick={() => handleAction(currentAction)}
                 disabled={isLoading}
                 className="w-full px-4 py-2 bg-accent text-accent-foreground font-semibold rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
               >
                 {isLoading ? 'Generating...' : `Generate ${activeTool.name}`}
               </button>
            )}

            {error && <div className="text-red-500 p-2 rounded-md bg-red-100 dark:bg-red-900/20">{error}</div>}

            {isLoading && (
              <div className="text-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
                <p className="mt-2">AI is thinking...</p>
              </div>
            )}

            {result && (
              <div className="p-4 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Result</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{result}</div>
              </div>
            )}
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{activeTool.name}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{activeTool.description}</p>
      <div className="bg-secondary dark:bg-primary p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800">
        {renderContent()}
      </div>
    </div>
  );
};
