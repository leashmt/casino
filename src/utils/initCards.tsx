type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';

interface Card {
    suit: Suit;
    rank: Rank;
}

const deck: Card[] = [
    { suit: 'Hearts', rank: '7' }, { suit: 'Hearts', rank: '8' }, { suit: 'Hearts', rank: '9' }, { suit: 'Hearts', rank: '10' },
    { suit: 'Hearts', rank: 'Jack' }, { suit: 'Hearts', rank: 'Queen' }, { suit: 'Hearts', rank: 'King' }, { suit: 'Hearts', rank: 'Ace' },

    { suit: 'Diamonds', rank: '7' }, { suit: 'Diamonds', rank: '8' }, { suit: 'Diamonds', rank: '9' }, { suit: 'Diamonds', rank: '10' },
    { suit: 'Diamonds', rank: 'Jack' }, { suit: 'Diamonds', rank: 'Queen' }, { suit: 'Diamonds', rank: 'King' }, { suit: 'Diamonds', rank: 'Ace' },

    { suit: 'Clubs', rank: '7' }, { suit: 'Clubs', rank: '8' }, { suit: 'Clubs', rank: '9' }, { suit: 'Clubs', rank: '10' },
    { suit: 'Clubs', rank: 'Jack' }, { suit: 'Clubs', rank: 'Queen' }, { suit: 'Clubs', rank: 'King' }, { suit: 'Clubs', rank: 'Ace' },

    { suit: 'Spades', rank: '7' }, { suit: 'Spades', rank: '8' }, { suit: 'Spades', rank: '9' }, { suit: 'Spades', rank: '10' },
    { suit: 'Spades', rank: 'Jack' }, { suit: 'Spades', rank: 'Queen' }, { suit: 'Spades', rank: 'King' }, { suit: 'Spades', rank: 'Ace' },
];

export const initCards = (): Card[] => {
    return deck;
}


export const rankOrder: Rank[] = ['7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];