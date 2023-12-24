import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: JSON.parse(localStorage.getItem('todos')) || [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    editTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], text: action.payload.text };
      }
    },
    deleteAll: (state) => {
      state.length = 0;
    },
    toggleDone: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], done: !state[index].done };
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo, deleteAll, toggleDone } = todoSlice.actions;

export default todoSlice.reducer;
