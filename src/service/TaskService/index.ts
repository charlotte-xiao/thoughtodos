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
      [ACTION_TYPE.UPDATE_TASK_NAME]: this.updateTaskName,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private getTaskList = (preTaskList: TaskStore, input: Task): TaskStore => {
    return defaultTaskList;
  };

  private addNewTask = (preTaskList: TaskStore, input: Task): TaskStore => {
    // Todo: Generate Unique ID in Back-End
    preTaskList.taskList.unshift({
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
    const updateTask = { ...input, isCompleted: !preTaskState };
    const updatedTaskList = preTaskList.taskList.filter(
      (task: Task) => task.id !== input.id
    );
    if (preTaskState) {
      updatedTaskList.unshift(updateTask);
    } else {
      updatedTaskList.push(updateTask);
    }
    return { ...preTaskList, taskList: updatedTaskList };
  };

  private updateTaskName = (preTaskList: TaskStore, input: Task): TaskStore => {
    const updatedTaskList = preTaskList.taskList.map((task: Task) =>
      task.id === input.id ? { ...task, name: input.name } : task
    );
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
