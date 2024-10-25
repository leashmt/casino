import { FC } from "react";

interface CardBlockButtonProps {
    isBlocked: boolean | undefined;
    onClick: () => void;
    cardIndex: number;
}

const CardBlockButton: FC<CardBlockButtonProps> = ({ isBlocked, onClick, cardIndex }) => {
    return (
        <button
            className="bg-orange-600 hover:bg-orange-700 text-white text-xl font-semibold rounded-md p-2 transition duration-200 ease-in-out shadow-lg m-2 w-44"
            onClick={onClick}
        >
            {isBlocked ? `Débloquer` : `Bloquer la carte`}
        </button>
    );
};

export default CardBlockButton;