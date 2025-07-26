import { Link } from "react-router-dom"
import style from "./style.module.css"
import { useEffect, useState } from "react"
import { instance } from "../../api/baseUrl"
import { ICards } from "../../common/types/cards"
import CardList from "../../components/cardList"

const CardsPage = () => {
    const [cards, setCards] = useState<ICards[]>([])

    const [sex, setSex] = useState<boolean>(true)
    const [age, setAge] = useState<boolean>(true)
    const [prof, setProf] = useState<boolean>(true)
    const [health, setHealth] = useState<boolean>(true)
    const [hobby, setHobby] = useState<boolean>(true)
    const [phobia, setPhobia] = useState<boolean>(true)
    const [invent, setInvent] = useState<boolean>(true)
    const [fact, setFact] = useState<boolean>(true)
    const [all, setAll] = useState<boolean>(false)

    const fetchCardData = async() => {
        try {
            const response = await instance("cards/getAll")
            setCards(response.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchCardData()
    }, [])

    const handleAll = () => {
        setAll(!all)
        setSex(all)
        setAge(all)
        setProf(all)
        setHealth(all)
        setHobby(all)
        setPhobia(all)
        setInvent(all)
        setFact(all)
    }

    const filteredCards = () => {
        return cards.filter(card => {
            if (sex && card.type === 'Пол') return true;
            if (age && card.type === 'Возраст') return true;
            if (prof && card.type === 'Профессия') return true;
            if (health && card.type === 'Здоровья') return true;
            if (hobby && card.type === 'Хобби') return true;
            if (phobia && card.type === 'Фобия') return true;
            if (invent && card.type === 'Багаж') return true;
            if (fact && card.type === 'Факт') return true;
            return false;
        });
    };

    return(
        <>
            <main>
                <div className={style.box}>
                    <h1>Список карт</h1><Link to = '/cards-create'><button>Создание карт</button><br /></Link>
                    <div className={style.cardList}>
                        <div className={style.filters}>
                            <button 
                                onClick={() => setSex(!sex)} 
                                className={sex ? style.buttonActive : style.buttonGray}
                            >
                                Пол
                            </button>
                            <button 
                                onClick={() => setAge(!age)} 
                                className={age ? style.buttonActive : style.buttonGray}
                            >
                                Возраст
                            </button>
                            <button 
                                onClick={() => setProf(!prof)} 
                                className={prof ? style.buttonActive : style.buttonGray}
                            >
                                Профессия
                            </button>
                            <button 
                                onClick={() => setHealth(!health)} 
                                className={health ? style.buttonActive : style.buttonGray}
                            >
                                Здоровье
                            </button>
                            <button 
                                onClick={() => setHobby(!hobby)} 
                                className={hobby ? style.buttonActive : style.buttonGray}
                            >
                                Хобби
                            </button>
                            <button 
                                onClick={() => setPhobia(!phobia)} 
                                className={phobia ? style.buttonActive : style.buttonGray}
                            >
                                Фобия
                            </button>
                            <button 
                                onClick={() => setInvent(!invent)} 
                                className={invent ? style.buttonActive : style.buttonGray}
                            >
                                Багаж
                            </button>
                            <button 
                                onClick={() => setFact(!fact)} 
                                className={fact ? style.buttonActive : style.buttonGray}
                            >
                                Факты
                            </button>
                            <button 
                                onClick={handleAll} 
                                className={style.buttonActive}
                            >
                                Всё
                            </button>

                        </div>
                        {cards?.length > 0 ? 
                            <CardList cards = {filteredCards()}/>
                        : (
                            <p>Карт нет :/</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default CardsPage