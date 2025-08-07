import {createSlice} from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        todo: null,
        loading: false,
        error: false,
        message: '',
    },
    reducers: {
        getTodos: (state, action) => {
            state.loading = true
        },
        getTodoById: (state, action) => {
            state.loading = true
        },
        addTodos: (state, action) => {
            state.loading = true            
        },
        updateTodos: (state, action) => {
            state.loading = true
        },
        updateStatusTodo: (state, action) => {
            state.loading = true
        },
        deleteTodos: (state, action) => {
            state.loading = true
        },

        setTodos: (state, action) => {
            state.loading = false
            state.todos = action.payload
        },
        setTodo: (state, action) => {
            state.loading = false
            state.todo = action.payload
        },
        resetTodo: (state) => {
            state.todo = null
        }
    }
})

export const {
    addTodos,
    updateTodos,
    getTodos,
    deleteTodos,
    setTodos,
    getTodoById,
    setTodo,
    resetTodo,
    updateStatusTodo
} = todoSlice.actions

export default todoSlice.reducer