import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Task from "../models/Task";
import { ACTION_TYPE } from "../constants/ActionType";

const BASE_URL = "http://127.0.0.1:7700";
const TODO_API_PREFIX = {
  GET_ALL_TODO: "getAllTodo",
  CREATE_TODO: "createTodo",
  DELETE_TODO: "deleteTodo",
  UPDATE_TODO: "updateTodo",
};

const getAllTodos = createAsyncThunk(TODO_API_PREFIX.GET_ALL_TODO, async () => {
  const { data } = await axios.get(`${BASE_URL}/todo`);
  const formatData = data.map(
    (item: { _id: string; title: string; status: string }) => {
      return {
        id: item._id,
        name: item.title,
        isCompleted: item.status === "COMPLETED",
      };
    }
  );
  return {
    action: ACTION_TYPE.DEFAULT,
    data: formatData,
  };
});

const createTodo = createAsyncThunk(
  TODO_API_PREFIX.CREATE_TODO,
  async (task: Task) => {
    const { data } = await axios.post(`${BASE_URL}/todo`, {
      title: task.name,
      description: "description",
      status: "Active",
      startDate: "2020-01-01",
      dueDate: "2023-01-01",
    });
    const formatData = {
      id: data._id,
      name: data.title,
      isCompleted: false,
    };
    return {
      action: ACTION_TYPE.ADD_TASK,
      data: formatData,
    };
  }
);

const deleteTodo = createAsyncThunk(
  TODO_API_PREFIX.DELETE_TODO,
  async (task: Task) => {
    const { data } = await axios.delete(`${BASE_URL}/todo/${task.id}`);
    return { id: data._id } as Task;
  }
);

const updateTodo = createAsyncThunk(
  TODO_API_PREFIX.UPDATE_TODO,
  async (task: Task) => {
    const { data } = await axios.put(`${BASE_URL}/todo/${task.id}`, {
      title: task.name,
      description: "description",
      status: "ACTIVE",
    });
    return {
      id: data._id,
      name: data.title,
      isCompleted: false,
    };
  }
);

export { getAllTodos, createTodo, deleteTodo, updateTodo };