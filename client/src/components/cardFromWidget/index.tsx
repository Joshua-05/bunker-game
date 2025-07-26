import { useState } from "react";
import { ICards } from "../../common/types/cards";
import style from "./style.module.css";
import { ICardsIsOpen } from "../../common/types/game/game";

interface CardCharacteristicProps {
    card: ICards,
    setSelectedCard: (card: ICardsIsOpen) => void
}

const CardFromWidget = ({setSelectedCard, card }: CardCharacteristicProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div 
            className={style.card} 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
            onClick={() => setSelectedCard({type: card.type, name: card.name})}
        >
            <p>{card.type}</p>
            <p>{card.name}</p>
            {hovered && (
                <div className={style.tooltip}>
                    {card.descripton}
                </div>
            )}
        </div>
    );
};

export default CardFromWidget;