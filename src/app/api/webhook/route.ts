import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-08-26.dahlia' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  // 1. Raw Data aur Stamp (Signature) pakadna
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  try {
    // 2. Stripe ka Bouncer (Security Check)  "Kaccha Maal"
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

    // 5. Stripe ko "OK" message bhejna
    return NextResponse.json({ received: true });

  } catch (err: any) {
    // Agar Hacker ne fake request bheji toh error
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
}