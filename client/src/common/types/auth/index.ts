export interface IPropsLogin {
    setPassword: (value: string) => void
    setEmail: (value: string) => void
}

export interface IPropsRegister {
    setFirstName: (value: string) => void
    setUsername: (value: string) => void
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setRepeatPassword: (value: string) => void
}

export interface UserStore {
    userStore: IUser | null,
    isLogged: boolean,
    addUser: (user: IUser) => void,
    reset: () => void
}

export interface IUser {
    id: number,
    firstName: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string
}