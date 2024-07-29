import { Dispatch } from 'redux'
import {
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType,
} from '../../app/app-reducer'
import {authApi, LoginData} from "../../api/auth.api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false,
    isInit: false
}
type InitialStateType = typeof initialState

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    console.log(action)
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        case 'login/SET-IS-INIT':
            console.log(4)
            return { ...state, isInit: true}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value }) as const
export const setIsInitAC = () => {
    console.log(5)
    return ({type: 'login/SET-IS-INIT'}) as const
}

// thunks
export const loginTC = (data: LoginData) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    authApi.login(data).then(
        res => {
            const payload = res.data
            if (payload.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
                return
            }
            handleServerAppError(
                payload,
                dispatch
            )
        }
    ).catch(e => {
        handleServerAppError(
            e, dispatch
        )
    })
}
export const meTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    console.log(2)
    authApi.me().then(
        res => {
            const payload = res.data
            if (payload.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
                return
            }
            handleServerAppError(
                payload,
                dispatch
            )
        }
    ).catch(e => {
        handleServerAppError(
            e, dispatch
        )
    }).finally(() => {
        console.log(3)
        dispatch(setIsInitAC())
    })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitAC>
    | SetAppStatusActionType
    | SetAppErrorActionType