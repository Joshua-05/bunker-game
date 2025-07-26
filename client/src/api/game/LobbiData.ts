import { IUser } from "../../common/types/auth";
import { ILobbi } from "../../common/types/lobbi";
import { instance } from "../baseUrl";

interface FetchLobbiDataParams {
    lobbyId: string | undefined;
    setUserInLobby: (users: IUser[]) => void; 
    setLobbi: (lobby: ILobbi | null) => void; 
    exitLobby: () => void; 
}

export const fetchLobbiData = async ({
    lobbyId,
    setUserInLobby,
    setLobbi,
    exitLobby,
}: FetchLobbiDataParams) => {
    try {
        const [resUser, res] = await Promise.all([
            instance.get(`room/getUserLobbi/${lobbyId}`),
            instance.get(`lobbis/getOne/${lobbyId}`)
        ]);
        
        setUserInLobby(resUser.data);
        setLobbi(res.data);
    } catch (error) {
        console.error("Ошибка получения данных лобби:", error);
        exitLobby();
    }
};