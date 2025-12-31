type Props = {
    onStart: () => void;
};
function IntroScreen({ onStart }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
            <div className="w-[90%] max-w-md rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 text-center shadow-2xl animate-[scaleIn_0.4s_ease-out]">
                <h1 className="mb-3 text-3xl font-bold tracking-widest text-white">
                    ♠ BLACKJACK ♠
                </h1>

                <p className="mb-8 text-sm leading-relaxed text-zinc-400">
                    Beat the dealer. Get as close to 21 as possible without busting.
                </p>

                <button
                    onClick={onStart}
                    className="
            mx-auto block rounded-full 
            bg-gradient-to-r from-red-500 to-rose-500 cursor-pointer 
            px-8 py-3 text-sm font-semibold text-white
            transition-all duration-200
            hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(244,63,94,0.5)]
            active:translate-y-0
          "
                >
                    Start Game
                </button>

                <p className="mt-6 text-xs text-zinc-500">
                    Dealer stands on 17 • Classic rules
                </p>
            </div>
        </div>
    );
}

export default IntroScreen;
