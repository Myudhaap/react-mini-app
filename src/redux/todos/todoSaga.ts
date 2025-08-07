import { call, put, takeEvery } from 'redux-saga/effects'
import * as api from '../../services/todos.service'
import {addTodos, deleteTodos, getTodoById, getTodos, setTodo, setTodos, updateStatusTodo, updateTodos } from './todoSlice'
import type { ITodo, ITodoReq } from '../../interfaces/todo'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IFilter } from '../../pages/todos/page'

function* handleGetTodos(action: PayloadAction<IFilter | undefined>){
    const todos: ITodo[] = yield call(api.fetchTodos, action?.payload ?? undefined)
    yield put(setTodos(todos))
}

function* handleGetTodoById(action: PayloadAction<number>){
    const todo: ITodo = yield call(api.getTodoById, action.payload)
    yield put(setTodo(todo))
}

function* handleAddTodos(action: PayloadAction<ITodoReq>){
    yield call(api.addTodo, action.payload)
    yield call(handleGetTodos)
}

function* handleUpdateTodos(action: PayloadAction<ITodoReq>){
    yield call(api.updateTodo, action.payload)
    yield call(handleGetTodos)
}

function* handleUpdateStatusTodoById(action: PayloadAction<number>){
    yield call(api.updateStatusTodo, action.payload)
    yield call(handleGetTodos)
}

function* handleDeleteTodoById(action: PayloadAction<number>){
    yield call(api.deleteTodo, action.payload)
    yield call(handleGetTodos)
}

export function* todoSaga(){
    yield takeEvery(getTodos.type, handleGetTodos);
    yield takeEvery(addTodos.type, handleAddTodos);
    yield takeEvery(updateTodos.type, handleUpdateTodos);
    yield takeEvery(getTodoById.type, handleGetTodoById);
    yield takeEvery(updateStatusTodo.type, handleUpdateStatusTodoById);
    yield takeEvery(deleteTodos.type, handleDeleteTodoById);
}