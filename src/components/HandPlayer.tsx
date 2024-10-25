import { FC } from "react";
import ShowCard from "./ShowCard";

type Suit = 'Coeur' | 'Carreau' | 'Trefle' | 'Pique';
type Rank = '7' | '8' | '9' | '10' | 'Valet' | 'Dame' | 'Roi' | 'As';

interface Card {
    suit: Suit;
    rank: Rank;
    isBlocked?: boolean;
}

interface HandPlayerProps {
    cards: Card[];
}

const HandPlayer: FC<HandPlayerProps> = ({ cards }) => {
    return (
        <div className="flex">
            {cards.map((card, index) => (
                <ShowCard card={card} index={index} key={index} />
            ))}
        </div>
    )
}

export default HandPlayer;