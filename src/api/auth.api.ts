import {instance, TodolistType, ResponseType} from "./todolists-api";


export type LoginData = {
    email: string,
    password: string,
    rememberMe?: boolean
}
export const authApi = {
    login: (data: LoginData) => {
        return instance.post<ResponseType<{userId: number}>>('/auth/login', data);
    },
    logOut: () => {
        return instance.delete<ResponseType>('/auth/login');
    },
    me: () => {
        return instance.get<ResponseType<{userId: number}>>('/auth/me');
    }
}