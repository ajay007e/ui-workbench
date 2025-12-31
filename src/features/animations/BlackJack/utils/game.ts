import type { Card } from "./deck";

/**
 * Calculate total points for a hand
 * Handles Ace (11 → 1) logic automatically
 */
export function calculateHandValue(hand: Card[]): number {
    let total = 0;
    let aceCount = 0;

    for (const card of hand) {
        total += card.points;
        if (card.value === "A") aceCount++;
    }

    // Convert Aces from 11 to 1 if busted
    while (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount--;
    }

    return total;
}

/**
 * Check if hand is Blackjack (21 with 2 cards)
 */
export function isBlackjack(hand: Card[]): boolean {
    return hand.length === 2 && calculateHandValue(hand) === 21;
}

/**
 * Check if hand is busted (>21)
 */
export function isBust(hand: Card[]): boolean {
    return calculateHandValue(hand) > 21;
}
