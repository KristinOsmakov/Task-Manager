import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {todolistsAPI} from "../api/todolists-api";
import {setTodolistsAC} from "./totolidt.actions";

const GetTodos = (dispatch: Dispatch, getState: () => AppRootStateType) => {
    todolistsAPI.getTodolists().then(res => {
        const todos = res.data
        dispatch(setTodolistsAC(todos))
    })
}

export const getTodosTC = () => GetTodos