import TaskService from "./index";
import {ACTION_TYPE} from "../../constants/ActionType";
import TaskList from "../../models/TaskList";
import Task from "../../models/Task";

describe("Task Service", () => {

    test("should add new Task", () => {
        const taskService = new TaskService();
        const preTaskList = {todoList: [], completedList: [],} as TaskList;
        const newTask = {name: 'new Task'} as Task;

        const updatedTaskList =
            taskService.executeStrategy(ACTION_TYPE.ADD_TASK, preTaskList, newTask);

        expect(updatedTaskList.todoList).toHaveLength(1);
        expect(updatedTaskList.completedList).toHaveLength(0);
        expect(updatedTaskList.todoList[0].name).toEqual(newTask.name);

    });

    test("should switch Task State", () => {
        const taskService = new TaskService();
        const todoTask = {id: 1, name: 'new Task', isCompleted: false};
        const preTaskList = {todoList: [todoTask], completedList: [],} as TaskList;

        const updatedTaskList =
            taskService.executeStrategy(ACTION_TYPE.SWITCH_TASK_STATE, preTaskList, todoTask);

        expect(updatedTaskList.todoList).toHaveLength(0);
        expect(updatedTaskList.completedList).toHaveLength(1);
        expect(updatedTaskList.completedList[0].id).toEqual(todoTask.id);
        expect(updatedTaskList.completedList[0].name).toEqual(todoTask.name);
        expect(updatedTaskList.completedList[0].isCompleted).toEqual(!todoTask.isCompleted);

    });

    test("should delete Task", () => {
        const taskService = new TaskService();
        const completedTask = {id: 1, name: 'new Task', isCompleted: true};
        const preTaskList = {todoList: [], completedList: [completedTask],} as TaskList;

        const updatedTaskList =
            taskService.executeStrategy(ACTION_TYPE.DELETE_TASK, preTaskList, completedTask);

        expect(updatedTaskList.todoList).toHaveLength(0);
        expect(updatedTaskList.completedList).toHaveLength(0);

    });

})
