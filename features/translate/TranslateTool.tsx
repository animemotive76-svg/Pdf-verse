
import React, { useState } from 'react';
import { usePdfText } from '../../hooks/usePdfText';
import { translateText } from '../../services/geminiService';
import { SwitchHorizontalIcon } from '../../components/icons/Icons';

interface TranslateToolProps {
  pdfFile: File | null;
}

type Language = 'English' | 'Hindi';

export const TranslateTool: React.FC<TranslateToolProps> = ({ pdfFile }) => {
  const { text, isLoading: isTextLoading, error: textError } = usePdfText(pdfFile);
  const [sourceLang, setSourceLang] = useState<Language>('English');
  const [targetLang, setTargetLang] = useState<Language>('Hindi');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!text) {
      setError('PDF text not available to translate.');
      return;
    }

    setIsLoading(true);
    setTranslatedText('');
    setError('');

    try {
      const response = await translateText(text, sourceLang, targetLang);
      setTranslatedText(response);
    } catch (e) {
      setError('An error occurred during translation. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Translate PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Translate text content between English and Hindi. Note: Layout and formatting may not be preserved in this preview.</p>
      
      <div className="bg-secondary dark:bg-primary p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium mb-1">From</label>
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value as Language)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

          <button onClick={handleSwapLanguages} className="p-2 mt-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <SwitchHorizontalIcon />
          </button>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium mb-1">To</label>
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value as Language)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleTranslate}
          disabled={isTextLoading || isLoading || !text}
          className="w-full px-4 py-2 bg-accent text-accent-foreground font-semibold rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isTextLoading ? 'Extracting Text...' : isLoading ? 'Translating...' : 'Translate'}
        </button>

        {error && <div className="text-red-500 mt-4 p-2 rounded-md bg-red-100 dark:bg-red-900/20">{error}</div>}
        {textError && <div className="text-red-500 mt-4 p-2 rounded-md bg-red-100 dark:bg-red-900/20">Error extracting text: {textError}</div>}

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div>
            <h3 className="font-semibold mb-2">Original Text</h3>
            <div className="h-64 overflow-y-auto p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 text-sm">
              {isTextLoading ? 'Loading...' : text || 'Upload a PDF to see the original text.'}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Translated Text</h3>
            <div className="h-64 overflow-y-auto p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 text-sm">
              {isLoading ? 'Translating...' : translatedText || 'Translation will appear here.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
