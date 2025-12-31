export default function ShuffleDeck() {
    return (
        <div className="flex flex-col items-center gap-6">
            {/* Deck Stack */}
            <div className="relative h-32 w-24 shuffle-animation">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-lg border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-xl"
                        style={{
                            transform: `translate(${i * 2}px, ${-i * 2}px)`,
                            zIndex: i,
                        }}
                    />
                ))}
            </div>

            <p className="text-xs uppercase tracking-widest text-zinc-300">
                Shuffling cards...
            </p>
        </div>
    );
}
