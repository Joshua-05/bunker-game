import { IUser } from "../../common/types/auth";
import style from "./style.module.css";
import { useGameStore } from "../../store/GameStore";

interface PlayerCardProps {
    player: IUser;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
    const cards = useGameStore(state => state.openCards)
    const exist = cards.find(item => item.userId === player.id)
    
    const sexCard = exist?.cards && Array.isArray(exist.cards) ? exist.cards.find(card => card.type === 'Пол') : null;
    const ageCard = exist?.cards && Array.isArray(exist.cards) ? exist.cards.find(card => card.type === 'Возраст') : null;
    const professionCard = exist?.cards && Array.isArray(exist.cards) ? exist.cards.find(card => card.type === 'Профессия') : null;
    const healthCard = exist?.cards && Array.isArray(exist.cards) ? exist.cards.find(card => card.type === 'Здоровья') : null;
    const hobbyCard = exist?.cards && Array.isArray(exist.cards) ? exist.cards.find(card => card.type === 'Хобби') : null;
    const phobiaCard = exist?.cards && Array.isArray(exist.cards) ? exist.cards.find(card => card.type === 'Фобия') : null;
    const luggageCard = exist?.cards && Array.isArray(exist.cards) ? exist.cards.find(card => card.type === 'Багаж') : null;
    const factCards = exist?.cards && Array.isArray(exist.cards) ? exist.cards.filter(card => card.type === 'Факт') : [];
    
    

    return (
        <div className={style.card}>
            <div className={style.card_bio}>
                <span className={style.username}>{player.username}</span>
                <span className={style.sex}>{sexCard ? sexCard.name : 'Пол'}</span>
                <span className={style.age}>{ageCard ? ageCard.name : 'Возраст'}</span>
            </div>
            <div className={style.card_info}>
                <div className={style.card_infoLeft}>
                    <span>{professionCard ? <b>{professionCard.name}</b> : 'Нет профессии'}</span>
                    <span>{healthCard ? <b>{healthCard.name}</b> : 'Нет данных о здоровье'}</span>
                    <span>{hobbyCard ? <b>{hobbyCard.name}</b> : 'Нет хобби'}</span>
                    <span>{phobiaCard ? <b>{phobiaCard.name}</b> : 'Нет фобии'}</span>
                </div>
                <div className={style.card_infoRight}>
                    <span>{luggageCard ? <b>{luggageCard.name}</b> : 'Нет багажа'}</span>
                    {factCards && factCards.length > 0 ? (
                        factCards.map((fact, index) => (
                            <span key={index}><b>{fact.name}</b></span>
                        ))
                    ) : (
                        <span>Нет фактов</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;