import defaultTaskList from "../../default/defaultTaskList.json";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TaskService from "../../service/TaskService";
import Task from "../../models/Task";
import TaskList from "../../models/TaskList";
import { ACTION_TYPE } from "../../constants/ActionType";

export type TaskAction = {
  actionType: ACTION_TYPE;
  task: Task;
};

const initialState = defaultTaskList as TaskList;

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    updateTaskList: (
      state: TaskList,
      actionParams: PayloadAction<TaskAction>
    ) => {
      const taskService = new TaskService();
      return taskService.executeStrategy(
        actionParams.payload.actionType,
        state,
        actionParams.payload.task
      );
    },
  },
});

export const { updateTaskList } = taskListSlice.actions;

export default taskListSlice.reducer;
