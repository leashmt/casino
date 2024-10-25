import { FC, useEffect, useState } from "react";
import Heart from "../icon/Heart";
import Diamond from "../icon/Diamond";
import Club from "../icon/Club";
import Spade from "../icon/Spade";

type Suit = 'Coeur' | 'Carreau' | 'Trefle' | 'Pique';
type Rank = '7' | '8' | '9' | '10' | 'Valet' | 'Dame' | 'Roi' | 'As';

interface Card {
    suit: Suit;
    rank: Rank;
    isBlocked?: boolean;
}

interface CardProps {
    card: Card;
    index: number;
}

const ShowCard: FC<CardProps> = ({ card, index }) => {
    const [isFlipped, setIsFlipped] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFlipped(false);
        }, index * 1000);

        return () => clearTimeout(timer);
    }, []);

    const getColor = (type: Suit) => {
        switch (type) {
            case 'Coeur':
                return 'red-600';
            case 'Carreau':
                return 'red-600';
            case 'Trefle':
                return 'black';
            case 'Pique':
                return 'black';
        }
    }

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="relative m-2 w-44 h-24" onClick={toggleFlip}>
            <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
                {/* Front of the card */}
                <div className={"card-front border border-red-600 border-2 rounded-md p-2 flex justify-around items-center " + (card.isBlocked ? "bg-gray-400" : "bg-white")}>
                    <p className={"text-2xl font-bold text-" + getColor(card.suit)}>{card.rank}</p>
                    {card.suit === 'Coeur' && <Heart />}
                    {card.suit === 'Carreau' && <Diamond />}
                    {card.suit === 'Trefle' && <Club />}
                    {card.suit === 'Pique' && <Spade />}
                </div>

                {/* Back of the card */}
                <div className="card-back bg-red-600 border border-2 rounded-md p-2 flex justify-center items-center">

                </div>
            </div>
        </div>
    );
}

export default ShowCard;