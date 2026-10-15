// components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (

    <div className="bg-zinc-900 p-6 rounded-3xl shadow-2xl border border-zinc-800 flex flex-col justify-between animate-pulse">

      <div>
      {/*  Image placeholder - fixed height to prevent cumulative layout shift (CLS) */}
        <div className="w-full h-64 bg-zinc-800/70 rounded-2xl mb-6"></div>

        {/*  Title placeholders - simulating multi-line text blocks */}
        <div className="h-5 bg-zinc-800/70 rounded-md w-3/4 mb-3"></div>
        <div className="h-5 bg-zinc-800/70 rounded-md w-1/2"></div>
      </div>

      <div className="mt-6">
        {/* Price ka placeholder */}
        <div className="h-8 bg-zinc-800/70 rounded-md w-1/3 mb-5"></div>

       {/* Call-to-action button placeholder - pill shape for modern UI aesthetics */}
        <div className="h-12 w-full bg-zinc-800/70 rounded-full mt-2"></div>
      </div>

    </div>
  );
}