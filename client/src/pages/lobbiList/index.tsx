import { useEffect, useLayoutEffect } from "react"
import { useUserStore } from "../../store/UserStore"
import { useLobbiStore } from "../../store/LobbiStore"
import { instance } from "../../api/baseUrl"
import style from "./style.module.css"
import { Link, useNavigate } from "react-router-dom"
import LobbiCard  from "../../components/lobbiCard"
import { ILobbi } from "../../common/types/lobbi"
import socket from "../../utils/socket";


const LobbiListPage = () => {
    const addLobbi = useLobbiStore(state => state.addLobbi);
    const lobbiStore = useLobbiStore(state => state.lobbiStore);
    const reset = useLobbiStore(state => state.resetLobbi);
    const update = useLobbiStore(state => state.updateLobbi);
    const deleteLobby = useLobbiStore(state => state.deleteLobbi)
    const user = useUserStore(state => state.userStore)
    const nav = useNavigate()

    const fetchLobbi = async () => {
        reset();
        const response = await instance.get("lobbis/getAll");
        const lobbi: ILobbi[] = response.data; 
        addLobbi(lobbi);
    };  

    const userInLobby = async () => {
        const usInLob = await instance.get(`users/findUser/${user?.email}`)
        const id = usInLob.data.lobbyId
        if (id){
            nav(`/lobby-room/${id}`)
        }
    }

    useLayoutEffect(() => {
        userInLobby();
        fetchLobbi();
    }, []);

    useEffect(() => {
        socket.on('lobbyCreated', (lobbi: ILobbi[]) => {
            addLobbi(lobbi);
        });

        socket.on('lobbyUpdated', (lobbi: ILobbi) => {
            update(lobbi);
        });

        socket.on('lobbyDeleted', (lobbyId: number) => { 
            deleteLobby(lobbyId)
        });

        return () => {
            socket.off('lobbyCreated');
            socket.off('lobbyUpdated');
            socket.off('lobbyDeleted');
        };        
    }, [reset, addLobbi, update, deleteLobby]);
    // console.log(lobbiStore);
    

    return(
        <>
            <main>
                <div className={style.box}>
                    <h1>Список лобби</h1><Link to = '/lobby-create'><button>Create lobbi</button><br /></Link>
                    <div className={style.lobbiList}>
                        {lobbiStore.length > 0 ? 
                            lobbiStore.map(item => <LobbiCard lobbi = {item} key={item.id}/>)
                        : (
                            <p>Лобби не найдены</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default LobbiListPage