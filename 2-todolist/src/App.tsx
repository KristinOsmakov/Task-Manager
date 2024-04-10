import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
	const [tasks, setTasks]  = useState<Array<TaskType>>([
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
	])

	const removeTask = (taskId: number) => {
		// const newState = []
		// for (let i = 0; i < tasks.length; i++) {
		// 	if(tasks[i].id !== taskId) {
		// 		newState.push(tasks[i])
		// 	}
		// }
		const newState = tasks.filter(t=> t.id !== taskId)
		setTasks(newState)
	}
	const [filter, setFilter] = useState<FilterValuesType>("all")

	const changeTodoListFilter = (nextFilter: FilterValuesType) => {
		setFilter(nextFilter)
	}
	const getTasksForTodoList = (allTasks: Array<TaskType>, nextFilterValue: FilterValuesType) => {
		switch (nextFilterValue) {
			case "active":
				return allTasks.filter(t => t.isDone === false);
			case "completed":
				return allTasks.filter(t => t.isDone === true);
			default:
				return allTasks;
		}
	}
	const tasksForTodolist = getTasksForTodoList(tasks, filter)


	return (
		<div className="App">
			<Todolist title="What to learn"
					  tasks={tasksForTodolist}
					  removeTask={removeTask}
					  changeTodoListFilter={changeTodoListFilter}
			/>
		</div>
	);
}

export default App;
