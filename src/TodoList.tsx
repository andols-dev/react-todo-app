import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {
    interface Todo {
        id: string;
        text: string;
    }

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    // Läsa från localStorage vid komponentens första render
    useEffect(() => {
        const storedTodos = localStorage.getItem('todoList');
        if (storedTodos) {
            setTodoList(JSON.parse(storedTodos));
        }
    }, []);

    // Spara till localStorage varje gång todoList förändras
    useEffect(() => {
        // Spara till localStorage om todoList förändras
        if (todoList.length > 0) {
            localStorage.setItem('todoList', JSON.stringify(todoList));
        }
    }, [todoList]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo.trim() === '') return;
        const newTodoItem = { id: uuidv4(), text: newTodo };
        setTodoList(prevTodoList => {
            const updatedTodoList = [...prevTodoList, newTodoItem];
            return updatedTodoList;
        });

        e.currentTarget.reset();
    };

    const updateTodo = (id: string, text: string) => {
        setTodoList(prevTodoList => {
            const updatedTodoList = prevTodoList.map(todo => 
                todo.id === id ? { ...todo, text } : todo
            );
            return updatedTodoList;
        });
    };

    const deleteTodo = (id: string) => {
        setTodoList(prevTodoList => {
            const updatedTodoList = prevTodoList.filter(todo => todo.id !== id);
            return updatedTodoList;
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Todo List</h1>
            <form onSubmit={handleSubmit} className="d-flex mb-4">
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Add a new todo"
                    className="form-control me-2"
                />
                <button type="submit" className="btn btn-primary">Add</button>
            </form>

            <ul className="list-group">
                {todoList.map(todo => (
                    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {todo.text}
                        <div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="btn btn-danger btn-sm ms-2"
                                aria-label={`Delete todo ${todo.text}`}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    const newText = prompt('Update todo', todo.text);
                                    if (newText) updateTodo(todo.id, newText);
                                }}
                                className="btn btn-warning btn-sm ms-2"
                            >
                                Update
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
