import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskState = {
    [todolistId: string]: Array<TaskType>
}

function App() {

    //DATA
    const todolist_1 = v1()
    const todolist_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {
            id: todolist_1,
            title: 'What to learn',
            filter: 'all'},
        {
            id: todolist_2,
            title: 'What to buy',
            filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskState>(
        {
            [todolist_1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
            ],
            [todolist_2]: [
                {id: v1(), title: 'Beer', isDone: true},
                {id: v1(), title: 'Meat', isDone: true},
                {id: v1(), title: 'Knife', isDone: false},
            ],
        }
    )


    //CRUD TASKS
    const removeTask = (taskId: string, todolistId: string) => {
        // const todolistTasks = tasks[todolistId]
        // const filteredTasks = todolistTasks.filter((task) => {
        //     return task.id !== taskId
        // })
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = filteredTasks
        // setTasks(copyTasks)

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const updatedTasks = [newTask, ...tasks[todolistId]]
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = updatedTasks
        // setTasks(copyTasks)
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }



    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId? {...t, isDone: isDone} : t)})
    }


    //CRUD TODOLIST
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {

        setTodolists(todolists.map(tl=> tl.id === todolistId ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    //UI
    const todolistsComponents: Array<JSX.Element> | JSX.Element = ! todolists.length
        ? <span>У вас нет списка с задачами</span>
        : todolists.map(tl => {

            let tasksForTodolist = tasks[tl.id]
            if (tl.filter === 'active') {
                tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
            }
            if (tl.filter === 'completed') {
                tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
            }

    // const todolistComponents =

        return (
            <Todolist
                key={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodolist}
                todolistId={tl.id}

                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}

                changeTodolistFilter={changeTodolistFilter}
                removeTodolist={removeTodolist}
            />
        )
    })


    return (
        <div className="App">
            {todolistsComponents}
        </div>
    );
}

export default App;
