import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: number) => void
	changeTodoListFilter: (nextFilter: FilterValuesType) => void
}

export const Todolist = ({title, tasks, removeTask, changeTodoListFilter}: PropsType) => {

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input/>
				<Button changeTodoListFilter={changeTodoListFilter} title={'+'}/>
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {
							const removeTaskHandler = () => removeTask(task.id)
							return <li key={task.id}><input type="checkbox" checked={task.isDone}/>
								<span>{task.title}</span>
								<button onClick={removeTaskHandler}>X</button>
							</li>
						})}
					</ul>
			}
			<div>
				{/*<button onClick={()=> changeTodoListFilter("all")}>All</button>*/}
				{/*<button onClick={()=> changeTodoListFilter("active")}>Active</button>*/}
				{/*<button onClick={()=> changeTodoListFilter("completed")}>Completed</button>*/}

				<Button changeTodoListFilter={() => {changeTodoListFilter("all")}} title={'All'}/>
				<Button changeTodoListFilter={() => {changeTodoListFilter("active")}} title={'Active'}/>
				<Button changeTodoListFilter={() => {changeTodoListFilter("completed")}} title={'Completed'}/>

			</div>
		</div>
	)
}
