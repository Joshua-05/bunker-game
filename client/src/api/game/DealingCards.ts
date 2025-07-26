import { ICards } from "../../common/types/cards";
import { ILobbi } from "../../common/types/lobbi";
import { instance } from "../baseUrl";


interface FetchDealingCardsParams {
    lobbyId: string | undefined;
    lobbi: ILobbi | null;
    user: { id: number; username: string } 
    addPlayerCard: (cards: ICards[]) => void; 
    addCards: (data: { userId: number; cards: ICards[] }) => void; 
}

export const fetchDealingCards = async ({
    lobbyId,
    lobbi,
    user,
    addPlayerCard,
    addCards,
}: FetchDealingCardsParams) => {
    const data = {
        id_game: lobbyId,
        name: lobbi?.name,
        count: lobbi?.count,
        username: user?.username,
        userId: user?.id,
    };

    if (!data.name || data.count === undefined) {
        console.error('Недостаточно данных для создания игры:', data);
        return;
    }

    try {
        const response = await instance.post('games/create', data);
        if (response.data !== '') {
            addPlayerCard(response.data);
            addCards({
                userId: user.id,
                cards: response.data,
            });
        }
    } catch (error) {
        console.error('Ошибка при создании игры:', error);
    }
};