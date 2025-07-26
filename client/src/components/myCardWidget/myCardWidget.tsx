import { ICards } from "../../common/types/cards"
import { ICardsIsOpen } from "../../common/types/game/game";
import CardFromWidget from "../cardFromWidget";
import style from "./myCardWidget.module.css"

interface IPropsWidget {
    cards: ICards[],
    setSelectedCard: (card: ICardsIsOpen) => void
}

const MyCardWidget = ({setSelectedCard, cards}: IPropsWidget) => {
    // console.log('fuck', cards);
    
    return(
        <div className={style.widget}>
            {cards.map(item => <CardFromWidget setSelectedCard={setSelectedCard} card={item} key={item.id}/>)}
        </div>
    )
}

export default MyCardWidget