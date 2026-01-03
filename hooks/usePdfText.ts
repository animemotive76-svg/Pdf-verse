
import { useState, useEffect } from 'react';

export const usePdfText = (file: File | null) => {
  const [text, setText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const extractText = async () => {
      if (!file) {
        setText(null);
        return;
      }
      // @ts-ignore
      if (!window.pdfjsLib) {
        setError("PDF.js library is not loaded.");
        return;
      }

      setIsLoading(true);
      setText(null);
      setError(null);

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
          // @ts-ignore
          const pdf = await window.pdfjsLib.getDocument({ data: typedArray }).promise;
          const numPages = pdf.numPages;
          let fullText = '';
          
          for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n\n';
          }
          
          setText(fullText);
        } catch (err: any) {
          setError(err.message || "Failed to extract text from PDF.");
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Failed to read the file.");
        setIsLoading(false);
      };

      reader.readAsArrayBuffer(file);
    };

    extractText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return { text, isLoading, error };
};
