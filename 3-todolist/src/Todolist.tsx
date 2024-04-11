import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {useRef, useState, KeyboardEvent, ChangeEvent} from "react";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (newTitle: string)=>void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {
	const [newTitle, setNewTitle] = useState('')

	// const setAllTasksHandler = () => {
	// 	changeFilter('all')
	// }
	//
	// const setActiveTasksHandler = () => {
	// 	changeFilter('active')
	// }
	//
	// const setCompletedTasksHandler = () => {
	// 	changeFilter('completed')
	// }
	const setTaskHandler = (value: FilterValuesType) => {
		changeFilter(value)
	}

	const onKeyDownHandler = (event:KeyboardEvent)=>{
			if (event.key === "Enter"){
				addTaskHandler()
			}

	}
	const mappedTask = tasks.length === 0
		? <p>Тасок нет</p>
		: <ul>
			{tasks.map(task => {
				const removeTaskHandler =()=> {
					removeTask(task.id)
				}
				return (
					<li key={task.id}>
						<input type="checkbox" checked={task.isDone}/>
						<span>{task.title}</span>
						<button title={'x'} onClick={removeTaskHandler}></button>
					</li>
				)
			})}
		</ul>
	const onChangeHandler = (event:ChangeEvent<HTMLInputElement>)=> {
		setNewTitle(event.currentTarget.value)
	}
	// const removeTaskHandler = (taskId:string) => removeTask(taskId)
	const addTaskHandler = () => {
		addTask(newTitle)
		setNewTitle('')
	}
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input value={newTitle} onChange={onChangeHandler}
					   onKeyDown={onKeyDownHandler}
				/>
				{/*<button onClick={addTaskHandler}>X</button>*/}
				<Button title={'+'} starter={addTaskHandler}/>
				{mappedTask}

				{/*<input ref={inputRef}/>*/}
				{/*<button onClick={() => {*/}
				{/*	if (inputRef.current) {*/}
				{/*		addTask(inputRef.current.value)*/}
				{/*		inputRef.current.value='';*/}
				{/*	}*/}
				{/*}}>X</button>*/}
			</div>
			{
			}
			<div>
				<Button title={'All'} starter={()=>setTaskHandler('all')}/>
				<Button title={'Active'} starter={()=>setTaskHandler('active')}/>
				<Button title={"Completed"} starter={()=>setTaskHandler('completed')}/>
			</div>
		</div>
	)
}
