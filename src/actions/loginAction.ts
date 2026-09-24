'use server';
import { createSession } from '@/lib/auth';

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // Dummy DB check (Baad mein isey MongoDB se replace karenge)
  const isValidUser = email === "admin@royal.com" && password === "123456"; 

  if (!isValidUser) {
    return { error: "Email ya password galat hai!" };
  }

  // Agar credentials sahi hain toh naya session (ticket) banao
  await createSession("ADMIN_ID_123");

  return { success: true };
}