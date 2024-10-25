import { drawCard, findTwoPairs, repeatIn } from "./function";

type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';

interface Card {
    suit: Suit;
    rank: Rank;
    isBlocked?: boolean;
}

describe('drawCard', () => {
    it('should draw a card from the deck and add it to the player hand', () => {
        const cards: Card[] = [
            { suit: 'Hearts', rank: '7' },
            { suit: 'Diamonds', rank: '8' },
            { suit: 'Clubs', rank: '9' },
        ];
        const playerHand: Card[] = [];

        const result = drawCard(cards, playerHand);

        expect(result.cards.length).toBe(2);
        expect(playerHand.length).toBe(1);
        expect(cards).not.toContainEqual(result.playerHand[0]);
    });

    it('should not draw a card if the deck is empty', () => {
        const cards: Card[] = [];
        const playerHand: Card[] = [];

        const result = drawCard(cards, playerHand);

        expect(result.cards.length).toBe(0);
        expect(playerHand.length).toBe(0);
    });

    it('should correctly handle multiple draws', () => {
        const cards: Card[] = [
            { suit: 'Hearts', rank: '7' },
            { suit: 'Diamonds', rank: '8' },
            { suit: 'Clubs', rank: '9' },
        ];
        const playerHand: Card[] = [];

        drawCard(cards, playerHand);
        drawCard(cards, playerHand);
        const result = drawCard(cards, playerHand);

        expect(result.cards.length).toBe(0);
        expect(playerHand.length).toBe(3);
    });
});

describe('repeatIn', () => {
    it('should return true if nFactor is 1 and there is more than one card', () => {
        const cards: Card[] = [
            { suit: 'Hearts', rank: '7' },
            { suit: 'Diamonds', rank: '8' },
        ];
        expect(repeatIn(cards, 1)).toBe(true);
    });

    it('should return true if there is a rank with count greater than or equal to nFactor', () => {
        const cards: Card[] = [
            { suit: 'Hearts', rank: '7' },
            { suit: 'Diamonds', rank: '7' },
            { suit: 'Clubs', rank: '8' },
        ];
        expect(repeatIn(cards, 2)).toBe(true);
    });

    it('should return false if no rank meets the nFactor', () => {
        const cards: Card[] = [
            { suit: 'Hearts', rank: '7' },
            { suit: 'Diamonds', rank: '8' },
            { suit: 'Clubs', rank: '9' },
        ];
        expect(repeatIn(cards, 2)).toBe(false);
    });

    it('should return false for an empty array', () => {
        const cards: Card[] = [];
        expect(repeatIn(cards, 2)).toBe(false);
    });

    it('should return false if nFactor is greater than the number of cards', () => {
        const cards: Card[] = [
            { suit: 'Hearts', rank: '7' },
        ];
        expect(repeatIn(cards, 2)).toBe(false);
    });
});

describe('findTwoPairs', () => {
    it('should return false if there are no pairs', () => {
        const hand: Card[] = [
            { suit: 'Hearts', rank: '7' },
            { suit: 'Diamonds', rank: '8' },
            { suit: 'Clubs', rank: '9' },
        ];
        const result = findTwoPairs(hand);
        expect(result).toBe(false);
    });

    it('should return false if there is only one pair', () => {
        const hand: Card[] = [
            { suit: 'Hearts', rank: '7' },
            { suit: 'Diamonds', rank: '7' },
            { suit: 'Clubs', rank: '9' },
        ];
        const result = findTwoPairs(hand);
        expect(result).toBe(false);
    });

    it('should return true if there are exactly two pairs', () => {
        const hand: Card[] = [
            { suit: 'Hearts', rank: '7' },
            { suit: 'Diamonds', rank: '7' },
            { suit: 'Clubs', rank: '8' },
            { suit: 'Spades', rank: '8' },
        ];
        const result = findTwoPairs(hand);
        expect(result).toBe(true);
    });

    it('should return false if there are more than two pairs', () => {
        const hand: Card[] = [
            { suit: 'Hearts', rank: '7' },
            { suit: 'Diamonds', rank: '7' },
            { suit: 'Clubs', rank: '8' },
            { suit: 'Spades', rank: '8' },
            { suit: 'Hearts', rank: '9' },
            { suit: 'Diamonds', rank: '9' },
        ];
        const result = findTwoPairs(hand);
        expect(result).toBe(false);
    });
});