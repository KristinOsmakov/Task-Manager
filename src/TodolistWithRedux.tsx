import {FilterValuesType, TodolistType} from "./AppWithRedux";
// import {Button} from "./Button";
import s from './Todolist.module.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redusers/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redusers/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./redusers/todolists-reducer";


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
	const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
	const dispatch = useDispatch()

	const addTaskHandler = (title: string) => {
			dispatch(addTaskAC(title, id))
	}
	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch(ChangeTodolistFilterAC(id, filter))
	}
	const changeTaskStatusHandler=(taskID:string,newIsDone:boolean)=>{
		dispatch(changeTaskStatusAC(taskID, newIsDone, id))
	}
	const changeTaskTitleHandler=(title:string,taskID:string)=>{
		dispatch(changeTaskTitleAC(taskID, title, id))
	}
	// const removeTodolistHandler = () => {
	//
	// }

	const changeTodolistTitleHandler = (title: string) => {
		dispatch(ChangeTodolistTitleAC(id, title))
	}
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

							const removeTaskHandler = () => {
								dispatch(removeTaskAC(task.id, id))
							}
							// const changeTaskStatusHandler=(event:ChangeEvent<HTMLInputElement>)=>{
							// 	changeStatusIsDone(task.id,event.currentTarget.checked)
							// }

							return <ListItem
								sx={getListItemSx(task.isDone)}
								disablePadding={true}
								key={task.id}
								className={task.isDone? s.isDone : ''}>
								<div>
									<Checkbox
										color={'secondary'}
										checked={task.isDone}
										onChange={(event)=>changeTaskStatusHandler(task.id,event.currentTarget.checked)}>
									</Checkbox>
									<EditableSpan title={task.title} changeTitle={(title)=>changeTaskTitleHandler( title, task.id)}/>
								</div>

								<IconButton
									color={"error"}
									onClick={removeTaskHandler} aria-label="delete">
									<DeleteForeverIcon />
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button

					size={"small"}
					className= {filter === 'all' ? s.activeFilter : ''}
					color={filter === 'all' ? "secondary" : "primary"}
					variant={'contained'}
					onClick={()=> changeFilterTasksHandler('all')}
				>
					All
					</Button>
				<Button

					size={"small"}
					className= {filter === 'active' ? s.activeFilter : ''}
					color={filter === 'active' ? "secondary" : "primary"}
					variant={'contained'}
					onClick={()=> changeFilterTasksHandler('active')}
				>
					Active
				</Button>
				<Button

					size={"small"}
					className= {filter === 'completed' ? s.activeFilter : ''}
					color={filter === 'completed' ? "secondary" : "primary"}
					variant={'contained'}
					onClick={()=> changeFilterTasksHandler('completed')}
				>
					Completed
				</Button>
			</Box>
		</div>
	)
}
