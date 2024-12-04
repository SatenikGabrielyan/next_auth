import db from 'better-sqlite3'
import { InputUser, IUser } from './types'
const sql = new db('auth.db')

export const getUserByLogin = (login: string): (IUser | null) => {
    const user = sql.prepare("SELECT * FROM users where login = ?").get(login)
    if (user) {
        return user as IUser
    }
    return null
}

export const getAllUsers = () => {
    return sql.prepare("SELECT * FROM users").all()
}

export const insertUser = (user: InputUser): db.RunResult => {
    return sql.prepare(`INSERT INTO users(name, surname, login, password, attempt, time)
                        VALUES(@name, @surname, @login, @password, @attempt, @time)                    
    `).run(user)
}

export const createSession = (user: number, token: string) => {
    return sql.prepare(`INSERT INTO session(id, user_id, expires)
                        VALUES(?,?,?)                    
    `).run(token, user, Date.now() + 50000)
}

export const getSession = (token: string) => {
    const stored = sql.prepare("SELECT * FROM session where id = ?").get(token)
    if (stored) {
        return stored
    }

    return null
}

export const getUserById = (id: number) => {
    return sql.prepare("SELECT * FROM users where id = ?").get(id)
}


export const deleteSession = (token: string) => {
    sql.prepare("DELETE FROM session WHERE id = ?").run(token)

    return null
}

export const updateSessionExpireTime = async (token:string, newExpiryTime:number) => {
    sql.prepare("UPDATE session SET expires = ? WHERE id = ?").run(newExpiryTime, token)
}




export const updateUserAttempt = async (id:number, attempt:number) => {
    sql.prepare(`UPDATE users
     SET attempt = ?
     WHERE id = ?`).run(attempt , id)
  
}
export const updateUserTime = async (id:number, time:number) => {
    sql.prepare(`UPDATE users
     SET time = ?
     WHERE id = ?`).run(time, id)
  
}
export const updateUserAttemptAndTime = async (id:number, attempt:number, time:number) => {
    sql.prepare(`UPDATE users
     SET attempt = ?,
     time = ?

     WHERE id = ?`).run(0, 0,id)
  
}


