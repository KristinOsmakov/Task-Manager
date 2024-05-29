import './App.css';
import {Todolist} from "./Todolist";
import {useReducer, useState} from "react";
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
import {AddTodolistAC, RemoveTodolistAC, todolistsReducer} from "./redusers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./redusers/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC} from "./redusers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redusers/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ThemeMode = 'dark' | 'light'
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}



function AppWithRedux() {

    //DATA
    const todolist_1 = v1()
    const todolist_2 = v1()

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    //CRUD TASKS
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }

    //CRUD TODOLIST

    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))

    }
    const removeTodolist = (todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))

    }

    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title))

    }
    const changeTodolistTitle = (todolistId: string, title: string, ) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
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
        <div className="AppWithRedux">
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

export default AppWithRedux;



// let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>, ActionsType>>(todolistsReducer, [
//     {id: todolistId1, title: "What to learn", filter: "all"},
//     {id: todolistId2, title: "What to buy", filter: "all"}
// ])