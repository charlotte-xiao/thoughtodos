import { RootState } from "../index";
import Task from "../../models/Task";
import { FILTER_CONDITION } from "../../constants/FilterCondition";

const filterTaskList = (
  perTaskList: Task[],
  filterCondition: number
): Task[] => {
  let filteredTaskList;
  switch (filterCondition) {
    case FILTER_CONDITION.ACTIVE:
      filteredTaskList = perTaskList.filter((task) => !task.isCompleted);
      break;
    case FILTER_CONDITION.COMPLETED:
      filteredTaskList = perTaskList.filter((task) => task.isCompleted);
      break;
    default:
      filteredTaskList = [...perTaskList];
  }
  return filteredTaskList;
};

export const getTaskList = (state: RootState): Task[] => {
  const { taskList, filterCondition } = state.taskReducer;
  return filterTaskList(taskList, filterCondition);
};

export const getAmount = (state: RootState): number => {
  const { taskList, filterCondition } = state.taskReducer;
  return filterTaskList(taskList, filterCondition).length;
};

export const getFilterCondition = (state: RootState): number => {
  return state.taskReducer.filterCondition;
};

export const getIsLogin = (state: RootState): boolean => {
  return state.taskReducer.isLogin;
};
