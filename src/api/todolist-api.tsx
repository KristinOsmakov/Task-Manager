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

export const todolistAPI = {
    updateTodolistAPI(todolistId: string, title: string) {
        return instance.put(
            `todo-lists/${todolistId}`,
            { title: title },
            settings
        )
    },
    deleteTodolistAPI(todolistId: string) {
        return instance.delete(
            `todo-lists/${todolistId}`,
            settings
        )
    },
    createTodolistAPI(title: string) {
        return instance.post(
            `todo-lists`,
            { title: title },
            settings
        )
    },
    getTodolistsAPI() {
        return instance.get(
            `todo-lists`,
            settings
        )
    }
}