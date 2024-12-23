import { useState, useEffect } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const[todos, setTodos] = useState([]);

  function addTodo (todo) {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  }

  function updateTodo (id, todo) {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  }

  function deleteTodo (id) {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  }

  function toggleComplete (id) {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)));
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm /> 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => {
                          return (
                            <div className='w-full' key={todo.id}>
                              <TodoItem todo={todo} />
                            </div>
                          )
                        })}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
