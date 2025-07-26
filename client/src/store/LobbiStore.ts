import { create } from "zustand";
import { ILobbi, LobbiStore } from "../common/types/lobbi";


export const useLobbiStore = create<LobbiStore>((set, get) => ({
    lobbiStore: [],
    addLobbi: (lobbi: ILobbi[]) => {
        const {lobbiStore} = get();
        
        const existingIds = new Set(lobbiStore.map(item => item.id));
        
        const uniqueLobbi = lobbi.filter(item => !existingIds.has(item.id));

        set({
            lobbiStore: [...lobbiStore, ...uniqueLobbi]
        })
    },
    resetLobbi: () => 
        set({ lobbiStore: [] }),
    findLobbi: (id: number) => {
        const { lobbiStore } = get();
        return lobbiStore.find(item => item.id == id)
    },
    updateLobbi: (lobbi: ILobbi) => {
        const {lobbiStore} = get();
        const update = lobbiStore.map(item => item.id === lobbi.id ? lobbi : item )
        set({
            lobbiStore: update
        })
    },
    deleteLobbi: (lobbyId: number) => {
        const {lobbiStore} = get();
        set({
            lobbiStore: lobbiStore.filter(item => item.id !== lobbyId)
        })
    }
}));