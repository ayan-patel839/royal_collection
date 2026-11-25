"use server";

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { generateEmbedding } from "@/lib/embeddings";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const AIResponseSchema = z.object({
  reply: z.string(),
  recommendedProducts: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      reason: z.string(),
    })
  ),
});

type SearchProduct = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

// Reciprocal Rank Fusion (RRF) Algorithm
function reciprocalRankFusion(
  vectorResults: SearchProduct[],
  keywordResults: SearchProduct[],
  k = 60
): SearchProduct[] {
  const scores = new Map<string, { product: SearchProduct; score: number }>();

  const addScores = (list: SearchProduct[]) => {
    list.forEach((product, index) => {
      const id = product._id.toString();
      const rank = index + 1;
      const rrfScore = 1 / (k + rank);

      const existing = scores.get(id);
      if (existing) {
        existing.score += rrfScore;
      } else {
        scores.set(id, { product, score: rrfScore });
      }
    });
  };

  addScores(vectorResults);
  addScores(keywordResults);

  return Array.from(scores.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.product);
}

export async function askRoyalAssistant(userQuery: string) {
  try {
    await connectDB();

    const queryVector = await generateEmbedding(userQuery);

    // Parallel Execution: Vector Search + Keyword Search ek sath
    const [vectorResults, keywordResults] = await Promise.all([
      Product.aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: queryVector,
            numCandidates: 20,
            limit: 5,
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            image: 1,
          },
        },
      ]),
      Product.aggregate([
        {
          $search: {
            index: "keyword_index",
            text: {
              query: userQuery,
              path: ["name", "description", "category"],
              fuzzy: { maxEdits: 1 }, 
            },
          },
        },
        { $limit: 5 },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            image: 1,
          },
        },
      ]),
    ]);

    // RRF se dono lists ko merge aur rerank karke Top 3 nikalna
    const topProducts = reciprocalRankFusion(vectorResults, keywordResults);

    const context = topProducts
      .map((p) => `- ${p.name} (Price: ₹${p.price})`)
      .join("\n");

    const prompt = `
You are the Royal Collection AI Shopping Assistant.
Answer the user's query ONLY using the available products below. Do not invent products or prices.

Available Products:
${context}

User Query: "${userQuery}"

Return strictly a JSON object with this exact structure:
{
  "reply": "Short, friendly response in Hinglish or English matching the user",
  "recommendedProducts": [
    { "name": "Product Name", "price": 1000, "reason": "Why it matches" }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawText = response.text;
    if (!rawText) throw new Error("Gemini se empty response aaya");

    const parsedData = JSON.parse(rawText);
    const validated = AIResponseSchema.safeParse(parsedData);

    if (!validated.success) {
      throw new Error("AI output Zod validation fail ho gaya");
    }

    return { success: true, data: validated.data };
  } catch (error) {
    console.error("Hybrid RAG Error:", error);
    return { success: false, error: "Assistant abhi respond nahi kar pa raha." };
  }
}