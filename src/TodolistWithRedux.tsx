import {FilterValuesType, TodolistType} from "./AppWithRedux";
// import {Button} from "./Button";
import s from './Todolist.module.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, ButtonProps, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redusers/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redusers/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./redusers/todolists-reducer";
import {useCallback, useMemo} from "react";
import {Tasks} from "./Tasks";


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
type PropsType = {
	todolist: TodolistType

}

export const TodolistWithRedux = ({todolist}: PropsType) => {

	const {id, title, filter} = todolist
	let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
	const dispatch = useDispatch()

	const addTaskHandler = (title: string) => {
			dispatch(addTaskAC(title, id))
	}
	const changeFilterTasksHandler = (filter: FilterValuesType) => {

		dispatch(ChangeTodolistFilterAC(id, filter))
	}
	// const changeTaskStatusHandler=(taskID:string,newIsDone:boolean)=>{
	// 	dispatch(changeTaskStatusAC(taskID, newIsDone, id))
	// }
	// const changeTaskTitleHandler=(title:string,taskID:string)=>{
	// 	dispatch(changeTaskTitleAC(taskID, title, id))
	// }


	const changeTodolistTitleHandler = useCallback((title: string) => {
		dispatch(ChangeTodolistTitleAC(id, title))
	}, [ChangeTodolistTitleAC, id])

	tasks = useMemo(() => {

		if (filter === 'active') {
			tasks = tasks.filter(task => !task.isDone)
		}
		if (filter === 'completed') {
			tasks = tasks.filter(task => task.isDone)
		}
		return tasks;
	}, [tasks, filter])

	const onAllClickHandler = useCallback(()=> changeFilterTasksHandler('all'), [dispatch, id])
	const onActiveClickHandler = useCallback(()=> changeFilterTasksHandler('active'), [dispatch, id])
	const onCompletedClickHandler = useCallback(()=> changeFilterTasksHandler('completed'), [dispatch, id])
	return (
		<div>
			<h3><EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
			{/*<Button title={'X'} onClick={()=>removeTodolist(todolistId)}/>*/}
				<IconButton
					color={"warning"}
					onClick={()=>dispatch(RemoveTodolistAC(id))} aria-label="delete">
					<DeleteForeverIcon />
				</IconButton>
			</h3>


			<AddItemForm addItem={addTaskHandler}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {


							// const changeTaskStatusHandler=(event:ChangeEvent<HTMLInputElement>)=>{
							// 	changeStatusIsDone(task.id,event.currentTarget.checked)
							// }

							return <Tasks key={task.id} task={task} todolistId={todolist.id}/>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<ButtonWithMemo

					size={"small"}
					className= {filter === 'all' ? s.activeFilter : ''}
					color={filter === 'all' ? "secondary" : "primary"}
					variant={'contained'}
					onClick={onAllClickHandler}
					title={"All"}
				>

					</ButtonWithMemo>
				<ButtonWithMemo

					size={"small"}
					className= {filter === 'active' ? s.activeFilter : ''}
					color={filter === 'active' ? "secondary" : "primary"}
					variant={'contained'}
					onClick={onActiveClickHandler}
					title={"Active"}
				>

				</ButtonWithMemo>
				<ButtonWithMemo

					size={"small"}
					className= {filter === 'completed' ? s.activeFilter : ''}
					color={filter === 'completed' ? "secondary" : "primary"}
					variant={'contained'}
					onClick={onCompletedClickHandler}
					title={"Completed"}
				>

				</ButtonWithMemo>
			</Box>
		</div>
	)
}

type ButtonWithMemoPropsType = {} & ButtonProps
const ButtonWithMemo = ({size, className, color, variant, onClick, title, ...rest}: ButtonWithMemoPropsType) => {
	return <Button

		size={"small"}
		className= {className}
		color={color}
		variant={variant}
		onClick={onClick}
	>
		{title}
	</Button>
}