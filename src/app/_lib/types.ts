export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password: string
    time:number | 0
    attempt:number | 0
}

export interface ISession {
    id: string
    user_id: number
    expires: number
}

export type InputUser = Omit<IUser, 'id'>