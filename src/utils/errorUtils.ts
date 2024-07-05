import {
    AppActionsType,
    setAppError,
    setAppStatus,
} from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolists-api'

type ErrorUtilsDispatchType = Dispatch<AppActionsType>

// generic function
export const handleServerAppError = <T,>(
    data: ResponseType<T>,
    dispatch: ErrorUtilsDispatchType
) => {
    dispatch(setAppStatus('failed'))
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
        return
    }
        dispatch(setAppError('Some error occurred'))
}

export const handleServerNetworkError = (
    error: { message: string },
    dispatch: ErrorUtilsDispatchType
) => {
    dispatch(setAppError(error.message))
    dispatch(setAppStatus('failed'))
}