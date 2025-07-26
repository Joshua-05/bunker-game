import { create } from "zustand";
import {IUser, UserStore } from "../common/types/auth";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserStore>()(persist((set) => ({
    userStore: null,
    isLogged: false,
    addUser: (user: IUser) => {
        set({
            userStore: user,
            isLogged: true
        })
    },
    reset: () => 
        set({ userStore: null, isLogged: false })
}),{
    name: 'UserStore', 
    version: 1
}))


// 