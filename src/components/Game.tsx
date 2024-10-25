import { FC, useState } from "react";
import { initCards } from "../utils/initCards";

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

const Game: FC = () => {
    const [cards, setCards] = useState<Card[]>(initCards());
    const [player, setPlayer] = useState<Player>({ name: 'Player', hand: [] });
    const [computer, setComputer] = useState<Player>({ name: 'Computer', hand: [] });

    return (
        <div>

        </div>
    )
}

export default Game;