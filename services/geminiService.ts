
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToBase64 = (file: File): Promise<{mimeType: string, data: string}> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const [meta, data] = reader.result.split(',');
        const mimeType = meta.split(':')[1].split(';')[0];
        resolve({ mimeType, data });
      } else {
        reject(new Error('Failed to read file as base64 string.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });

export const generateCaricature = async (imageFile: File, prompt: string): Promise<string> => {
  try {
    const { mimeType, data: base64ImageData } = await fileToBase64(imageFile);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: `Create a caricature of the person in the image. Style: ${prompt}`,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    let generatedImageBase64: string | null = null;
    let mime = 'image/png'; // Default MIME type

    if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                generatedImageBase64 = part.inlineData.data;
                mime = part.inlineData.mimeType || mime;
                break;
            }
        }
    }
    
    if (generatedImageBase64) {
      return `data:${mime};base64,${generatedImageBase64}`;
    } else {
      const textResponse = response.text?.trim();
      if(textResponse){
         throw new Error(`The model returned text instead of an image: "${textResponse}"`);
      }
      throw new Error('No image was generated. Please try a different prompt or image.');
    }
  } catch (error) {
    console.error("Error generating caricature:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate caricature: ${error.message}`);
    }
    throw new Error('An unknown error occurred during caricature generation.');
  }
};
