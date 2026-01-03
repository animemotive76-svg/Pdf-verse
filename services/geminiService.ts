
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Please set it to use Gemini API.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const textModel = 'gemini-3-flash-preview';

const callGemini = async (prompt: string) => {
  if (!API_KEY) {
    // Return a mock response if API key is not available
    return `This is a mock response because the API key is not configured. Your prompt was: "${prompt.substring(0, 100)}..."`;
  }
  try {
    const response = await ai.models.generateContent({
        model: textModel,
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI model.");
  }
};

export const summarizeText = async (text: string): Promise<string> => {
  const prompt = `Please provide a concise summary of the following document text:\n\n---\n\n${text}`;
  return callGemini(prompt);
};

export const askQuestion = async (context: string, question: string): Promise<string> => {
  const prompt = `Based on the following document text, please answer the question.\n\nDocument Text:\n---\n${context}\n---\n\nQuestion: ${question}\n\nAnswer:`;
  return callGemini(prompt);
};

export const extractKeyPoints = async (text: string): Promise<string> => {
  const prompt = `Extract the key points from the following document text. Present them as a bulleted list:\n\n---\n\n${text}`;
  return callGemini(prompt);
};

export const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
  const prompt = `Translate the following text from ${sourceLang} to ${targetLang}. Preserve the meaning and tone as much as possible.\n\n---\n\n${text}`;
  return callGemini(prompt);
};
