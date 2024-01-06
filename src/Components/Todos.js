import React, {useState, useEffect} from "react";
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeTodo , updateTodo } from '../Features/Todo/todoSlice'

const Todos = () => {

    // const todos = useSelector(state => state.todos);
    
    const todos = JSON.parse(localStorage.getItem('todos'));
    console.log(todos)

    const dispatch = useDispatch();
    
    const [editingTodo, setEditingTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [input, setInput] = useState("");

    const toggleVisibility = (id, text) => {
        setEditingTodo(id);
        setIsEditing(true);
        setInput(text)
    }

    const handleSave = (id) => {
        if(input){
            dispatch(updateTodo({id,  input}))
            setIsEditing(false);
        }
    }


    return (
        <div className="bg-secondary text-white">
            <ul className="text-center">
                {todos.map((todo)=>{
                    return(
                        <li key={todo.id}>
                        <div className="fw-bold">{todo.text}</div>
                        <button onClick={() => dispatch(removeTodo(todo.id))} className="btn btn-danger">Delete</button>
                        {isEditing && editingTodo === todo.id ?
                        (<>
                        <input type="text" placeholder="Update Todo" value={input} onChange={(e) => setInput(e.target.value)} />
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

export default Todos;




