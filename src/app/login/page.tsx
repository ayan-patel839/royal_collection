export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-zinc-900 p-10 rounded-[2rem] shadow-2xl text-center max-w-md w-full border border-zinc-800">
        
        <div className="flex justify-center mb-6">
          <span className="text-4xl">👑</span>
        </div>
        
        <h1 className="text-3xl font-extrabold text-white mb-4 uppercase tracking-tight">
          Admin Access
        </h1>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
          'Royal Collection' control panel mein swagat hai. Apna credentials enter kijiye.
        </p>

        {/* Future login form will go here, abhi ke liye placeholder */}
        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
            Login Module Setup Pending...
          </p>
        </div>

      </div>
    </div>
  );
}