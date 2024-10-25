import { FC } from "react";
import Heart from "../icon/Heart";
import Diamond from "../icon/Diamond";
import Club from "../icon/Club";
import Spade from "../icon/Spade";

type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';

interface Card {
    suit: Suit;
    rank: Rank;
}

interface CardProps {
    card: Card;
    index: number;
}

const ShowCard: FC<CardProps> = ({ card, index }) => {
    const getColor = (type: Suit) => {
        switch (type) {
            case 'Hearts':
                return 'red-600';
            case 'Diamonds':
                return 'red-600';
            case 'Clubs':
                return 'black';
            case 'Spades':
                return 'black';
        }
    }
    return (
        <div key={index} className="bg-white border border-red-600 border-2 rounded-md p-2 m-2 w-44 flex justify-around items-center">
            <p className={"text-2xl font-bold text-" + getColor(card.suit)}>{card.rank}</p>
            {card.suit === 'Hearts' && <Heart />}
            {card.suit === 'Diamonds' && <Diamond />}
            {card.suit === 'Clubs' && <Club />}
            {card.suit === 'Spades' && <Spade />}
        </div>
    )
}

export default ShowCard;