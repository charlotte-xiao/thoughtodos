import { ACTION_TYPE } from "../../constants/ActionType";
import TaskStore from "../../models/TaskStore";
import Task from "../../models/Task";

type InputContext = {
  task: Task;
  taskList?: Task[];
};

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

  private getTaskList = (
    preTaskStore: TaskStore,
    input: InputContext
  ): TaskStore => {
    preTaskStore.taskList = input.taskList ?? [];
    return preTaskStore;
  };

  private addNewTask = (
    preTaskStore: TaskStore,
    input: InputContext
  ): TaskStore => {
    preTaskStore.taskList.unshift({
      ...input.task,
    });
    return preTaskStore;
  };

  private deleteTask = (
    preTaskStore: TaskStore,
    input: InputContext
  ): TaskStore => {
    const updatedTodoList = preTaskStore.taskList.filter(
      (task: Task) => task.id !== input.task.id
    );
    return { ...preTaskStore, taskList: updatedTodoList };
  };

  private switchTaskState = (
    preTaskStore: TaskStore,
    input: InputContext
  ): TaskStore => {
    const updatedTaskList = preTaskStore.taskList.map((task) => {
      return task.id === input.task.id ? input.task : task;
    });
    return { ...preTaskStore, taskList: updatedTaskList };
  };

  private updateTaskName = (
    preTaskStore: TaskStore,
    input: InputContext
  ): TaskStore => {
    const updatedTaskList = preTaskStore.taskList.map((task: Task) =>
      task.id === input.task.id ? { ...task, name: input.task.name } : task
    );
    return { ...preTaskStore, taskList: updatedTaskList };
  };

  executeStrategy = (
    actionType: ACTION_TYPE,
    preTaskStore: TaskStore,
    input: InputContext
  ): TaskStore => {
    actionType = actionType ?? ACTION_TYPE.DEFAULT;
    return this.taskStrategyMap[actionType](preTaskStore, input);
  };
}
