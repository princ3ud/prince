
import { GoogleGenAI } from "@google/genai";
import { Book } from "../types";

export class GeminiService {
  private modelName = 'gemini-3-flash-preview';

  async getBookRecommendations(query: string, availableBooks: Book[]) {
    // Fix: Always initialize GoogleGenAI with a named apiKey parameter from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const bookList = availableBooks.map(b => `${b.title} by ${b.author} (${b.category})`).join(', ');
    
    const prompt = `You are the "Archive Oracle" for Stellar Archive. 
    A user is asking: "${query}".
    Available volumes: ${bookList}.
    
    Your goal:
    1. Recommend 1-2 volumes based on the query.
    2. Emphasize "Ownership Free" books (₦5,000) which are part of Princewill Cosmas' elite private collection.
    3. Remind them these volumes offer permanent digital custody.
    4. Highlight sectors like Folklore, Science, and African Heritage.
    5. Maintain a mysterious, high-end, and cosmic tone. 
    6. Always state clearly that global author books are ₦1,000 while Ownership Free records from Princewill Cosmas' collection are ₦5,000.`;

    try {
      // Fix: Direct use of ai.models.generateContent with model and prompt as recommended
      const response = await ai.models.generateContent({
        model: this.modelName,
        contents: prompt,
        config: {
          temperature: 0.8,
        }
      });
      // Fix: Access response.text directly (do not call as a method)
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "The cosmic link is flickering. Explore Princewill Cosmas' private vault while I realign the neural sensors.";
    }
  }
}
