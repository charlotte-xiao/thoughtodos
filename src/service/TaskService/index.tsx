import {ACTION_TYPE} from "../../constants/ActionType";
import TaskList from "../../models/TaskList";
import Task from "../../models/Task";

export default class TaskService {

    private readonly taskStrategyMap;

    constructor() {
        this.taskStrategyMap = {
            [ACTION_TYPE.ADD_TASK]: this.addNewTask,
            [ACTION_TYPE.DELETE_TASK]: this.deleteTask,
        }
    }

    private addNewTask = (preTaskList: TaskList, input: Task): TaskList => {
        // Todo: Generate Unique ID in Back-End
        preTaskList.todoList.push({...input, id: new Date().getTime(), isCompleted: false});
        return {...preTaskList};
    };

    private deleteTask = (preTaskList: TaskList, input: Task): TaskList => {
        const updatedTodoList = preTaskList.todoList.filter((task: Task) => task.id !== input.id);
        const updatedCompletedList = preTaskList.completedList.filter((task: Task) => task.id !== input.id);
        return {todoList: updatedTodoList, completedList: updatedCompletedList};
    };

    executeStrategy = (actionType: ACTION_TYPE, preTaskList: TaskList, input: Task): TaskList => {
        return this.taskStrategyMap[actionType](preTaskList, input);
    }
}
