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
import { TOKEN } from "../../constants/Commom";

export type TaskAction = {
  actionType: ACTION_TYPE;
  task: Task;
};

export type FilterConditionAction = {
  filterCondition: number;
};

export type IsLoginAction = {
  isLogin: boolean;
};

const initialState = {
  taskList: [],
  filterCondition: FILTER_CONDITION.ALL,
  isLogin: !!localStorage.getItem(TOKEN),
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
    setIsLogin: (
      state: TaskStore,
      actionParams: PayloadAction<IsLoginAction>
    ) => {
      return actionParams.payload.isLogin
        ? {
            ...state,
            isLogin: actionParams.payload.isLogin,
          }
        : initialState;
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
  },
});

export const { updateFilterCondition, setIsLogin } = taskListSlice.actions;

export default taskListSlice.reducer;
