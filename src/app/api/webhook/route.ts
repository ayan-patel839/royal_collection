import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-08-26.dahlia' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
 // 1. Extract raw body and Stripe signature from headers
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  try {
   // 2. Verify webhook signature and construct event
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // 3. Payment Success ka Confirmation
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId; 

      // 4. Database mein Order "Paid" mark karna
      await connectDB();
      await Order.findByIdAndUpdate(orderId, { 
        status: 'Paid', 
        paymentId: session.id 
      });
    }

    // 5. Send "Ok" message to Stripe
    return NextResponse.json({ received: true });

  } catch (err: any) {
    // Handle signature verification failure or processing errors
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
}