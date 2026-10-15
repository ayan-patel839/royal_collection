"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function getStoreAnalytics() {
    try {
        await connectDB();

        // The Advanced MERN Aggregation Pipeline 🔥
        const stats = await Product.aggregate([
            {
                $group: {
                    _id: null, // All products in one group 
                    totalItems: { $sum: 1 }, // Total count 
                    averagePrice: { $avg: "$price" }, // average price
                    maximumPrice: { $max: "$price" }, // expensive item
                    totalInventoryValue: { $sum: "$price" } // Total Amount of store 
                }
            }
        ]);

        // If databse is empty we send 0 as default
        return stats[0] || { totalItems: 0, averagePrice: 0, maximumPrice: 0, totalInventoryValue: 0 };

    } catch (error) {
        console.error("Aggregation Error:", error);
        throw new Error("Analytics load nahi huye bhai!");
    }
}