import axios from 'axios'
import {CreateTodolist, DeleteTodolist, GetTodolists, UpdateTodolistTitle} from "../stories/todolists-api.stories";


const config = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '32511c99-28de-44d1-9df6-b2ae2555b019',
    },
}
export const instance = axios.create(config)
export type TaskType = {
    description: string | null
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FieldErrorType = {
    error: string
    field: string
}
export type ResponseType2<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: T
}


export const todolistAPI = {
    getTodolistsAPI() {
        return instance.get<TodolistType[]>(`todo-lists`).then(res => res.data)
    },
    createTodolistAPI(title: string) {
        return instance.post<ResponseType2<{ item: TodolistType }>>(
            `todo-lists`, { title })
            .then(res => res.data)
    },
    deleteTodolistAPI(todolistId: string) {
        return instance.delete<ResponseType2>(
            `todo-lists/${todolistId}`).then(res => res.data)
    },
    updateTodolistAPI(todolistId: string, title: string) {
        return instance.put<ResponseType2>(
            `todo-lists/${todolistId}`,
            { title: title }).then(res => res.data)
    },
}
export const taskAPI = {
    getTasksAPI(todolistId: string) {
        return instance.get<TaskType>(
            `todo-lists/${todolistId}/tasks`).then(res => res.data)
    },
    createTasksAPI(todolistId: string, title: string) {
        return instance.post<ResponseType2 <{ item: TaskType }>>(
            `todo-lists/${todolistId}/tasks`,
            { title },
        ).then(res => res.data)
    },
    updateTasksAPI(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType2>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            { title: title }
        ).then(res => res.data)
    },
    deleteTasksAPI(todolistId: string, taskId: string) {
        return instance.delete<ResponseType2>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
        )
    },
}


