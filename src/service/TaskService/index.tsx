import {ACTION_TYPE} from "../../constants/ActionType";
import TaskList from "../../models/TaskList";
import Task from "../../models/Task";

export default class TaskService {

    private readonly taskStrategyMap;

    constructor() {
        this.taskStrategyMap = {
            [ACTION_TYPE.ADD_TASK]: this.addNewTask,
        }
    }

    executeStrategy = (actionType: ACTION_TYPE, preTaskList: TaskList, input: Task): TaskList => {
        return this.taskStrategyMap[actionType](preTaskList, input);
    }

    addNewTask = (preTaskList: TaskList, input: Task): TaskList => {
        preTaskList.todoList.push(input);
        return {...preTaskList};
    };
}
