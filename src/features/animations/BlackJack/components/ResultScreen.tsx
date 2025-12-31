type Props = {
    resultText: string;
    onRestart: () => void;
};

export default function ResultScreen({ resultText, onRestart }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
            <div className="w-[90%] max-w-md rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 text-center shadow-2xl animate-[scaleIn_0.3s_ease-out]">
                {/* Title */}
                <h2 className="mb-3 text-xl font-semibold tracking-wide text-white">
                    {resultText}
                </h2>

                {/* Subtext */}
                <p className="mb-8 text-sm leading-relaxed text-zinc-400">
                    Tap below to deal a new hand.
                </p>

                {/* Action */}
                <button
                    onClick={onRestart}
                    className="
            mx-auto block rounded-full
            bg-gradient-to-r from-red-500 to-rose-500
            px-8 py-3 text-sm font-semibold text-white
            transition-all duration-200
            hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(244,63,94,0.45)]
            active:translate-y-0 cursor-pointer
          "
                >
                    Deal Again
                </button>
            </div>
        </div>
    );
}
