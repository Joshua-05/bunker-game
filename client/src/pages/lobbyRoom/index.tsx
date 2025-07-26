import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../api/baseUrl";
import { useEffect, useState } from "react";
import { ILobbi } from "../../common/types/lobbi";
import Chat from "../../components/chat";
import { useUserStore } from "../../store/UserStore";
import { IUser } from "../../common/types/auth";
import UserInLobbyCard from "../../components/userInLobbyCard";
import style from "./style.module.css"
import socket from "../../utils/socket";

const LobbyRoomPage = () => {
    const {lobbyId} = useParams();
    // console.log(lobbyId);
    const nav = useNavigate()
    const user = useUserStore(state => state.userStore)
    if (!user || !user.id){
        throw new Error ('Пользователь не авторизован')
    }
    const [ lobbi, setLobbi] = useState<ILobbi | null>(null)
    const [ userInLobby, setUserInLobby] = useState<IUser[]>([]) //РАБОТАЮ С ЭТИМ ВОТ
    // const [popit, setPopit] = useState<number>()
    
    const ClickExit = async() => {
        await instance.put(`room/lobbiCurrent/${lobbyId}`, {
            action: 'descrement',
            userId: user.id
        }),
        nav(`/lobby`)
        socket.emit('leaveLobby', {lobbyId: lobbyId, userId: user.id})
    }

    const ClickEnter = async() => {
        nav(`/game/${lobbyId}`)
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await instance.get(`lobbis/getOne/${lobbyId}`)
                setLobbi(res.data)
                await instance.put(`room/lobbiCurrent/${lobbyId}`, {
                    action: 'increment',
                    userId: user.id
                })
                const resUser = await instance.get(`room/getUserLobbi/${lobbyId}`)
                // console.log('ВОТ ОНО ВОТ ЭТО', resUser);
                
                setUserInLobby(resUser.data)
               
                // if (resUser.data.length >= res.data.count) {
                //     // Запускаем игру, если лобби полное
                //     ClickEnter();
                // }
            } catch (error) {
                nav('/lobby')
                console.error("Ошибка получения лобби:", error)
            }
        }
        fetch()
        socket.on('userLeft', fetch)
        socket.on('userJoined', fetch);
        socket.on('lobbyFull', ClickEnter);

        return () => {
            socket.off('userLeft', fetch)
            socket.off('lobbyFull', ClickEnter);
            socket.off('userJoined', fetch);
        };
    }, [lobbyId])
    
    return(
        <>
            <div>
                {lobbi ? (
                    <>
                        <div className={style.userList}>
                            <div className={style.userList_head}>
                                <button onClick={ClickEnter}>Start</button>
                                <div className={style.userList_head__name}>
                                    <h1>{lobbi.name}</h1>
                                    <span>{userInLobby.length} / {lobbi.count}</span>
                                </div>
                                <button onClick={ClickExit}>Выход</button>
                            </div>
                        
                        <div>
                            {userInLobby.length > 0 ? (
                                userInLobby.map(item => <UserInLobbyCard users = {item} key={item.id}/>)      
                            )
                            : 
                            (<p>Нет подключенных</p>)}
                        </div>
                        </div>
                        {/* {console.log(typeof(lobbi.count))} */}
                        <Chat lobbyId = {lobbyId} count = {lobbi.count}/>
                    </>
                ) : (
                    <p>Загрузка лобби...</p>
                ) }
            </div>
            
        </>
    )
}

export default LobbyRoomPage