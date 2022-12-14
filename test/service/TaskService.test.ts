import TaskService from "../../src/service/TaskService";
import { ACTION_TYPE } from "../../src/constants/ActionType";
import Task from "../../src/models/Task";
import { FILTER_CONDITION } from "../../src/constants/FilterCondition";

describe("Task Service", () => {
  test("should add new Task", () => {
    const taskService = new TaskService();
    const preTaskList = {
      taskList: [],
      filterCondition: FILTER_CONDITION.ALL,
      isLogin: true,
    };
    const newTask = { name: "new Task" } as Task;

    const updatedTaskList = taskService.executeStrategy(
      ACTION_TYPE.ADD_TASK,
      preTaskList,
      { task: newTask }
    );

    expect(updatedTaskList.taskList).toHaveLength(1);
    expect(updatedTaskList.taskList[0].name).toBe(newTask.name);
  });

  test("should switch Task State", () => {
    const taskService = new TaskService();
    const todoTask = { id: "1", name: "new Task", isCompleted: false };
    const preTaskList = {
      taskList: [todoTask],
      filterCondition: FILTER_CONDITION.ALL,
      isLogin: true,
    };

    const updatedTaskList = taskService.executeStrategy(
      ACTION_TYPE.SWITCH_TASK_STATE,
      preTaskList,
      { task: todoTask }
    );

    expect(updatedTaskList.taskList).toHaveLength(1);
    expect(updatedTaskList.taskList[0].id).toBe(todoTask.id);
    expect(updatedTaskList.taskList[0].name).toBe(todoTask.name);
    expect(updatedTaskList.taskList[0].isCompleted).toBe(todoTask.isCompleted);
  });

  test("should delete Task", () => {
    const taskService = new TaskService();
    const completedTask = { id: "1", name: "new Task", isCompleted: true };
    const preTaskList = {
      taskList: [],
      filterCondition: FILTER_CONDITION.ALL,
      isLogin: true,
    };

    const updatedTaskList = taskService.executeStrategy(
      ACTION_TYPE.DELETE_TASK,
      preTaskList,
      { task: completedTask }
    );

    expect(updatedTaskList.taskList).toHaveLength(0);
  });

  test("should update Task Name", () => {
    const taskService = new TaskService();
    const completedTask = { id: "1", name: "task", isCompleted: true };
    const preTaskList = {
      taskList: [completedTask],
      filterCondition: FILTER_CONDITION.ALL,
      isLogin: true,
    };

    const updatedTaskList = taskService.executeStrategy(
      ACTION_TYPE.UPDATE_TASK_NAME,
      preTaskList,
      { task: { ...completedTask, name: "new Name" } }
    );

    expect(updatedTaskList.taskList).toHaveLength(1);
    expect(updatedTaskList.taskList[0].name).toBe("new Name");
  });
});
