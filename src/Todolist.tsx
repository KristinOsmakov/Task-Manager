import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import s from './Todolist.module.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
	todolistId: string
	title: string
	tasks: TaskType[]
	filter: FilterValuesType

	removeTask: (taskId: string, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus:(taskId:string,newIsDone:boolean, todolistId: string)=>void

	changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
	removeTodolist: (todolistId: string) => void

	changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
	changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = (
	{	title,
		tasks,
		filter,
		todolistId,
		addTask,
		removeTask,
		changeTaskStatus,
		changeTodolistTitle,
		changeTaskTitle,
		changeTodolistFilter,
		removeTodolist}: PropsType) => {

	const addTaskHandler = (title: string) => {
			addTask(title, todolistId)
	}
	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeTodolistFilter(filter, todolistId)
	}
	const changeTaskStatusHandler=(taskID:string,newIsDone:boolean)=>{
		changeTaskStatus(taskID, newIsDone, todolistId)
	}
	const changeTaskTitleHandler=(title:string,taskID:string)=>{
		changeTaskTitle(taskID, title, todolistId)
	}
	// const removeTodolistHandler = () => {
	//
	// }

	const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(title, todolistId)
	return (
		<div>
			<h3><EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
			<Button title={'X'} onClick={()=>removeTodolist(todolistId)}/>
			</h3>


			<AddItemForm addItem={addTaskHandler}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}
							// const changeTaskStatusHandler=(event:ChangeEvent<HTMLInputElement>)=>{
							// 	changeStatusIsDone(task.id,event.currentTarget.checked)
							// }

							return <li key={task.id} className={task.isDone? s.isDone : ''}>
								<input
									type="checkbox"
									checked={task.isDone}
									onChange={(event)=>changeTaskStatusHandler(task.id,event.currentTarget.checked)}
								/>
								<EditableSpan title={task.title} changeTitle={(title)=>changeTaskTitleHandler( title, task.id)}/>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className= {filter === 'all' ? s.activeFilter : ''} title={'All'} onClick={()=> changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? s.activeFilter : ''} title={'Active'} onClick={()=> changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? s.activeFilter : ''} title={'Completed'} onClick={()=> changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
