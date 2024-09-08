
import * as React from "react";
import { Button } from "@mui/material";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/todolistsList/model/todolistsSlice";
import { useAppDispatch } from "common/hooks";

type Props = {
  todolist: TodolistDomainType
}

export const FilterTasksButtons = ({todolist}: Props) => {
  const dispatch = useAppDispatch()
  const {filter, id} = todolist


  const tasksFilterHandler = (filter: FilterValuesType) => {
    dispatch(todolistsActions.changeTodolistFilter({ id, filter }))
  }
  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={()=>tasksFilterHandler('all')}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={()=>tasksFilterHandler('active')}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={()=>tasksFilterHandler('completed')}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};