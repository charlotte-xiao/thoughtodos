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
  private getTaskList = (preTaskStore: TaskStore, input: Task): TaskStore => {
    return defaultTaskList;
  };

  private addNewTask = (preTaskStore: TaskStore, input: Task): TaskStore => {
    // Todo: Generate Unique ID in Back-End
    preTaskStore.taskList.unshift({
      ...input,
      id: new Date().getTime(),
      isCompleted: false,
    });
    return preTaskStore;
  };

  private deleteTask = (preTaskStore: TaskStore, input: Task): TaskStore => {
    const updatedTodoList = preTaskStore.taskList.filter(
      (task: Task) => task.id !== input.id
    );
    return { ...preTaskStore, taskList: updatedTodoList };
  };

  private switchTaskState = (
    preTaskStore: TaskStore,
    input: Task
  ): TaskStore => {
    const preTaskState = input.isCompleted;
    const updateTask = { ...input, isCompleted: !preTaskState };
    const updatedTaskList = preTaskStore.taskList.filter(
      (task: Task) => task.id !== input.id
    );
    if (preTaskState) {
      updatedTaskList.unshift(updateTask);
    } else {
      updatedTaskList.push(updateTask);
    }
    return { ...preTaskStore, taskList: updatedTaskList };
  };

  private updateTaskName = (
    preTaskStore: TaskStore,
    input: Task
  ): TaskStore => {
    const updatedTaskList = preTaskStore.taskList.map((task: Task) =>
      task.id === input.id ? { ...task, name: input.name } : task
    );
    return { ...preTaskStore, taskList: updatedTaskList };
  };

  executeStrategy = (
    actionType: ACTION_TYPE,
    preTaskStore: TaskStore,
    input: Task
  ): TaskStore => {
    actionType = actionType ?? ACTION_TYPE.DEFAULT;
    return this.taskStrategyMap[actionType](preTaskStore, input);
  };
}
