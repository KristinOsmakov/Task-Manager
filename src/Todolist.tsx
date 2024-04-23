import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import s from './Todolist.module.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
}

export const Todolist = (
	{	title,
		tasks,
		filter,
		todolistId,
		addTask,
		removeTask,
		changeTaskStatus,
		changeTodolistFilter,
		removeTodolist}: PropsType) => {
	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)
	// const [filterValue, setFilterValue] = useState('all')


	const addTaskHandler = () => {
		if(taskTitle.trim()){
			addTask(taskTitle.trim(), todolistId)
			setTaskTitle('')
		}
		else{
			setError(null)
		}

	}
	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
		setError('Title is required')
	}
	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}
	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeTodolistFilter(filter, todolistId)
	}

	const changeTaskStatusHandler=(taskID:string,newIsDone:boolean)=>{
		changeTaskStatus(taskID, newIsDone, todolistId)
	}
	// const removeTodolistHandler = () => {
	//
	// }
	return (
		<div>
			<h3>{title}
			<Button title={'X'} onClick={()=>removeTodolist(todolistId)}/>
			</h3>
			<div>
				<input
					className={error? s.error: ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				{error && <div className={s.errorMessage}>{error}</div>}
			</div>
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
								<span>{task.title}</span>
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
