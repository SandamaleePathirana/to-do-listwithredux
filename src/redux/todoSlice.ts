import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../component/Event";
import { v4 as uuidv4 } from "uuid";

const initialState = [] as Todo[];

const todolist = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (description: string, deadline:number) => ({
        payload: {
          id: uuidv4(),
          description,
          deadline,
          completed: false,
        } as Todo,
      }),
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
      const index2 = state.findIndex((tododeadline) => tododeadline.id === action.payload);
      state.splice(index, 1);
    },
    setTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
      const index2 = state.findIndex((tododeadline) => tododeadline.id === action.payload.id);
      state[index2].completed = action.payload.completed;
    },
  },
});

export const { addTodo, removeTodo, setTodoStatus } = todolist.actions;
export default todolist.reducer;