import { rankOrder } from "./initCards";

type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';

interface Card {
    suit: Suit;
    rank: Rank;
    isBlocked?: boolean;
}

interface PairResult {
    rank: Rank | null;
    kickers: Rank[];
}

export const drawCard = (cards: Card[], playerHand: Card[]): { cards: Card[], playerHand: Card[] } => {
    if (cards.length === 0) {
        return { cards: [], playerHand: [] };
    }
    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];
    cards.splice(randomIndex, 1);
    playerHand.push(card);
    return {
        cards, playerHand
    };
};

export const pickNewCard = (cards: Card[]): { newDeck: Card[], newCard: Card } => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const newCard = cards[randomIndex];
    const newDeck = [...cards.slice(0, randomIndex), ...cards.slice(randomIndex + 1)];

    return {
        newDeck, newCard
    };
}

export const repeatIn = (arr: Card[], nFactor: number) => {
    if (nFactor === 1 && arr.length > 1) {
        return true;
    }

    const rankMap = arr.reduce<Record<Rank, number>>((acc, card) => {
        acc[card.rank] = (acc[card.rank] || 0) + 1;
        return acc;
    }, {} as Record<Rank, number>);

    return Object.values(rankMap).some((count) => count >= nFactor);
};

export const getBestCard = (hand: Card[]): Card | null => {
    return hand.reduce<Card | null>((bestCard, currentCard) => {
        if (!bestCard) return currentCard;
        return rankOrder.indexOf(currentCard.rank) > rankOrder.indexOf(bestCard.rank) ? currentCard : bestCard;
    }, null);
};

const findPair = (hand: Card[]): PairResult => {
    const rankCount: Record<Rank, number> = {
        '7': 0, '8': 0, '9': 0, '10': 0, 'Jack': 0, 'Queen': 0, 'King': 0, 'Ace': 0,
    };

    hand.forEach(card => {
        rankCount[card.rank]++;
    });

    const pairs: Rank[] = [];
    const kickers: Rank[] = [];

    for (const rank in rankCount) {
        const typedRank = rank as Rank;
        if (rankCount[typedRank] === 2) {
            pairs.push(typedRank);
        } else if (rankCount[typedRank] > 0) {
            kickers.push(typedRank);
        }
    }

    pairs.sort((a, b) => rankOrder.indexOf(b) - rankOrder.indexOf(a));
    kickers.sort((a, b) => rankOrder.indexOf(b) - rankOrder.indexOf(a));

    return {
        rank: pairs[0] || null,
        kickers: kickers.slice(0, 3),
    };
};

// when both have a pair, the player with the higher pair wins
export const compareHands = (playerHand: Card[], computerHand: Card[]): { winner: 'Player' | 'Computer' | 'None', bestCard: Card | null } => {
    const playerBestCard = getBestCard(playerHand);
    const computerBestCard = getBestCard(computerHand);

    if (!playerBestCard || !computerBestCard) {
        return { winner: 'None', bestCard: null };
    }

    if (rankOrder.indexOf(playerBestCard.rank) > rankOrder.indexOf(computerBestCard.rank)) {
        return { winner: 'Player', bestCard: playerBestCard };
    } else if (rankOrder.indexOf(playerBestCard.rank) < rankOrder.indexOf(computerBestCard.rank)) {
        return { winner: 'Computer', bestCard: computerBestCard };
    } else {
        const playerPair = findPair(playerHand);
        const computerPair = findPair(computerHand);

        if (playerPair && computerPair) {
            if (playerPair.rank && computerPair.rank) {
                if (rankOrder.indexOf(playerPair.rank) > rankOrder.indexOf(computerPair.rank)) {
                    return { winner: 'Player', bestCard: playerBestCard };
                } else {
                    return { winner: 'Computer', bestCard: computerBestCard };
                }
            }
        }
    }

    return { winner: 'None', bestCard: null };
};

export const findTwoPairs = (hand: Card[]): boolean => {
    const rankCount = hand.reduce<Record<string, number>>((acc, card) => {
        acc[card.rank] = (acc[card.rank] || 0) + 1;
        return acc;
    }, {});

    let pairsCount = 0;

    for (const count of Object.values(rankCount)) {
        if (count === 2) {
            pairsCount++;
        }
    }

    return pairsCount === 2;
};