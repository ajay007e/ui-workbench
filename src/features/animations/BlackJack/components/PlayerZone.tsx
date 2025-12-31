import CardComponent from "./Card";
import type { Card } from "../utils/deck";
import { calculateHandValue } from "../utils/game";

type Props = {
    playerHand: Card[];
    canPlay: boolean;
    onHit: () => void;
    onStand: () => void;
};

export default function PlayerZone({
    playerHand,
    canPlay,
    onHit,
    onStand,
}: Props) {
    const total = calculateHandValue(playerHand);

    return (
        <div className="player-zone">
            <p className="zone-label">Player</p>

            <p className="hand-total">Total: {total}</p>

            <div className="card-row">
                {playerHand.map((card, i) => (
                    <CardComponent key={i} card={card} />
                ))}
            </div>

            {canPlay && (
                <div className="controls">
                    <button className="action-btn" onClick={onHit}>
                        Hit
                    </button>
                    <button className="action-btn" onClick={onStand}>
                        Stand
                    </button>
                </div>
            )}
        </div>
    );
}
