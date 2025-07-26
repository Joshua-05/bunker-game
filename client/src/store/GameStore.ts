import { create } from "zustand";
import { IGameStore, IOpenCards, ITurnToWalk } from "../common/types/game/game";
import { persist } from "zustand/middleware";
import { ICards } from "../common/types/cards";


export const useGameStore = create<IGameStore>()(persist((set, get) => ({
    openCards : [],
    expelledPlayer : [],
    turnToWalk: {userId: 0, username: ""},
    playerCards: [],
    showCard: (card: IOpenCards) => {
        const { openCards } = get();
        const cardsToAdd = Array.isArray(card.cards) ? card.cards : [card.cards];
    
        const updatedCards = openCards.map(item => {
            if (item.userId === card.userId) {
                return {
                    ...item,
                    cards: [...item.cards, ...cardsToAdd], 
                };
            }
            return item; 
        });
    
        const userExists = openCards.some(item => item.userId === card.userId);
    
        
        if (!userExists) {
            updatedCards.push({
                userId: card.userId,
                cards: cardsToAdd, 
            });
        }
    
        set({ openCards: updatedCards });
    },
    addPlayerCards: (cards: ICards[]) => {
        
        set({ playerCards: cards });
    },
    expelled: (userId: number) => {
        const { expelledPlayer } = get();
        
        if (!expelledPlayer.includes(userId)) {
            set({ expelledPlayer: [...expelledPlayer, userId] });
        }
    },
    turrned: (user: ITurnToWalk) => {
        set({ turnToWalk: user });
    },
    reset: () => {
        set({
            openCards : [],
            expelledPlayer : [],
            turnToWalk: {userId: 0, username: ""},
            playerCards: [],
        })
    }
}),{
        name: 'GameStore', 
        version: 1
}));