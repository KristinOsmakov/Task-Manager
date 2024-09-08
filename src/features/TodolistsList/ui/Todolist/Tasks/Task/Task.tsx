import React, { ChangeEvent, useCallback } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/todolistsList/api/tasksApi.types";
import { useAppDispatch } from "common/hooks";
import { tasksThunks } from "features/todolistsList/model/tasksSlice";
import s from 'features/todolistsList/ui/Todolist/Tasks/Task/Task.module.css'

type TaskPropsType = {
  task: TaskType
  todolistId: string
}


export const Task = (props: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(tasksThunks.removeTask({ taskId: props.task.id, todolistId: props.todolistId }));
    }



  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
      dispatch(
        tasksThunks.updateTask({
          taskId: props.task.id,
          domainModel: { status: status },
          todolistId: props.todolistId }))
    }


  const changeTaskTitleHandler = (newValue: string) => {
      dispatch(
        tasksThunks.updateTask({
        taskId: props.task.id,
        domainModel: { title: newValue },
        todolistId: props.todolistId }))
    }
  const isTaskComplete = props.task.status === TaskStatuses.Completed
  return (
    <div key={props.task.id} className={isTaskComplete ? s.isDone : ""}>
      <Checkbox checked={isTaskComplete} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={props.task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
