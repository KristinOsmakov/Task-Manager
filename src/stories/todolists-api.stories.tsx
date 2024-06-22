import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {ResponseType2, taskAPI, TaskType, todolistAPI, TodolistType} from "../api/todolist-api";


export default {
    title: 'API',
}

//TODOLISTS
export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[] | null>(null)
    useEffect(() => {
        todolistAPI.getTodolistsAPI()
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<ResponseType2<{ item: TodolistType }> | null>(null)
    useEffect(() => {
        todolistAPI.createTodolistAPI('HELLO')
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<ResponseType2 | null>(null)
    useEffect(() => {
        const todolistId = '23456'
        todolistAPI.deleteTodolistAPI(todolistId)
            .then(res => {
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<ResponseType2 | null>(null)
    useEffect(() => {
        const todolistId = '870789f9-7f20-4ba4-90ca-363d9a116f75'
        todolistAPI.updateTodolistAPI(todolistId, 'SOME NEW TITLE')
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

//TASKS

export const GetTask = () => {
    const [stateTask, setStateTask] = useState<TaskType | null>(null)
    useEffect(() => {
        const todolistId = 'e88f5791-7681-40ec-a247-b1ae1679ac30'
        taskAPI.getTasksAPI(todolistId)
            .then(res => setStateTask(res))
    }, []);
    return <div>{JSON.stringify(stateTask)}</div>
}
export const CreateTask = () => {
    const [stateTask, setStateTask] = useState<ResponseType2<{ item: TaskType }> | null>(null)
    useEffect(() => {
        const todolistId = 'e88f5791-7681-40ec-a247-b1ae1679ac30'
    taskAPI.createTasksAPI(todolistId, 'Task')
        .then(res => setStateTask(res))
}, []);
return <div>{JSON.stringify(stateTask)}</div>
}
export const UpdateTasks = () => {
    const [stateTask, setStateTask] = useState<ResponseType2 | null>(null)
    useEffect(() => {
        const todolistId = 'e88f5791-7681-40ec-a247-b1ae1679ac30'
        const taskId = '2eb5dd5b-6175-49c6-84cd-edf2d12570c5'
        taskAPI.updateTasksAPI(todolistId, taskId, 'New Task')
            .then(res => setStateTask(res))
    }, []);
    return <div>{JSON.stringify(stateTask)}</div>
}
export const DeleteTask = () => {
    const [stateTask, setStateTask] = useState<ResponseType2 | null>(null)
    useEffect(() => {
        const todolistId = 'e88f5791-7681-40ec-a247-b1ae1679ac30'
        const taskId = '882f276d-65fb-42e2-aebf-aa5a6fcf17df'
        taskAPI.deleteTasksAPI(todolistId, taskId)
            .then(res => res.data)
    }, []);
    return <div>{JSON.stringify(stateTask)}</div>
}