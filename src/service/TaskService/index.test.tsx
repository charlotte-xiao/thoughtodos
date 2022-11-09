import TaskService from "./index";
import {ACTION_TYPE} from "../../constants/ActionType";
import Task from "../../models/Task";

describe("Task Service", () => {

    test("should add new Task", () => {
        const taskService = new TaskService();
        const preTaskList = {taskList: []};
        const newTask = {name: 'new Task'} as Task;

        const updatedTaskList =
            taskService.executeStrategy(ACTION_TYPE.ADD_TASK, preTaskList, newTask);

        expect(updatedTaskList.taskList).toHaveLength(1);
        expect(updatedTaskList.taskList[0].name).toEqual(newTask.name);
    });

    test("should switch Task State", () => {
        const taskService = new TaskService();
        const todoTask = {id: 1, name: 'new Task', isCompleted: false};
        const preTaskList = {taskList: [todoTask]};

        const updatedTaskList =
            taskService.executeStrategy(ACTION_TYPE.SWITCH_TASK_STATE, preTaskList, todoTask);

        expect(updatedTaskList.taskList).toHaveLength(1);
        expect(updatedTaskList.taskList[0].id).toEqual(todoTask.id);
        expect(updatedTaskList.taskList[0].name).toEqual(todoTask.name);
        expect(updatedTaskList.taskList[0].isCompleted).toEqual(!todoTask.isCompleted);
    });

    test("should delete Task", () => {
        const taskService = new TaskService();
        const completedTask = {id: 1, name: 'new Task', isCompleted: true};
        const preTaskList = {taskList: []};

        const updatedTaskList =
            taskService.executeStrategy(ACTION_TYPE.DELETE_TASK, preTaskList, completedTask);

        expect(updatedTaskList.taskList).toHaveLength(0);
    });

})
