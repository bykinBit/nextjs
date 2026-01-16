export default function Loading() {
    return (
        <div className="py-8 px-8 max-w-2xl mx-auto">
            <div className="mb-6">
                <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-8">
                <div className="h-9 w-40 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mx-auto mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex border-b border-zinc-200 dark:border-zinc-700 pb-3">
                            <div className="w-24 h-5 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                            <div className="flex-1 h-5 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse ml-4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
