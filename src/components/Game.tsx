import { FC, useEffect, useState } from "react";
import { initCards, rankOrder } from "../utils/initCards";
import { compareHands, drawCard, findTwoPairs, getBestCard, pickNewCard, repeatIn } from "../utils/function";
import HandPlayer from "./HandPlayer";
import CardBlockButton from "./buttons/BlockCard";
import ChangeCardsButton from "./buttons/ChangeCards";

type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';
type Status = 'Init' | 'Playing' | 'Checking' | 'Win' | 'Lose' | 'Equitable';
interface Card {
    suit: Suit;
    rank: Rank;
    isBlocked?: boolean;
}

const NB_CARDS_ON_HAND = 4;
const MAX_CPT_CHANGES_CARDS = 3;
const typeCombinaison = ['Plus haute carte', 'Paire', 'Double Paire', 'Brelan', 'Carré'];

const Game: FC = () => {
    const [cardsDeck, setCardsDeck] = useState<Card[]>(initCards());
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [computerHand, setComputerHand] = useState<Card[]>([]);
    const [statusGame, setStatusGame] = useState<Status>("Init");
    const [message, setMessage] = useState<string>("");
    const [cptChangesCards, setCptChangesCards] = useState<number>(0);

    useEffect(() => {
        if (statusGame === "Init") {
            distribution()
        }
    }, [statusGame]);

    const newGame = () => {
        setCardsDeck(initCards());
        setPlayerHand([]);
        setComputerHand([]);
        setMessage("");
        setCptChangesCards(0);
        setStatusGame("Init");
    }

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
                case 'Carré':
                    const playerHasCarre = repeatIn(playerHand, 4)
                    const computerHasCarre = repeatIn(computerHand, 4)
                    const isFoundCarre = foundWinner(playerHasCarre, computerHasCarre, type);
                    if (isFoundCarre) {
                        return;
                    }

                    break;

                case 'Brelan':
                    const playerHasBrelan = repeatIn(playerHand, 3)
                    const computerHasBrelan = repeatIn(computerHand, 3)
                    const isFoundBrelan = foundWinner(playerHasBrelan, computerHasBrelan, type);
                    if (isFoundBrelan) {
                        return;
                    }
                    break;

                case 'Double Paire':
                    const playerHasDoublePair = findTwoPairs(playerHand);
                    const computerHasDoublePair = findTwoPairs(computerHand);
                    const isFoundDoublePair = foundWinner(playerHasDoublePair, computerHasDoublePair, type);

                    if (isFoundDoublePair) {
                        return
                    } else if (isFoundDoublePair === "not found") {
                        const { winner, bestCard } = compareHands(playerHand, computerHand);
                        if (winner === 'Player') {
                            setStatusGame("Win");
                            setMessage(typeCombinaison[i] + " : " + bestCard?.rank)
                            return;
                        }
                        if (winner === 'Computer') {
                            setStatusGame("Lose");
                            setMessage(typeCombinaison[i] + " : " + bestCard?.rank)
                            return;
                        }
                        if (winner === 'None') {
                            setStatusGame("Equitable");
                            setMessage(typeCombinaison[i])
                            return;
                        }
                    }
                    break;

                case 'Paire':
                    const playerHasPair = repeatIn(playerHand, 2)
                    const computerHasPair = repeatIn(computerHand, 2)
                    const isFoundPair = foundWinner(playerHasPair, computerHasPair, type);
                    if (isFoundPair && isFoundPair !== "not found") {
                        return;
                    } else if (isFoundPair === "not found") {
                        const { winner, bestCard } = compareHands(playerHand, computerHand);
                        if (winner === 'Player') {
                            setStatusGame("Win");
                            setMessage(type + " : " + bestCard?.rank)
                            return;
                        }
                        if (winner === 'Computer') {
                            setStatusGame("Lose");
                            setMessage(type + " : " + bestCard?.rank)
                            return;
                        }
                        if (winner === 'None') {
                            setStatusGame("Equitable");
                            setMessage(type)
                            return;
                        }
                    }
                    break;

                case 'Plus haute carte':
                    const bestCardPlayer = getBestCard(playerHand)?.rank;
                    const bestCardComputer = getBestCard(computerHand)?.rank;

                    if (bestCardPlayer && bestCardComputer && rankOrder.indexOf(bestCardPlayer) > rankOrder.indexOf(bestCardComputer)) {
                        setStatusGame("Win");
                        setMessage("La carte " + bestCardPlayer + " a été la plus haute");
                    } else if (bestCardPlayer && bestCardComputer && rankOrder.indexOf(bestCardPlayer) < rankOrder.indexOf(bestCardComputer)) {
                        setStatusGame("Lose");
                        setMessage("La carte " + bestCardComputer + " a été la plus haute");
                    } else {
                        setStatusGame("Equitable");
                        setMessage("Vous avez tous les deux un " + bestCardPlayer);
                    }
                    break;
            }
        }
    }

    const blockCard = (index: number) => {
        setPlayerHand(playerHand.map((card, i) => {
            if (i === index) {
                const actualState = card.isBlocked;
                return { ...card, isBlocked: !actualState };
            }
            return card;
        }));
    }

    const changeCards = () => {
        if (cptChangesCards >= MAX_CPT_CHANGES_CARDS) {
            return;
        }

        setCptChangesCards(prevCount => prevCount + 1);

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

    return (
        <div className="flex flex-col items-center justify-between h-5/6">
            <div>
                <h2 className="text-white text-xl font-semibold text-center">Ordinateur</h2>
                <HandPlayer cards={computerHand} />
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-md my-10">
                <div className="display-flex">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-md p-2 m-2 transition duration-200 ease-in-out shadow-lg" onClick={newGame}>
                        Nouvelle partie
                    </button>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold rounded-md p-2 m-2 transition duration-200 ease-in-out shadow-lg" onClick={checkWinner}>
                        Voir les résultats
                    </button>
                </div>
                {statusGame === "Win" && <h2 className="text-green-400 text-2xl font-semibold text-center mt-4">Vous avez gagné 😁</h2>}
                {statusGame === "Lose" && <h2 className="text-red-400 text-2xl font-semibold text-center mt-4">Vous avez perdu 😭</h2>}
                {statusGame === 'Equitable' && <h2 className="text-yellow-400 text-2xl font-semibold text-center mt-4">Égalité 😐</h2>}
                <p className="text-white text-xl font-semibold text-center mt-2">{message}</p>
            </div>
            <div>
                <h2 className="text-white text-xl font-semibold text-center">Joueur</h2>
                <HandPlayer cards={playerHand} />
                <div>
                    <CardBlockButton
                        isBlocked={playerHand && playerHand[0]?.isBlocked}
                        onClick={() => blockCard(0)}
                        cardIndex={0}
                    />
                    <CardBlockButton
                        isBlocked={playerHand && playerHand[1]?.isBlocked}
                        onClick={() => blockCard(1)}
                        cardIndex={1}
                    />
                    <CardBlockButton
                        isBlocked={playerHand && playerHand[2]?.isBlocked}
                        onClick={() => blockCard(2)}
                        cardIndex={2}
                    />
                    <CardBlockButton
                        isBlocked={playerHand && playerHand[3]?.isBlocked}
                        onClick={() => blockCard(3)}
                        cardIndex={3}
                    />
                </div>
                <ChangeCardsButton
                    onClick={changeCards}
                    remainingChanges={MAX_CPT_CHANGES_CARDS - cptChangesCards}
                />
            </div>
        </div >
    )
}

export default Game;