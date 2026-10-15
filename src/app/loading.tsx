import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    // Maintain dark theme styling during loading state to prevent flash of unstyled content (FOUC)
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12 bg-black">

      <div className="w-full max-w-6xl mt-8">
        {/* Text ko white aur premium uppercase style diya hai */}
        <h2 className="text-xl md:text-2xl font-extrabold text-white mb-12 tracking-widest uppercase text-center">
          Loading Royal Collection <span className="animate-pulse text-zinc-500">...</span>
        </h2>

        {/* Mirror the main product grid layout to prevent layout shift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {/* Skeleton cards render honge */}
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>

    </main>
  );
}