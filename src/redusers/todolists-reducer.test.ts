import {
    AddTodolistAC,
    AddTodolistActionType, ChangeTodolistFilter,
    ChangeTodolistTitle, RemoveTodolistAC,
    RemoveTodolistsActionType,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'



test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // 2. Действие
    // const action: RemoveTodolistsActionType = {
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         todolistId: todolistId1,
    //     },
    // }
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action: AddTodolistActionType = {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         title: 'New Todolist',
    //     },
    // }
    const newTodolistTitle = "New Todolist"
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})




test('change todolist title', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action: ChangeTodolistTitle = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         todolistID: todolistId2,
    //         title: 'Title',
    //     },
    // }
    const newChangeTitle = 'Title';
    const endState = todolistsReducer(startState, ChangeTodolistTitle(todolistId2, newChangeTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newChangeTitle)
})

test('change todolist filter', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action: ChangeTodolistFilter = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     payload: {
    //         todolistID: todolistId2,
    //         filter: 'active',
    //     },
    // }
    const ChangeTodolistF = 'active';
    const endState = todolistsReducer(startState, ChangeTodolistFilter(todolistId2, ChangeTodolistF))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(ChangeTodolistF)
})