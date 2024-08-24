import {
  AddTaskArgs, RemoveTaskArgs,
  TaskType,
  todolistsAPI, UpdateTaskArgs,
  UpdateTaskModelType,
} from 'features/TodolistsList/todolists-api'
import {  AppThunk } from 'app/store'
import { appActions } from "app/app.reducer";
import { todolistsActions } from "features/TodolistsList/todolists.reducer";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'utils'
import { ResultCode, TaskPriorities, TaskStatuses } from 'common/enum'

const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model };
        }

      })
      .addCase(fetchTasks.rejected, (state, action) => {
        debugger
      })
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })

      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

// thunks
export const fetchTasks = createAppAsyncThunk<{
  tasks: TaskType[], todolistId: string}, string>(`${slice.name}/fetchTasks`, async (todolistId, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items;
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return {tasks, todolistId}
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null)
  }
})
    export const removeTask = createAppAsyncThunk<RemoveTaskArgs, RemoveTaskArgs>(
      `${slice.name}/removeTask`,
      async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
          dispatch(appActions.setAppStatus({ status: 'loading' }));
          const res = await todolistsAPI.deleteTask(arg.todolistId, arg.taskId);

          if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }));
            return arg;
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      }
    );


export const addTask = createAppAsyncThunk<{task: TaskType}, AddTaskArgs>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));

      const res = await todolistsAPI.createTask(arg)

        if (res.data.resultCode === ResultCode.Success) {
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
          return { task: res.data.data.item };
        } else {
          handleServerAppError(res.data, dispatch);
          return rejectWithValue(null)
        }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null)
  }
})
export const updateTask = createAppAsyncThunk<
  UpdateTaskArgs, UpdateTaskArgs>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue, getState} = thunkAPI
  try {
    const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId);
    if (!task) {
      console.warn("task not found in the state");
      return rejectWithValue(null)
    }
    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...arg.model,
    };
    const res = await todolistsAPI
      .updateTask(arg.todolistId, arg.taskId, apiModel)
    if (res.data.resultCode === 0) {
      return arg;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null)
    }
  } catch(error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null)
  }
} )

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
