"use server";

import { redirect } from "next/navigation";
import {createSession,deleteSession,getSession,getUserById, getUserByLogin,
    insertUser,updateSessionExpireTime,updateUserAttempt,
    updateUserAttemptAndTime, updateUserTime} from "./model";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { ISession, IUser } from "./types";

interface IState {
    message: string;
}

export const handleSignup = async (prevState: IState, form: FormData) => {
    const name = (form.get("name") as string).trim()
    const surname = (form.get("surname") as string).trim()
    const login = (form.get("login") as string).trim()
    const password = form.get("password") as string

    if (!name || !surname || !login || !password) {
        return { message: "Please fill all the fields" }
    }

    if (password.length < 8) {
        return { message: "Password length must be at least 8 characters" }
    }

    const foundedUser = await getUserByLogin(login)

    if (foundedUser) {
        return { message: "Login is already taken. Please try another" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = { login, password: hashedPassword, name, surname, time: 0, attempt: 0 }

    const result = await insertUser(user)

    if (result.changes) {
        return redirect("/login")
    } else {
        return { message: "Internal server error. Please try again later." }
    }
}

export const handleLogin = async (state: IState, form: FormData) => {
    const login = (form.get("login") as string).trim()
    const password = form.get("password") as string

    if (!login || !password) {
        return { message: "Please provide both login and password" }
    }

    const user = await getUserByLogin(login)

    if (!user) {
        return { message: "User not found." }
    }

    const blockDuration = 60000
    const isBlocked = user.attempt >= 3 && Date.now() - user.time < blockDuration

    if (isBlocked) {
        return { message: "Account is  blocked. Please try after 1 minutes." }
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
        const newAttempt = user.attempt + 1
        await updateUserAttempt(user.id, newAttempt)

        if (newAttempt >= 3) {
            await updateUserTime(user.id, Date.now())
        }

        return { message: "Wrong credentials." }
    }

   
    const token = nanoid()
    await createSession(user.id, token);
    (await cookies()).set("token", token)

    
    await updateUserAttemptAndTime(user.id, 0, 0)

    return redirect("/profile")
}

export const verifyUser = async () => {
    const userToken = (await cookies()).get("token");

    if (!userToken) {
        return redirect("/login");
    }

    const session = (await getSession(userToken.value)) as ISession;

    if (!session) {
        return redirect("/login");
    }

    const { id, user_id, expires } = session;

    if (Date.now() > expires) {
        (await cookies()).delete("token");
        await deleteSession(id);
        return redirect("/login")
    }

   
    const newExpiry = Date.now() + 12000
    await updateSessionExpireTime(id, newExpiry)

    const user = (await getUserById(user_id)) as IUser

    return user
}

export const handleSignout = async () => {
    const token = (await cookies()).get("token")

    if (token) {
        (await cookies()).delete("token")
        await deleteSession(token.value)
    }

    return redirect("/login")
}
