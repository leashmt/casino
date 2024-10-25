import { FC, useEffect, useState } from "react";
import { initCards, rankOrder } from "../utils/initCards";
import HandPlayer from "./HandPlayer";
import CardBlockButton from "./buttons/BlockCard";
import ChangeCardsButton from "./buttons/ChangeCards";
import { useCheckWinner } from "../hooks/useCheckWinner";
import { useDistribution } from "../hooks/useDistribution";
import { useChangeCards } from "../hooks/useChangeCards";

type Suit = 'Coeur' | 'Carreau' | 'Trefle' | 'Pique';
type Rank = '7' | '8' | '9' | '10' | 'Valet' | 'Dame' | 'Roi' | 'As';
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
    const { checkWinner } = useCheckWinner({
        playerHand,
        computerHand,
        typeCombinaison,
        rankOrder,
        setMessage,
        setStatusGame,
    });
    const { distribution } = useDistribution({
        cardsDeck,
        playerHand,
        computerHand,
        setCardsDeck,
        setPlayerHand,
        setComputerHand,
        setStatusGame,
        NB_CARDS_ON_HAND,
    });
    const { changeCards } = useChangeCards({
        cardsDeck,
        playerHand,
        setCardsDeck,
        setPlayerHand,
        cptChangesCards,
        MAX_CPT_CHANGES_CARDS,
        setCptChangesCards,
    });

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

    const blockCard = (index: number) => {
        setPlayerHand(playerHand.map((card, i) => {
            if (i === index) {
                const actualState = card.isBlocked;
                return { ...card, isBlocked: !actualState };
            }
            return card;
        }));
    }

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