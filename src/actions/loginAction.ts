'use server';

import { createSession } from '@/lib/auth';
import { redirect } from 'next/navigation'; // Add this

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // Validate credentials against database (mock implementation)
  const isValidUser = email === "admin@royal.com" && password === "123456";

  if (!isValidUser) {
    return { error: "Email ya password galat hai!" };
  }

  // If credentials are true then create new session 
  await createSession("ADMIN_ID_123");

  // Redirect authenticated user to the secure admin dashboard
  redirect("/admin");
}