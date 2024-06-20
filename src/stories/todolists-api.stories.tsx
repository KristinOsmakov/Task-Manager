import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API',
}

//TODOLISTS
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolistsAPI().then(res => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolistAPI('HELLO').then(res => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b916bc39-4b85-4a38-b461-e8b50e8e4375'
        todolistAPI.deleteTodolistAPI(todolistId).then(res => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '870789f9-7f20-4ba4-90ca-363d9a116f75'
        todolistAPI.updateTodolistAPI(todolistId, 'SOME NEW TITLE').then(res => {
            setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

//TASKS

