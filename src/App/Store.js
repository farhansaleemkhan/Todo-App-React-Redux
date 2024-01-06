import {combineReducers, configureStore} from "@reduxjs/toolkit";
import todoReducer from '../Features/Todo/todoSlice';

// const root = {todo : todoReducer};

// const rootReducer = combineReducers(root);

export const Store = configureStore({
    reducer: todoReducer
    // reduer: rootReducer,
})