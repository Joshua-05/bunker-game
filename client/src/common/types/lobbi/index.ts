export interface LobbiStore {
    lobbiStore: ILobbi[],
    addLobbi: (lobbi: ILobbi[]) => void
    resetLobbi: () => void
    findLobbi: (id: number) => ILobbi | undefined
    updateLobbi: (lobbi: ILobbi) => void
    deleteLobbi: (lobbyId: number) => void
}

export interface ILobbi {
    id: number,
    name: string,
    current: number,
    count: number,
    access: string,
    password?: string,
    createdAt: string,
    updatedAt: string
}