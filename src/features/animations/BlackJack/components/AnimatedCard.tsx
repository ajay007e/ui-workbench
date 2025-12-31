type AnimatedCardProps = {
    target: "player" | "dealer";
    index: number;
};

export default function AnimatedCard({ target, index }: AnimatedCardProps) {
    return (
        <div
            className={`animated-card ${target === "player" ? "to-player" : "to-dealer"
                }`}
            style={{
                animationDelay: `${index * 0.3}s`,
            }}
        />
    );
}
