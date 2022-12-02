import defaultTaskList from "../../default/defaultTaskList.json";
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import TaskService from "../../service/TaskService";
import Task from "../../models/Task";
import TaskStore from "../../models/TaskStore";
import { ACTION_TYPE } from "../../constants/ActionType";
import { createTodo, deleteTodo, getAllTodos } from "../../api/todo";

export type TaskAction = {
  actionType: ACTION_TYPE;
  task: Task;
};

export type FilterConditionAction = {
  filterCondition: number;
};

const initialState = defaultTaskList as TaskStore;
const taskService = new TaskService();

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    updateTaskList: (
      state: TaskStore,
      actionParams: PayloadAction<TaskAction>
    ) => {
      // return taskService.executeStrategy(
      //   actionParams.payload.actionType,
      //   state,
      //   actionParams.payload.task
      // );
    },
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
  },
});

export const { updateTaskList, updateFilterCondition } = taskListSlice.actions;

export default taskListSlice.reducer;
