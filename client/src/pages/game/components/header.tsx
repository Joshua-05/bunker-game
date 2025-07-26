import style from "./header.module.css"

interface IHeadProps {
    turnUser: string | undefined,
    count: number | undefined,
    exitLobby: () => void
}

export const Header = ({ turnUser, count, exitLobby }: IHeadProps) => {
    return (
        <div className={style.head}>
            <div className={style.head_history}>
                <p>Россия разбомбила весь мир, а Вас признали иноагентом и депортировали из страны. Удачи найти укрытие в разаренных пустошах зарубежья</p>
            </div>
            <div className={style.head_logo}>
                <p>Ход игрока {turnUser}</p>
                <button onClick={exitLobby}>Сдаться</button>
                <br />
                {count}
            </div>
            <div className={style.head_info}>
                <p>В бункере есть кухня и запас еды на 1.5 года. Арсенал с оружием. Медпункт, но с запертой дверью. Пособия по земледелию.</p>
            </div>
            <div className={style.head_content}>
                <p>Продолжительность 3 года. Бункер 400 м². Тут места на 5 человек.</p>
            </div>
        </div>
    );
};