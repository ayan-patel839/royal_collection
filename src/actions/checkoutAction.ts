// actions/checkoutAction.ts
'use server';
import { checkoutSchema } from '@/lib/checkoutSchema';

export async function submitCheckout(prevState: any, formData: FormData) {
  // 1. Form ke data ko object mein badalna
  const rawData = Object.fromEntries(formData);
  
  // 2. Zod bouncer se data check karwana (safeParse bina error ke check karta hai)
  const validatedData = checkoutSchema.safeParse(rawData);

  // 3. Agar data mein galti hai, toh errors wapas bhej do
  if (!validatedData.success) {
    return { errors: validatedData.error.flatten().fieldErrors };
  }

  // 4. Sab kuch sahi hai, ab yahan Database (MongoDB) ka code aayega
  console.log("Database ke liye ready data:", validatedData.data);
  return { success: true, message: "Order placed successfully!" };
}