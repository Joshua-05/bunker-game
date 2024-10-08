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

export interface IAuthState {
    user: IPublicUser,
    isLogged: boolean
}

export interface IPublicUser {
    id: number | null,
    firstName: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string
}