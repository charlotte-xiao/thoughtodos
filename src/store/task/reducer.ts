import defaultTaskList from "../../default/defaultTaskList.json";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TaskService from "../../service/TaskService";
import Task from "../../models/Task";
import TaskStore from "../../models/TaskStore";
import { ACTION_TYPE } from "../../constants/ActionType";

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
      return taskService.executeStrategy(
        actionParams.payload.actionType,
        state,
        actionParams.payload.task
      );
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
});

export const { updateTaskList, updateFilterCondition } = taskListSlice.actions;

export default taskListSlice.reducer;
