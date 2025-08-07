import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todoReducer from "./todos/todoSlice"
import locationReducer from "./location/locationSlice"
import { todoSaga } from "./todos/todoSaga";
import { locationSaga } from "./location/locationSaga";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        locations: locationReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({thunk: false}).concat(sagaMiddleware)
})

sagaMiddleware.run(todoSaga)
sagaMiddleware.run(locationSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;