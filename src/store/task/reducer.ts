import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import TaskService from "../../service/TaskService";
import Task from "../../models/Task";
import TaskStore from "../../models/TaskStore";
import { ACTION_TYPE } from "../../constants/ActionType";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodoName,
  updateTodoStatus,
} from "../../api/todo";
import { FILTER_CONDITION } from "../../constants/FilterCondition";
import { loginGithub } from "../../api/user";

export type TaskAction = {
  actionType: ACTION_TYPE;
  task: Task;
};

export type FilterConditionAction = {
  filterCondition: number;
};

const initialState = {
  taskList: [],
  filterCondition: FILTER_CONDITION.ALL,
  isLogin: false,
} as TaskStore;
const taskService = new TaskService();

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    updateFilterCondition: (
      state: TaskStore,
      actionParams: PayloadAction<FilterConditionAction>
    ) => {
      return {
        ...state,
        filterCondition: actionParams.payload.filterCondition,
      };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TaskStore>) => {
    builder.addCase(getAllTodos.fulfilled, (state: TaskStore, action) => {
      return taskService.executeStrategy(action.payload.action, state, {
        task: {} as Task,
        taskList: action.payload.data,
      });
    });
    builder.addCase(createTodo.fulfilled, (state: TaskStore, action) => {
      return taskService.executeStrategy(action.payload.action, state, {
        task: action.payload.data,
      });
    });
    builder.addCase(deleteTodo.fulfilled, (state: TaskStore, action) => {
      return taskService.executeStrategy(action.payload.action, state, {
        task: action.payload.data,
      });
    });
    builder.addCase(updateTodoName.fulfilled, (state: TaskStore, action) => {
      return taskService.executeStrategy(action.payload.action, state, {
        task: action.payload.data,
      });
    });
    builder.addCase(updateTodoStatus.fulfilled, (state: TaskStore, action) => {
      return taskService.executeStrategy(action.payload.action, state, {
        task: action.payload.data,
      });
    });
    [getAllTodos, createTodo, deleteTodo, updateTodoName, updateTodoStatus].map(
      (item) => {
        builder.addCase(item.rejected, (state: TaskStore, action) => {
          localStorage.removeItem("token");
          localStorage.removeItem("thought-user");
          return { ...state, isLogin: false };
        });
      }
    );
    builder.addCase(loginGithub.fulfilled, (state: TaskStore, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("thought-user", action.payload.user);
      return { ...state, isLogin: true };
    });
  },
});

export const { updateFilterCondition } = taskListSlice.actions;

export default taskListSlice.reducer;
