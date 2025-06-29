import { createSlice } from "@reduxjs/toolkit";

const todolistSlice = createSlice({
  name: "todolist",
  initialState: {
    createtodolist: {
      isFetching: false,
      success: false,
      error: false,
    },
    gettodolist: {
      isFetching: false,
      listTask: [],
      error: false,
    },
    updatetodolist:{
      isFetching: false,
      listTaskUpdate: [],
      error: false,
    }
  },
  reducers: {
    createtodolistStart: (state) => {
      state.createtodolist.isFetching = true;
    },
    createtodolistSuccess: (state) => {
      state.createtodolist.isFetching = false;
      state.createtodolist.success = true;
      state.createtodolist.error = false;
    },
    createtodolistFailed: (state) => {
      state.createtodolist.isFetching = false;
      state.createtodolist.error = true;
    },
    gettodolistStart: (state) => {
      state.gettodolist.isFetching = true;
    },
    gettodolistSuccess: (state, action) => {
      state.gettodolist.isFetching = false;
      state.gettodolist.listTask = action.payload;
      state.gettodolist.error = false;
    },
    gettodolistFailed: (state) => {
      state.gettodolist.isFetching = false;
      state.gettodolist.error = true;
    },
    updatetodolistStart: (state) =>{
      state.updatetodolist.isFetching = true;
    },
    updatetodolistSuccess: (state, action) =>{
      state.updatetodolist.isFetching = false;
      state.updatetodolist.listTaskUpdate = action.payload;
      state.updatetodolist.error = false;
    },
    updatetodolistFailed: (state) =>{
      state.updatetodolist.isFetching = false;
      state.updatetodolist.error = true;
    },
    deletetodolistStart:(state)=>{
      state.createtodolist.isFetching = true;
    },
    deletetodolistSuccess:(state)=>{
      state.createtodolist.isFetching = false;
      state.createtodolist.success = true;
      state.createtodolist.error = false;
    },
    deletetodolistFailed:(state)=>{
      state.createtodolist.isFetching = false;
      state.createtodolist.error = true;

    },
  },
});

export const {
  createtodolistStart,
  createtodolistSuccess,
  createtodolistFailed,
  gettodolistStart,
  gettodolistSuccess,
  gettodolistFailed,
  updatetodolistStart,
  updatetodolistSuccess,
  updatetodolistFailed,
  deletetodolistStart,
  deletetodolistSuccess,
  deletetodolistFailed
} = todolistSlice.actions;
export default todolistSlice.reducer;
