import { Delete } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { AddItemForm, EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { useAppDispatch } from "common/hooks"
import React, { useCallback, useEffect } from "react"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
  todolistsThunks
} from "features/todolistsList/model/todolistsSlice";
import { Task } from "features/todolistsList/ui/Todolist/Tasks/Task/Task"
import { TaskType } from "features/todolistsList/api/tasksApi.types";
import { FilterTasksButtons } from "features/todolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/todolistsList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/todolistsList/ui/Todolist/Tasks/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Todolist = (props: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(props.todolist.id))
  }, [])

  const addTask = (title: string) => {
      return dispatch(tasksThunks.addTask({ title, todolistId: props.todolist.id }))
    }


  return (
    <>
      <TodolistTitle todolist={props.todolist}/>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
        <Tasks todolist={props.todolist} tasks={props.tasks}/>
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist}/>
      </div>
    </>
  )
}
