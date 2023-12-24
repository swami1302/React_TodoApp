import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo, deleteAll, toggleDone } from './todos';
import { DeleteOutlined } from '@ant-design/icons';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  
  const [filter, setFilter] = useState('all');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(
        addTodo({
          id: new Date().getTime(),
          text: newTodo,
          done: false,
        })
      );
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAll());
  };

  const handleEditTodo = (id, text) => {
    const editedText = prompt('Edit task:', text);
    if (editedText) {
      dispatch(editTodo({ id, text: editedText }));
    }
  };

  const handleToggleDone = (id) => {
    dispatch(toggleDone({ id }));
  };

  
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.done;
    } else if (filter === 'completed') {
      return todo.done;
    }
    return true; 
  });

  // Calculate the number of items left
  const itemsLeft = filteredTodos.filter((todo) => !todo.done).length;

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="What to do?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="add-button" onClick={handleAddTodo}>Add</button>
      </div>

      {/* Tabs for filtering */}
      <div className="filter-tabs">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={todo.done ? 'done' : ''}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggleDone(todo.id)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.text}</span>
            <button className="edit-button" onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
            <DeleteOutlined className="delete-button custom-delete-button" onClick={() => handleDeleteTodo(todo.id)}/>
            {/* <DeleteOutlined /> */}
          </li>
        ))}
      </ul>
      <button
        className="delete-all-button"
        onClick={() => handleDeleteAll()}
      >
        Delete All
      </button>

      {/* Counter for items left */}
      <p className="items-left">{itemsLeft} Items left</p>
    </div>
  );
}

export default App;
