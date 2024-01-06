import {createSlice, nanoid } from '@reduxjs/toolkit';
 
const initialState = {
    todos: [{
        id: 1, text: "Hello World"
    }]
}

export const todoSlice = createSlice({
   name: "todo",
   initialState,
   reducers: {
     addTodo: (state, action) => {
        const todo = {
            id: nanoid(),
            text: action.payload
        }
        state.todos.push(todo)

        //Save todos to local storage
        localStorage.setItem('todos', JSON.stringify(state.todos))
     },
     removeTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)

        //remove the data from local storgae
        localStorage.setItem('todos', JSON.stringify(state.todos.filter((todo) => todo.id !== action.payload)))
    },

     updateTodo: (state, action) => {
        const {id, input} = action.payload;
        const todoToUpdate = state.todos.find((todo) => todo.id === id);
        if(todoToUpdate){
            todoToUpdate.text = input;
        }
        //update todo from local storage
        localStorage.setItem('todos', JSON.stringify(state.todos))
     }
   }
}) 

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions;

export default todoSlice.reducer;