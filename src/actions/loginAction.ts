'use server';

import { createSession } from '@/lib/auth';
import { redirect } from 'next/navigation'; // Yeh line add kijiye

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // Dummy DB check
  const isValidUser = email === "admin@royal.com" && password === "123456";

  if (!isValidUser) {
    return { error: "Email ya password galat hai!" };
  }

  // Agar credentials sahi hain toh naya session (ticket) banao
  await createSession("ADMIN_ID_123");

  // Success ke baad direct admin dashboard bhej do
  redirect("/admin");
}