import { ACTION_TYPE } from "../../constants/ActionType";
import TaskStore from "../../models/TaskStore";
import Task from "../../models/Task";
import defaultTaskList from "../../default/defaultTaskList.json";

export default class TaskService {
  private readonly taskStrategyMap;

  constructor() {
    this.taskStrategyMap = {
      [ACTION_TYPE.DEFAULT]: this.getTaskList,
      [ACTION_TYPE.ADD_TASK]: this.addNewTask,
      [ACTION_TYPE.DELETE_TASK]: this.deleteTask,
      [ACTION_TYPE.SWITCH_TASK_STATE]: this.switchTaskState,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private getTaskList = (preTaskList: TaskStore, input: Task): TaskStore => {
    return defaultTaskList;
  };

  private addNewTask = (preTaskList: TaskStore, input: Task): TaskStore => {
    // Todo: Generate Unique ID in Back-End
    preTaskList.taskList.push({
      ...input,
      id: new Date().getTime(),
      isCompleted: false,
    });
    return preTaskList;
  };

  private deleteTask = (preTaskList: TaskStore, input: Task): TaskStore => {
    const updatedTodoList = preTaskList.taskList.filter(
      (task: Task) => task.id !== input.id
    );
    return { ...preTaskList, taskList: updatedTodoList };
  };

  private switchTaskState = (
    preTaskList: TaskStore,
    input: Task
  ): TaskStore => {
    const preTaskState = input.isCompleted;
    const updatedTaskList = preTaskList.taskList
      .filter((task: Task) => task.id !== input.id)
      .concat({ ...input, isCompleted: !preTaskState });
    return { ...preTaskList, taskList: updatedTaskList };
  };

  executeStrategy = (
    actionType: ACTION_TYPE,
    preTaskList: TaskStore,
    input: Task
  ): TaskStore => {
    actionType = actionType ?? ACTION_TYPE.DEFAULT;
    return this.taskStrategyMap[actionType](preTaskList, input);
  };
}
