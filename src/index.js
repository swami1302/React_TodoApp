import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import todosReducer from './todos';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);