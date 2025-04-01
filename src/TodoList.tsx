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
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Add a new todo"
                />
                <button type="submit">Add</button>
            </form>

            <h1>Todo List</h1>
            <ul>
                {todoList.map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                        <span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                aria-label={`Delete todo ${todo.text}`}
                            >
                                delete
                            </button>
                        </span>
                        <span>
                            <button
                                onClick={() => {
                                    const newText = prompt('Update todo', todo.text);
                                    if (newText) updateTodo(todo.id, newText);
                                }}
                            >
                                update
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TodoList;
