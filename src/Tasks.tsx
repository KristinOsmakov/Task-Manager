// @flow
import * as React from 'react';
import {getListItemSx} from "./Todolist.styles";
import s from "./Todolist.module.css";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {TaskType} from "./AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redusers/tasks-reducer";
import {useDispatch} from "react-redux";
import {ChangeEvent, memo} from "react";

type TasksPropsType = {
    task: TaskType,
    todolistId: string
};
export const Tasks = memo(({task, todolistId}: TasksPropsType) => {
    const dispatch = useDispatch();
    const changeTaskStatusHandler=(e: ChangeEvent<HTMLInputElement>)=>{
        const newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }
    const changeTaskTitleHandler=(title:string)=>{
        dispatch(changeTaskTitleAC(task.id, title, todolistId))
    }
    // const changeTaskTitleHandler=(title:string,taskID:string)=>{
    //     dispatch(changeTaskTitleAC(taskID, title, id))
    // }
    const removeTaskHandler = () => {
        dispatch(removeTaskAC(task.id, todolistId))
    }
    return (
        <ListItem
            sx={getListItemSx(task.isDone)}
            disablePadding={true}
            key={task.id}
            className={task.isDone? s.isDone : ''}>
            <div>
                <Checkbox
                    color={'secondary'}
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}>
                </Checkbox>
                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
            </div>

            <IconButton
                color={"error"}
                onClick={removeTaskHandler} aria-label="delete">
                <DeleteForeverIcon />
            </IconButton>
        </ListItem>
    );
});