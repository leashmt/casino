type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';

interface Card {
    suit: Suit;
    rank: Rank;
}

interface Player {
    name: string;
    hand: Card[];
}

export const drawCard = (cards: Card[], playerHand: Card[]): { cards: Card[], playerHand: Card[] } => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];
    cards.splice(randomIndex, 1);
    playerHand.push(card);
    return {
        cards, playerHand
    };
};
