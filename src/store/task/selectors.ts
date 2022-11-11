import { RootState } from "../index";
import TaskStore from "../../models/TaskStore";

export const getTaskList = (state: RootState): TaskStore => {
  return state.task;
};

export const getAmount = (state: RootState): number => {
  return state.task.taskList.length;
};
