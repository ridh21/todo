"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // Add createdAt to the Todo interface
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    axios.get<Todo[]>('http://localhost:3001/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const handleCreateTodo = async () => {
    if (newTitle) {
      try {
        const response = await axios.post('http://localhost:3001/todos', {
          title: newTitle,
          description: newDescription,
        });
        setTodos((prevTodos) => [...prevTodos, response.data]);
        setNewTitle('');
        setNewDescription('');
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My To-Do List</h1>
      <div className="bg-white text-black shadow-lg rounded-lg p-6 w-full max-w-md">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateTodo}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add To-Do
        </button>
      </div>
      <ul className="mt-8 w-full max-w-md">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white shadow-lg rounded-lg p-4 mb-4 flex justify-between items-start"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{todo.title}</h2>
              <p className="text-gray-600 mt-1">{todo.description}</p>
              <p className="text-gray-500 mt-1 text-sm">
                Created on: {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
