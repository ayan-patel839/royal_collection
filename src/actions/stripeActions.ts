"use server";

import Stripe from "stripe";

// Stripe engine start kar rahe hain
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createCheckoutSession(cartItems: any[]) {
    try {
        const stripeLineItems = cartItems.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // ₹ ko paise mein convert karna 
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card" , "upi"] ,
            mode: "payment",
            line_items: stripeLineItems,
            success_url: `http://localhost:3000/?success=true`,
            cancel_url: `http://localhost:3000/?canceled=true`,
        });

        return { url: session.url };

    } catch (error) {
        console.log("Stripe Checkout Error:", error);
        return { error: "Payment page load nahi hua bhai" };
    }
}