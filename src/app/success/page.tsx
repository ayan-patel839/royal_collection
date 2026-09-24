import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      {/* Premium Dark Card */}
      <div className="bg-zinc-900 p-10 rounded-[2rem] shadow-2xl text-center max-w-md w-full border border-zinc-800">

        {/* The Stealth Glowing Tick */}
        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 bg-zinc-800/50 rounded-full flex items-center justify-center border border-zinc-700/50 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight uppercase">
          Order Confirmed
        </h1>
        <p className="text-zinc-400 mb-10 text-sm leading-relaxed">
          Mubarak ho! Aapka payment verify ho chuka hai aur 'Royal Collection' ka premium order lock ho gaya hai.
        </p>

        {/* Back to Home Button - High Contrast Apple Style */}
        <Link
          href="/"
          className="block w-full bg-white text-black px-6 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 active:scale-95"
        >
          Continue Shopping ➔
        </Link>
      </div>
    </div>
  );
}