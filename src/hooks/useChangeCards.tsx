import { pickNewCard } from "../utils/function";

type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';

interface Card {
    suit: Suit;
    rank: Rank;
    isBlocked?: boolean;
}

interface usedChangeCardsProps {
    cardsDeck: Card[];
    playerHand: Card[];
    setCardsDeck: (cardsDeck: Card[]) => void;
    setPlayerHand: (playerHand: Card[]) => void;
    cptChangesCards: number;
    MAX_CPT_CHANGES_CARDS: number;
    setCptChangesCards: (updateFn: (cptChangesCards: number) => number) => void;
}

export const useChangeCards = ({
    cardsDeck,
    playerHand,
    setCardsDeck,
    setPlayerHand,
    cptChangesCards,
    MAX_CPT_CHANGES_CARDS,
    setCptChangesCards
}: usedChangeCardsProps) => {
    const changeCards = () => {
        if (cptChangesCards >= MAX_CPT_CHANGES_CARDS) {
            return;
        }

        setCptChangesCards((prevCount: number) => prevCount + 1);

        let updatedDeck = [...cardsDeck];

        const newHand = playerHand.map((card) => {
            if (card.isBlocked) {
                return card;
            }

            const { newDeck, newCard } = pickNewCard(updatedDeck);

            updatedDeck = newDeck;

            return newCard;
        });

        setPlayerHand(newHand);
        setCardsDeck(updatedDeck);
    };

    return {
        changeCards,
    };
}
