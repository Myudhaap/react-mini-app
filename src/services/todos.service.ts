import type { ITodo, ITodoReq } from "../interfaces/todo";
import type { IFilter } from "../pages/todos/page";

let todos: ITodo[] = [{ id: 1, text: "Learn Redux Saga Toolkit", status: false, category: 'kerja' }];

export const fetchTodos = (payload?: IFilter) =>
  new Promise((resolve) => {
    if (payload) {
      let todosFilter = todos;
      if (payload.category != '')
        todosFilter = todosFilter.filter(val => val.category == payload.category)
      if (payload.status != '')
        todosFilter = todosFilter.filter(val => val.status == (payload.status == 'done' ? true : false))
      if (payload.q != '')
        todosFilter = todosFilter.filter(val => val.text.includes(payload.q))
      setTimeout(() => resolve([...todosFilter]), 500)
    } else {
      setTimeout(() => resolve([...todos]), 500)
    }
  });

export const addTodo = (payload: ITodoReq) =>
  new Promise((resolve) => {
    const newTodo: ITodo = { id: Date.now(), status: false,  ...payload};
    todos.push(newTodo);
    setTimeout(() => resolve(newTodo), 500);
});

export const getTodoById = (payload: number) => 
  new Promise((resolve) => {
    const todo: ITodo | null = todos.find(val => val.id == payload) ?? null
    setTimeout(() => resolve(todo), 500)
  })

export const updateTodo = (payload: ITodoReq) => 
  new Promise((resolve) => {
    todos = todos.map(todo =>
      todo.id === payload.id
        ? { ...todo, text: payload.text, category: payload.category }
        : todo
    );
    setTimeout(() => resolve(todos), 500)
  })

export const updateStatusTodo = (payload: number) => {
  new Promise((resolve) => {
    todos = todos.map(todo =>
      todo.id === payload
        ? { ...todo, status: !todo.status }
        : todo
    );
    setTimeout(() => resolve(todos), 500)
  })
}

export const deleteTodo = (id: number) =>
  new Promise((resolve) => {
    const index = todos.findIndex(val => val.id == id)
    todos.splice(index, 1)
    setTimeout(() => resolve(id), 500);
});