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

export const drawCard = (cards: Card[], player: Player): { cards: Card[], player: Player } => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];
    cards.splice(randomIndex, 1);
    player.hand.push(card);

    return { cards, player };
}