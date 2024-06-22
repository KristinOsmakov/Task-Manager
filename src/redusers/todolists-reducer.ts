import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistsActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistId: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        todolistId: string,
        title: string
    }
}

export type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        todolistID: string
        title: string
    }
}

export type  ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        todolistID: string,
        filter: FilterValuesType,
    },
}

export type ActionType = RemoveTodolistsActionType | AddTodolistActionType | ChangeTodolistTitleType | ChangeTodolistFilterType

const initialState: Array<TodolistType> = []
export const todolistsReducer = (todolists = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.payload.todolistId)

        case "ADD-TODOLIST":
            const {title} = action.payload
            const newTodo: TodolistType = {
                id: action.payload.todolistId,
                title: title,
                filter: 'all'
            }
            return (([...todolists, newTodo]))

        case "CHANGE-TODOLIST-TITLE":{
            const {title, todolistID} = action.payload
            return todolists.map(tl=> tl.id === todolistID ? {...tl, title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return todolists.map(tl=> tl.id === action.payload.todolistID ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return todolists;
    }

}


export const RemoveTodolistAC = (todolistId: string):RemoveTodolistsActionType => {
    return (
        {
            type: 'REMOVE-TODOLIST',
            payload: {
                todolistId: todolistId,
            },
        }
    )
}

export const AddTodolistAC = (title: string):AddTodolistActionType => {
    return (
        {
            type: 'ADD-TODOLIST',
            payload: {
                todolistId: v1(),
                title: title,
            },
        }
    )
}


export const ChangeTodolistTitleAC = (todolistId: string, title: string):ChangeTodolistTitleType => {
    return (
        {
            type: 'CHANGE-TODOLIST-TITLE',
            payload: {
                todolistID: todolistId,
                title: 'Title',
            },
        }
    )
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType):ChangeTodolistFilterType => {
    return (
        {
            type: 'CHANGE-TODOLIST-FILTER',
            payload: {
                todolistID: todolistId,
                filter: filter,
            },
        }
    )
}