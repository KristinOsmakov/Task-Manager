import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "What to buy"
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 1, title: "HTML", isDone: true},
        {id: 1, title: "HTML", isDone: false},
    ]
    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Ice-cream", isDone: true},
        {id: 1, title: "Milk", isDone: true},
        {id: 1, title: "Chocolate", isDone: false},
    ]
    return (
        <div className="App">
            <Todolist title={todoListTitle_1} tasks={tasks_1}/>
            <Todolist title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
