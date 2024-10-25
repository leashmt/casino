type Suit = 'Coeur' | 'Carreau' | 'Trefle' | 'Pique';
type Rank = '7' | '8' | '9' | '10' | 'Valet' | 'Dame' | 'Roi' | 'As';

interface Card {
    suit: Suit;
    rank: Rank;
    isBlocked?: boolean;
}

const deck: Card[] = [
    { suit: 'Coeur', rank: '7' }, { suit: 'Coeur', rank: '8' }, { suit: 'Coeur', rank: '9' }, { suit: 'Coeur', rank: '10' },
    { suit: 'Coeur', rank: 'Valet' }, { suit: 'Coeur', rank: 'Dame' }, { suit: 'Coeur', rank: 'Roi' }, { suit: 'Coeur', rank: 'As' },

    { suit: 'Carreau', rank: '7' }, { suit: 'Carreau', rank: '8' }, { suit: 'Carreau', rank: '9' }, { suit: 'Carreau', rank: '10' },
    { suit: 'Carreau', rank: 'Valet' }, { suit: 'Carreau', rank: 'Dame' }, { suit: 'Carreau', rank: 'Roi' }, { suit: 'Carreau', rank: 'As' },

    { suit: 'Trefle', rank: '7' }, { suit: 'Trefle', rank: '8' }, { suit: 'Trefle', rank: '9' }, { suit: 'Trefle', rank: '10' },
    { suit: 'Trefle', rank: 'Valet' }, { suit: 'Trefle', rank: 'Dame' }, { suit: 'Trefle', rank: 'Roi' }, { suit: 'Trefle', rank: 'As' },

    { suit: 'Pique', rank: '7' }, { suit: 'Pique', rank: '8' }, { suit: 'Pique', rank: '9' }, { suit: 'Pique', rank: '10' },
    { suit: 'Pique', rank: 'Valet' }, { suit: 'Pique', rank: 'Dame' }, { suit: 'Pique', rank: 'Roi' }, { suit: 'Pique', rank: 'As' },
];

export const initCards = (): Card[] => {
    return deck;
}


export const rankOrder: Rank[] = ['7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'As'];