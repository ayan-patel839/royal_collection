// actions/checkoutAction.ts
'use server';
import { checkoutSchema } from '@/lib/checkoutSchema';

export async function submitCheckout(prevState: any, formData: FormData) {
  
  const rawData = Object.fromEntries(formData);
  
  const validatedData = checkoutSchema.safeParse(rawData);

  if (!validatedData.success) {
    return { errors: validatedData.error.flatten().fieldErrors };
  }

  
  console.log("Database ke liye ready data:", validatedData.data);
  return { success: true, message: "Order placed successfully!" };
}