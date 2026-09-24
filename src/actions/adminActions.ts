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
                    _id: null, // Sabhi products ko ek group mein daal rahe hain
                    totalItems: { $sum: 1 }, // Total count nikalega
                    averagePrice: { $avg: "$price" }, // Sabka average price
                    maximumPrice: { $max: "$price" }, // Sabse mehenga item
                    totalInventoryValue: { $sum: "$price" } // Poore store ka total amount
                }
            }
        ]);

        // Agar database khali hai toh default 0 bhejenge
        return stats[0] || { totalItems: 0, averagePrice: 0, maximumPrice: 0, totalInventoryValue: 0 };

    } catch (error) {
        console.error("Aggregation Error:", error);
        throw new Error("Analytics load nahi huye bhai!");
    }
}