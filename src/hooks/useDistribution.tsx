import { drawCard } from "../utils/function";

type Suit = 'Coeur' | 'Carreau' | 'Trefle' | 'Pique';
type Rank = '7' | '8' | '9' | '10' | 'Valet' | 'Dame' | 'Roi' | 'As';

interface Card {
    suit: Suit;
    rank: Rank;
    isBlocked?: boolean;
}
interface usedDistributionProps {
    cardsDeck: Card[];
    playerHand: Card[];
    computerHand: Card[];
    setCardsDeck: (cardsDeck: Card[]) => void;
    setPlayerHand: (playerHand: Card[]) => void;
    setComputerHand: (computerHand: Card[]) => void;
    setStatusGame: (status: 'Init' | 'Playing' | 'ChecRoi' | 'Win' | 'Lose' | 'Equitable') => void;
    NB_CARDS_ON_HAND: number;
}

export const useDistribution = ({
    cardsDeck,
    playerHand,
    computerHand,
    setCardsDeck,
    setPlayerHand,
    setComputerHand,
    setStatusGame,
    NB_CARDS_ON_HAND,
}: usedDistributionProps) => {
    const distribution = () => {
        let currentDeck = [...cardsDeck];
        let playerCards: Card[] = [...playerHand];
        let computerCards: Card[] = [...computerHand];

        for (let i = 0; i < NB_CARDS_ON_HAND; i++) {
            const resultPlayer = drawCard(currentDeck, playerCards);
            currentDeck = resultPlayer.cards;
            playerCards = resultPlayer.playerHand;

            const resultComputer = drawCard(currentDeck, computerCards);
            currentDeck = resultComputer.cards;
            computerCards = resultComputer.playerHand;
        }

        setCardsDeck(currentDeck);
        setPlayerHand(playerCards);
        setComputerHand(computerCards);
        setStatusGame("Playing");
    }

    return {
        distribution,
    };
}