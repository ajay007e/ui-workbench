import { useEffect, useRef, useState } from "react";

import IntroScreen from "./components/IntroScreen";
import ResultScreen from "./components/ResultScreen";
import ShuffleDeck from "./components/ShuffleDeck";
import DealerZone from "./components/DealerZone";
import PlayerZone from "./components/PlayerZone";
import FlyingCard from "./components/FlyingCard";

import { createDeck, shuffleDeck } from "./utils/deck";
import type { Card } from "./utils/deck";
import { calculateHandValue, isBust, isBlackjack } from "./utils/game";

import "./styles/blackjack.css";

type GamePhase =
    | "intro"
    | "shuffling"
    | "dealing"
    | "playerTurn"
    | "dealerTurn"
    | "result";

export default function BlackJack() {
    const [gamePhase, setGamePhase] = useState<GamePhase>("intro");

    const [deck, setDeck] = useState<Card[]>([]);
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);
    const [hideDealerFirstCard, setHideDealerFirstCard] = useState(true);
    const [resultText, setResultText] = useState("");

    const [flyingCard, setFlyingCard] = useState<null | "player" | "dealer">(
        null,
    );

    const hasDealtRef = useRef(false);

    /* ============================
                 START GAME
              ============================ */
    const startGame = () => {
        setGamePhase("shuffling");
    };

    /* ============================
                 SHUFFLING
              ============================ */
    useEffect(() => {
        if (gamePhase !== "shuffling") return;

        setDeck(shuffleDeck(createDeck()));
        setPlayerHand([]);
        setDealerHand([]);
        setHideDealerFirstCard(true);
        setResultText("");
        hasDealtRef.current = false;

        const t = setTimeout(() => {
            setGamePhase("dealing");
        }, 1400);

        return () => clearTimeout(t);
    }, [gamePhase]);

    /* ============================
                 DEALING (WITH ANIMATION)
              ============================ */
    useEffect(() => {
        if (gamePhase !== "dealing") return;
        if (hasDealtRef.current) return;

        hasDealtRef.current = true;
        const workingDeck = [...deck];

        const deal = (to: "player" | "dealer", delay: number) => {
            setTimeout(() => {
                setFlyingCard(to);

                setTimeout(() => {
                    const card = workingDeck.shift();
                    if (!card) return;

                    to === "player"
                        ? setPlayerHand((p) => [...p, card])
                        : setDealerHand((d) => [...d, card]);

                    setFlyingCard(null);
                }, 600);
            }, delay);
        };

        deal("player", 0);
        deal("dealer", 300);
        deal("player", 600);
        deal("dealer", 900);

        setTimeout(() => {
            setDeck(workingDeck);

            const pBJ = isBlackjack(playerHand);
            const dBJ = isBlackjack(dealerHand);

            if (pBJ || dBJ) {
                setHideDealerFirstCard(false);
                if (pBJ && dBJ) setResultText("Push (Both Blackjack)");
                else if (pBJ) setResultText("Blackjack! You Win");
                else setResultText("Dealer Blackjack");

                setTimeout(() => {
                    setGamePhase("result");
                }, 2000);

                return;
            }

            setGamePhase("playerTurn");
        }, 1400);
    }, [gamePhase, deck]);

    /* ============================
                 PLAYER ACTIONS
              ============================ */
    const handleHit = () => {
        if (!deck.length) return;

        setFlyingCard("player");

        setTimeout(() => {
            const card = deck[0];
            const remaining = deck.slice(1);
            const newHand = [...playerHand, card];

            setPlayerHand(newHand);
            setDeck(remaining);
            setFlyingCard(null);

            if (isBust(newHand)) {
                setHideDealerFirstCard(false);
                setResultText("You Bust! Dealer Wins");

                setTimeout(() => {
                    setGamePhase("result");
                }, 2000);
            }
        }, 600);
    };

    const handleStand = () => {
        setHideDealerFirstCard(false);
        setGamePhase("dealerTurn");
    };

    /* ============================
                 DEALER AI
              ============================ */
    useEffect(() => {
        if (gamePhase !== "dealerTurn") return;

        const workingDeck = [...deck];
        const currentHand = [...dealerHand];

        const dealerPlay = () => {
            if (calculateHandValue(currentHand) < 17) {
                setFlyingCard("dealer");

                setTimeout(() => {
                    const card = workingDeck.shift();
                    if (!card) return;

                    currentHand.push(card);
                    setDealerHand([...currentHand]);
                    setDeck([...workingDeck]);
                    setFlyingCard(null);

                    setTimeout(dealerPlay, 700);
                }, 600);
            } else {
                const player = calculateHandValue(playerHand);
                const dealer = calculateHandValue(currentHand);

                if (dealer > 21) setResultText("Dealer Busts! You Win");
                else if (dealer > player) setResultText("Dealer Wins");
                else if (dealer < player) setResultText("You Win");
                else setResultText("Push");

                setTimeout(() => {
                    setGamePhase("result");
                }, 2000);
            }
        };

        setTimeout(dealerPlay, 700);
    }, [gamePhase]);

    return (
        <div className="blackjack-table">
            {gamePhase === "intro" && <IntroScreen onStart={startGame} />}

            <DealerZone dealerHand={dealerHand} hideFirstCard={hideDealerFirstCard} />

            <div className="deck-zone">
                {gamePhase === "shuffling" && <ShuffleDeck />}
            </div>

            <PlayerZone
                playerHand={playerHand}
                canPlay={gamePhase === "playerTurn"}
                onHit={handleHit}
                onStand={handleStand}
            />

            {flyingCard && <FlyingCard target={flyingCard} />}

            {gamePhase === "result" && (
                <ResultScreen resultText={resultText} onRestart={startGame} />
            )}
        </div>
    );
}
