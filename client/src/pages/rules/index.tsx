import style from "./style.module.css"

export default function RulesPage() {
    return(
        <>
            <div className={style.main}>
                <div className={style.card}>1
                    <ol>
                        <li className={style.noready}>Запретить\инвиз урл</li>
                        <li className={style.noready}>Система друзей БИГ БЭЙБИ ТАСК</li>
                        <li className={style.ready}>Создать таблицу многие-ко-многим для пользователей в лобби</li>
                        <li className={style.ready}>Подписка на сокет-сервер\изоляция чата</li>
                        <li className={style.ready}>При подключении и отключении с лобби менять запись в таблице Lobbi</li>
                        <li className={style.ready}>Повесить автозапрос на список лобби</li>
                        <li className={style.ready}>В лобби отображать подключенных к нему</li>
                        <li className={style.noready}>Подписка на сокет в лоббирум для динамического отображения изменений</li>
                        <li className={style.ready}>Если пользователь в лоббирум при выгрузке списка кидать его в него</li>
                        <li className={style.noready}>В лобби руме показывать кол-во свободных</li>
                        <li className={style.noready}>Возможность пригласить друга</li>
                        <li className={style.noready}>Голосовая связь</li>
                    </ol>
                </div>
                <div className={style.card}>2</div>
                <div className={style.card}>3</div>
            </div>
        </>
    )
}