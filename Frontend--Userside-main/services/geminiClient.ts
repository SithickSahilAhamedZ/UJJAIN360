import { GoogleGenAI } from "@google/genai";

// Use import.meta.env for Vite environment variables
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || 'demo-key';

if (!API_KEY || API_KEY === 'your-gemini-api-key-here') {
  console.warn("NOTICE: Using demo mode. Set VITE_GEMINI_API_KEY in .env for full AI functionality.");
}

// Create a single, shared instance of the GoogleGenAI client to be used across the app.
export const ai = new GoogleGenAI({ apiKey: API_KEY });
