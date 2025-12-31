import CardComponent from "./Card";
import type { Card } from "../utils/deck";
import { calculateHandValue } from "../utils/game";

type Props = {
    dealerHand: Card[];
    hideFirstCard: boolean;
};

export default function DealerZone({ dealerHand, hideFirstCard }: Props) {
    const showTotal = !hideFirstCard;
    const total = calculateHandValue(dealerHand);

    return (
        <div className="dealer-zone">
            <p className="zone-label">Dealer</p>

            {showTotal && <p className="hand-total">Total: {total}</p>}

            <div className="card-row">
                {dealerHand.map((card, i) => (
                    <CardComponent
                        key={i}
                        card={card}
                        hidden={i === 0 && hideFirstCard}
                    />
                ))}
            </div>
        </div>
    );
}
