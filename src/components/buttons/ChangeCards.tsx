import { FC } from "react";

interface ChangeCardsButtonProps {
    onClick: () => void;
    remainingChanges: number;
}

const ChangeCardsButton: FC<ChangeCardsButtonProps> = ({ onClick, remainingChanges }) => {
    return (
        <button
            className={
                ("text-white text-xl font-semibold rounded-md p-2 transition duration-200 ease-in-out shadow-lg m-2 w-full "
                    + (remainingChanges > 0 ? " bg-yellow-600 hover:bg-yellow-700" : " bg-gray-400"))
            }
            onClick={onClick}
        >
            Changer mes cartes <i className="text-sm">(encore {remainingChanges} changements)</i>
        </button>
    );
};

export default ChangeCardsButton;