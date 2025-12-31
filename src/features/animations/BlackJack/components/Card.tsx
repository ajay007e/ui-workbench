import type { Card as CardType } from "../utils/deck";
import "../styles/blackjack.css";

type Props = {
    card: CardType;
    hidden?: boolean;
};

export default function Card({ card, hidden }: Props) {
    const isRed = card.suit === "♥" || card.suit === "♦";

    return (
        <div className={`card ${hidden ? "card-hidden" : "card-revealed"}`}>
            <div className="card-inner">
                {/* Front */}
                <div className={`card-front ${isRed ? "card-red" : "card-black"}`}>
                    <span className="card-value">{card.value}</span>
                    <span className="card-suit">{card.suit}</span>
                </div>

                {/* Back */}
                <div className="card-back">♠</div>
            </div>
        </div>
    );
}
