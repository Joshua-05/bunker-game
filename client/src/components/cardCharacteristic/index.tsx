import { useEffect, useState } from "react"
import { ICards } from "../../common/types/cards"
import style from "./style.module.css"

interface CardCharacteristicProps {
    card: ICards
}

const CardCharacteristic = ({card}: CardCharacteristicProps) => {
    const [color, setColor] = useState('gray')

    useEffect(() => {
        if (card.importance > 3) {
            setColor('green')
        } else if (card.importance === -10) {
            setColor('black')
        } else if (card.importance > -10 && card.importance < -3) {
            setColor('red')
        } else {
            setColor('gray')
        }
    }, [card.importance])
    

    return (
        <div className={`${style.card} ${style[color]}`}>
            <p>{card.type}</p>
            <p>{card.name}</p>
            <p className={style.card_description}>{card.descripton}</p>  
        </div>
    )
}

export default CardCharacteristic