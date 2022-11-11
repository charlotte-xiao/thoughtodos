import { RootState } from "../index";
import TaskList from "../../models/TaskList";

export const getTaskList = (state: RootState): TaskList => {
  return state.task;
};

export const getAmount = (state: RootState): number => {
  return state.task.taskList.length;
};
