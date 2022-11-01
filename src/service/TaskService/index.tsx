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

    private addNewTask = (preTaskList: TaskList, input: Task): TaskList => {
        // Todo: Generate Unique ID in Back-End
        preTaskList.todoList.push({...input, id: new Date().getTime()});
        return {...preTaskList};
    };

    executeStrategy = (actionType: ACTION_TYPE, preTaskList: TaskList, input: Task): TaskList => {
        return this.taskStrategyMap[actionType](preTaskList, input);
    }
}
