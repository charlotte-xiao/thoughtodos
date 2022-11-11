import Task from "./Task";

export default interface TaskStore {
  taskList: Task[];
  filterCondition: number;
}
