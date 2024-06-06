import {
    AddTodolistAC,
    AddTodolistActionType, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC,
    RemoveTodolistsActionType,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})
test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {


    const newTodolistTitle = "New Todolist"
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})
test('change todolist title', () => {

    const newChangeTitle = 'Title';
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newChangeTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newChangeTitle)
})
test('change todolist filter', () => {

    const ChangeTodolistF = 'active';
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, ChangeTodolistF))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(ChangeTodolistF)
})
