import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@reduxjs/toolkit/query'
import { AppDispatch, AppRootStateType } from 'app/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatch
  rejectValue: null
}>()