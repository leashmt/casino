import { compareHands, findTwoPairs, getBestCard, repeatIn } from "../utils/function";

type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';

interface Card {
    suit: Suit;
    rank: Rank;
    isBlocked?: boolean;
}

interface UseCheckWinnerProps {
    playerHand: Card[];
    computerHand: Card[];
    typeCombinaison: string[];
    rankOrder: Rank[];
    setMessage: (message: string) => void;
    setStatusGame: (status: 'Init' | 'Playing' | 'Checking' | 'Win' | 'Lose' | 'Equitable') => void;
}

export const useCheckWinner = ({
    playerHand,
    computerHand,
    typeCombinaison,
    rankOrder,
    setMessage,
    setStatusGame,
}: UseCheckWinnerProps) => {

    const foundWinner = (resultPlayer: boolean, resultComputer: boolean, type: string) => {
        if (!resultPlayer && !resultComputer) {
            return undefined;
        }
        if (resultPlayer && !resultComputer) {
            setStatusGame("Win");
            setMessage("Avec : " + type);
            return true;
        }
        if (!resultPlayer && resultComputer) {
            setStatusGame("Lose");
            setMessage("Avec : " + type);
            return true;
        }
        return "not found";
    }

    const checkWinner = () => {
        for (let i = typeCombinaison.length - 1; i >= 0; i--) {
            const type = typeCombinaison[i];

            switch (type) {
                case 'Carré': {
                    const playerHasCarre = repeatIn(playerHand, 4);
                    const computerHasCarre = repeatIn(computerHand, 4);
                    const isFoundCarre = foundWinner(playerHasCarre, computerHasCarre, type);
                    if (isFoundCarre) return;
                    break;
                }

                case 'Brelan': {
                    const playerHasBrelan = repeatIn(playerHand, 3);
                    const computerHasBrelan = repeatIn(computerHand, 3);
                    const isFoundBrelan = foundWinner(playerHasBrelan, computerHasBrelan, type);
                    if (isFoundBrelan) return;
                    break;
                }

                case 'Double Paire': {
                    const playerHasDoublePair = findTwoPairs(playerHand);
                    const computerHasDoublePair = findTwoPairs(computerHand);
                    const isFoundDoublePair = foundWinner(playerHasDoublePair, computerHasDoublePair, type);
                    if (isFoundDoublePair) {
                        return;
                    } else if (isFoundDoublePair === "not found") {
                        const { winner, bestCard } = compareHands(playerHand, computerHand);
                        handleCompareResult(winner, type, bestCard ?? undefined);
                        return;
                    }
                    break;
                }

                case 'Paire': {
                    const playerHasPair = repeatIn(playerHand, 2);
                    const computerHasPair = repeatIn(computerHand, 2);
                    const isFoundPair = foundWinner(playerHasPair, computerHasPair, type);
                    if (isFoundPair && isFoundPair !== "not found") return;
                    if (isFoundPair === "not found") {
                        const { winner, bestCard } = compareHands(playerHand, computerHand);
                        handleCompareResult(winner, type, bestCard ?? undefined);
                        return;
                    }
                    break;
                }

                case 'Plus haute carte': {
                    const bestCardPlayer = getBestCard(playerHand)?.rank;
                    const bestCardComputer = getBestCard(computerHand)?.rank;
                    if (bestCardPlayer && bestCardComputer) {
                        if (rankOrder.indexOf(bestCardPlayer) > rankOrder.indexOf(bestCardComputer)) {
                            setStatusGame("Win");
                            setMessage(`La carte ${bestCardPlayer} a été la plus haute`);
                        } else if (rankOrder.indexOf(bestCardPlayer) < rankOrder.indexOf(bestCardComputer)) {
                            setStatusGame("Lose");
                            setMessage(`La carte ${bestCardComputer} a été la plus haute`);
                        } else {
                            setStatusGame("Equitable");
                            setMessage(`Vous avez tous les deux un ${bestCardPlayer}`);
                        }
                    }
                    break;
                }
            }
        }
    };

    const handleCompareResult = (winner: 'Player' | 'Computer' | 'None', type: string, bestCard?: Card) => {
        if (winner === 'Player') {
            setStatusGame("Win");
            setMessage(`${type} : ${bestCard?.rank}`);
        } else if (winner === 'Computer') {
            setStatusGame("Lose");
            setMessage(`${type} : ${bestCard?.rank}`);
        } else {
            setStatusGame("Equitable");
            setMessage(type);
        }
    };

    return {
        checkWinner,
    };
};