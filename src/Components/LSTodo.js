import React, { useState, useEffect } from "react";
import { nanoid } from '@reduxjs/toolkit';

const LSTodo = () => {

    const [editingTodo, setEditingTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [input, setInput] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [todosList, setTodosList] = useState([]);
    const [change, setChange] = useState("");


    useEffect(() => {
            setTodosList(JSON.parse(localStorage.getItem('todos')));
    }, [])

    const toggleVisibility = (id, text) => {
        setEditingTodo(id);
        setIsEditing(true);
        setChange(text);
        setRefresh(true);
    }

    const handleSave = (id) => {
        if (change) {
            const todoToUpdate = todosList.find((todo) => todo.id === id);
            if (todoToUpdate) {
                todoToUpdate.text = change;
            }
            localStorage.setItem('todos', JSON.stringify(todosList))
            setIsEditing(false);
            setRefresh(true)
        }
    }

    const handleRemove = (id) => {

        const todoRemove = todosList.filter((todo) => todo.id !== id)
        setTodosList(todoRemove);
        setRefresh(true);
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todosList))
    }, [todosList, refresh])

    const addTodoHandler = (e) => {
        const todo = {
            id: nanoid(),
            text: input
        }
        setTodosList([...todosList, todo]);
        e.preventDefault()
        setRefresh(true)
        setInput('')
    }


    return (
        <div className="bg-secondary text-white">
            <form onSubmit={addTodoHandler} className="bg-secondary text-center">
                <input type="text" placeholder="Enter a Todo" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" className="btn btn-primary">Add Todo</button>
            </form>
            <ul className="text-center">
                {todosList.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <div className="fw-bold">{todo.text}</div>
                            <button onClick={() => handleRemove(todo.id)} className="btn btn-danger">Delete</button>
                            {isEditing && editingTodo === todo.id ?
                                (<>
                                    <input type="text" placeholder="Update Todo" value={change} onChange={(e) => setChange(e.target.value)} />
                                    <button onClick={() => handleSave(todo.id)} className="btn btn-success">Save</button>
                                </>)
                                :
                                (<button onClick={() => toggleVisibility(todo.id, todo.text)} className="btn btn-warning">Update</button>)
                            }
                        </li>
                    )
                })}
                <button >Clear All</button>
            </ul>
        </div>
    )
}
export default LSTodo;