import { FC, useEffect, useState } from "react";
import { initCards } from "../utils/initCards";
import { drawCard } from "../utils/function";

type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';
type Status = 'Init' | 'Playing' | 'Win' | 'Lose';
interface Card {
    suit: Suit;
    rank: Rank;
}

const nbCardsOnHand = 4;

const Game: FC = () => {
    const [cardsDeck, setCardsDeck] = useState<Card[]>(initCards());
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [computerHand, setComputerHand] = useState<Card[]>([]);
    const [statusGame, setStatusGame] = useState<Status>("Init");

    useEffect(() => {
        if (statusGame === "Init") {
            let currentDeck = [...cardsDeck];
            let playerCards: Card[] = [...playerHand];
            let computerCards: Card[] = [...computerHand];

            for (let i = 0; i < nbCardsOnHand; i++) {
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
    }, [statusGame]);

    return (
        <div>

        </div>
    )
}

export default Game;