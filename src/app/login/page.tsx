"use client"; // Error state dikhane ke liye isey client component banana hoga

import { useActionState } from "react";
import { loginUser } from "@/actions/loginAction"; // Apna sahi path check kar lijiyega

export default function LoginPage() {
  // state mein wo aayega jo aap backend se return karenge (jaise { error: "..." })
  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-zinc-800">

        <div className="flex justify-center mb-6">
          <span className="text-4xl">👑</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-4 uppercase tracking-tight">Admin Access</h1>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
          'Royal Collection' control panel mein swagat hai.
        </p>

        <form action={formAction} className="flex flex-col gap-5 text-left">
          <div>
            <label className="block text-zinc-400 text-sm font-bold mb-2" htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="admin@royal.com"
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Backend se aane wala Error yahan dikhega */}
          {state?.error && (
            <p className="text-red-500 text-sm font-semibold">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50"
          >
            {isPending ? "Verifying..." : "Secure Login 🔒"}
          </button>
        </form>

      </div>
    </div>
  );
}