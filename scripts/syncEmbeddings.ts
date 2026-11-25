import "dotenv/config"; // 1. Sabse pehle .env load karna zaroori hai
import { connectDB } from "../src/lib/db";
import Product from "../src/models/Product";
import { generateEmbedding } from "../src/lib/embeddings";

async function syncProductEmbeddings() {
    try {
        await connectDB();
        console.log("✅ MongoDB Connected");

        // 2. Saare products fetch karna
        const products = await Product.find({});
        console.log(`📦 Total ${products.length} products mile.`);

        // 3. Ek-ek karke sabka embedding generate aur save karna
        for (const product of products) {
            const textToEmbed = `Product Name: ${product.name}, Price: ₹${product.price}`;

            const vector = await generateEmbedding(textToEmbed);

            product.embedding = vector;
            await product.save();

            console.log(`✨ Embedded: ${product.name}`);
        }

        console.log("🚀 Saare products ke embeddings save ho gaye!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

syncProductEmbeddings();