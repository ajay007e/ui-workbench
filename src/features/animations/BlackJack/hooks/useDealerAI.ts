import { calculateHandValue } from "../utils/game";
import type { Card } from "../utils/deck";

type Params = {
    active: boolean;
    dealerHand: Card[];
    deck: Card[];
    playerHand: Card[];
    onUpdateDealer: (hand: Card[]) => void;
    onUpdateDeck: (deck: Card[]) => void;
    onFinish: (resultText: string) => void;
};

export function useDealerAI({
    active,
    dealerHand,
    deck,
    playerHand,
    onUpdateDealer,
    onUpdateDeck,
    onFinish,
}: Params) {
    if (!active) return;

    const workingDeck = [...deck];
    const currentHand = [...dealerHand];

    const play = () => {
        if (calculateHandValue(currentHand) < 17) {
            const card = workingDeck.shift();
            if (!card) return;

            currentHand.push(card);
            onUpdateDealer([...currentHand]);
            onUpdateDeck([...workingDeck]);

            setTimeout(play, 700);
        } else {
            const player = calculateHandValue(playerHand);
            const dealer = calculateHandValue(currentHand);

            if (dealer > 21) onFinish("Dealer Busts! You Win 🎉");
            else if (dealer > player) onFinish("Dealer Wins");
            else if (dealer < player) onFinish("You Win 🎉");
            else onFinish("Push 🤝");
        }
    };

    setTimeout(play, 700);
}
