import { GoogleGenAI } from "@google/genai";

// 1. Gemini client initialize karna
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 2. Reusable async function jo string lega aur numbers ka array return karega
export async function generateEmbedding(text: string): Promise<number[]> {

    // 3. Gemini ke embedding model ko call karna
    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: text,
        config: {
            outputDimensionality: 768,
        }
    });

    // 4. Safety check: agar API se values nahi aayi toh error throw karo
    const values = response.embeddings?.[0]?.values;
    if (!values) {
        throw new Error("Embedding generate nahi hui");
    }

    // 5. Pure 768 numbers ka array return karna
    return values;
}