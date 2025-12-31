type Props = {
    target: "player" | "dealer";
};

export default function FlyingCard({ target }: Props) {
    return (
        <div
            className={`flying-card ${target === "player" ? "fly-to-player" : "fly-to-dealer"
                }`}
        />
    );
}
