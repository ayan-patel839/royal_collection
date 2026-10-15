"use server";

import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

// Stripe engine start kar rahe hain
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2026-08-26.dahlia", // Webhook version se match karna zaroori hai
});

export async function createCheckoutSession(cartItems: any[]) {
    try {
        // 1. Connect TO DATABASE
        await connectDB();

        // 2. Initialize a pending order record in the database
        const newOrder = await Order.create({
            status: 'Pending',
            // Note: Aage chal kar hum yahan user ki email aur total amount bhi save karenge
        });

        // 3. Set items in stripe Fromat
        const stripeLineItems = cartItems.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // ₹ ko inr  mein convert karna 
            },
            quantity: 1,
        }));

        // 4. Create Stripe Checkout session with embedded Order ID metadata for webhook fulfillment
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "upi"],
            mode: "payment",
            line_items: stripeLineItems,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
            metadata: {
                orderId: newOrder._id.toString(), // Attach database order ID to Stripe session metadata
            }
        });

        return { url: session.url };

    } catch (error: any) {
        console.log("Stripe Checkout Error:", error);
        return { error: "Payment page load nahi hua bhai" };
    }
}