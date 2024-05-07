import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Switch,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {MenuButton} from "./MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ThemeMode = 'dark' | 'light'
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

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId? {...t, title} : t)})
    }


    //CRUD TODOLIST
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {

        setTodolists(todolists.map(tl=> tl.id === todolistId ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    const addTodolist = (title: string) => {
        // const newTodo: TodolistType = {
        //     id: v1(),
        //     title: title,
        //     filter: 'all'
        // }
        // setTodolists(([...todolists, newTodo]))
        // setTasks({...tasks, [newTodo.id]:[]})

    }

    const changeTodolistTitle = (title: string, todolistId: string) => {

        setTodolists(todolists.map(tl=> tl.id === todolistId ? {...tl, title} : tl))
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
            <Grid item key={tl.id}>
                <Paper sx={{p: '15px'}} elevation={8}>
                    <Todolist
                        // key={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodolist}
                        todolistId={tl.id}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}

                        changeTodolistFilter={changeTodolistFilter}
                        removeTodolist={removeTodolist}

                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })


    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div" sx={{flexGrow: 1}}>
                            Todolists
                        </Typography>
                        <Switch color={'default'} onChange={changeModeHandler} />
                        <MenuButton >Login</MenuButton>
                        <MenuButton >Logout</MenuButton>
                        <MenuButton
                        background={theme.palette.primary.dark}
                        btnColor={theme.palette.primary.contrastText}
                        >Faq</MenuButton>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container sx={{p: "10px"}} justifyContent={"center"}>
                        <AddItemForm addItem={addTodolist} />
                    </Grid>
                    <Grid container spacing={4}>
                        {todolistsComponents}
                    </Grid>
                </Container>

            </ThemeProvider>
        </div>
    );
}

export default App;
