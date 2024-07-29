import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Circle, Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Outlet} from "react-router-dom";
import {logoutTC, meTC} from "../features/Login/auth.reducer";
import {CircularProgress} from "@mui/material";



function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInit = useAppSelector(state => state.auth.isInit)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log(1)
        dispatch(meTC())
    }, []);

    console.log(isInit)
    if(!isInit) return <CircularProgress/>
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={()=>{dispatch(logoutTC())}} color="inherit">Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Outlet/>
            </Container>
        </div>
    )
}

export default App
