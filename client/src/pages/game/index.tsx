import { useNavigate, useParams } from "react-router-dom";
import PlayerCard from "../../components/playerCard";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { instance } from "../../api/baseUrl";
import { IUser } from "../../common/types/auth";
import GameChat from "../../components/gameChat/gameChat";
import MyCardWidget from "../../components/myCardWidget/myCardWidget";
import VoteWidget from "../../components/voteWidget/voteWidget";
import { ILobbi } from "../../common/types/lobbi";
import { useUserStore } from "../../store/UserStore";
import { useGameStore } from "../../store/GameStore";
import { ICardsIsOpen, IOpenCards, ITurnToWalk } from "../../common/types/game/game";
import socket from "../../utils/socket";
import { Header } from "./components/header";
import { fetchDealingCards } from "../../api/game/DealingCards";
import { fetchLobbiData } from "../../api/game/LobbiData";
import { Box, Button, Modal, Typography } from "@mui/material";


const GamePage = () => {
    const { lobbyId } = useParams();
    const nav = useNavigate();
    const user = useUserStore(state => state.userStore);
    const addPlayerCard = useGameStore(state => state.addPlayerCards)
    const playerCard = useGameStore(state => state.playerCards)

    if (!user || !user.id) {
        throw new Error('Пользователь не авторизован');
    }

    const addCards = useGameStore(state => state.showCard);
    const openCa = useGameStore(state => state.openCards)
    
    const [userInLobby, setUserInLobby] = useState<IUser[]>([]);
    const [lobbi, setLobbi] = useState<ILobbi | null>(null);
    const [openMyCard, setOpenMyCard] = useState<boolean>(false);
    const [openVote, setOpenVote] = useState<boolean>(false);
    // const [turnToWalk, setTurnToWalk] = useState<ITurnToWalk | null>(null);
    // const [currentPlayer, setCurrentPlayer] = useState<ITurnToWalk | null>(null);
    const [selectedCard, setSelectedCard] = useState<ICardsIsOpen>();
    const delSt = useGameStore(state => state.reset)

    const [open, setOpen] = useState(false);
    

    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const exitLobby = async() => {
        await instance.post('games/leave', {userId: user.id})
        delSt()
        nav('/lobby');
    };

    

    useEffect(() => {
        fetchLobbiData({
            lobbyId,
            setUserInLobby,
            setLobbi,
            exitLobby,
        })
    }, [lobbyId, user]);

    useEffect(() => {
        if (lobbi) {
            fetchDealingCards({
                lobbyId,
                lobbi,
                user,
                addPlayerCard,
                addCards,
            })
        }
        
    }, [lobbi, user, addCards]);

    const handleConfirm = () => {
        handleClose()
        const card = {
            gameId: lobbyId,
            userId: user.id,
            cards: selectedCard
        }
        socket.emit('openCard', card)

        // setCurrentPlayer({ userId: user.id, username: user.username });

        // const currentPlayerIndex = userInLobby.findIndex(p => p.id === user.id);
        // const nextPlayerIndex = (currentPlayerIndex + 1) % userInLobby.length;

        // const nextPlayer = userInLobby[nextPlayerIndex];
        // setTurnToWalk({ userId: nextPlayer.id, username: nextPlayer.username });
        setOpenMyCard(false)
        setSelectedCard({type: '', name: ''})
    }

    useEffect(() => {
        socket.on('userOpenCard', (ert : IOpenCards) => {
            addCards(ert)
            // setTestOpen(ert)
            // console.log('Прилет с другого клиента', ert);
            
        })
        // socket.on('userLeft', fetch)
        return(() => {
            socket.off('userOpenCard')
        })
    }, [])
    
    // console.log("All cards: ",  openCa);
    // console.log('Its may card:', playerCard);
    // console.log('Это выбранная:', selectedCard);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    return (
        <>
            <Header exitLobby={exitLobby} turnUser={user.username} count={lobbi?.count}/>
            <div className={style.table}>
                <div className={style.cardList}>
                    {userInLobby.length > 0 ? userInLobby.map(item => <PlayerCard player={item} key={item.id} />) : <p>нет игроков</p>}
                </div>
                <div className={style.activeZona}>
                    <div className={style.myCard}>
                        <button onClick={() => setOpenMyCard(!openMyCard)}>My cards</button>
                    </div>
                    <div className={style.buttons}>
                        <button onClick={handleOpen}>Потвердить</button><br />
                        <button onClick={() => setOpenVote(!openVote)}>Голосовать</button><br />
                        <button>Журнал?</button>
                    </div>
                    <div className={style.chat}>
                        {lobbi && <GameChat lobbyId={lobbyId} count={lobbi.count} />}
                    </div>
                </div>
            </div>
            {openMyCard && <MyCardWidget setSelectedCard={setSelectedCard} cards={playerCard} />}
            {openVote && <VoteWidget users={userInLobby} />}
            {selectedCard && <p>{selectedCard.type}</p>}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={styles}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Вы уверены
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Другим откроется Ваш <br />
                        <strong>{selectedCard?.type}: {selectedCard?.name}</strong>
                    </Typography>
                    <Button onClick={() => handleConfirm()}>Да</Button>
                    <Button onClick={handleClose}>Нет</Button>
                </Box>
            </Modal>
        </>
    );
};

export default GamePage;