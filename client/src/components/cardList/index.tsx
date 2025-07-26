import { ICards } from "../../common/types/cards"
import CardCharacteristic from "../cardCharacteristic"
import style from "./style.module.css"

interface CardListProps{
    cards: ICards[]
}

const CardList = ({cards}: CardListProps) => {
    return(
        <div className={style.list}>
            {cards.length > 0 ? 
                cards.map(item => <CardCharacteristic card={item} key={item.id}/>)
                    : <p>Карт нет</p>
                }
        </div>
    )
}

export default CardList