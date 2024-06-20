import axios from 'axios'
import {CreateTodolist, DeleteTodolist, GetTodolists, UpdateTodolistTitle} from "../stories/todolists-api.stories";

const settings = {
    withCredentials: true,
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    // withCredentials: true,
    headers: {
        'API-KEY': '32511c99-28de-44d1-9df6-b2ae2555b019',
    },
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type FieldErrorType = {
    error: string
    field: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}



export const todolistAPI = {
    updateTodolistAPI(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            { title: title },
            settings
        )
    },
    deleteTodolistAPI(todolistId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}`,
            settings
        )
    },
    createTodolistAPI(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(
            `todo-lists`,
            { title: title },
            settings
        )
    },
    getTodolistsAPI() {
        return instance.get<TodolistType[]>(
            `todo-lists`,
            settings
        )
    },
}