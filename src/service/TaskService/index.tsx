import {ACTION_TYPE} from "../../constants/ActionType";
import TaskList from "../../models/TaskList";
import Task from "../../models/Task";
import defaultTaskList from "../../default/defaultTaskList.json"

export default class TaskService {

    private readonly taskStrategyMap;

    constructor() {
        this.taskStrategyMap = {
            [ACTION_TYPE.DEFAULT]: this.getTaskList,
            [ACTION_TYPE.ADD_TASK]: this.addNewTask,
            [ACTION_TYPE.DELETE_TASK]: this.deleteTask,
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private getTaskList = (preTaskList: TaskList, input: Task): TaskList => {
        return defaultTaskList;
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
        actionType = actionType ?? ACTION_TYPE.DEFAULT;
        return this.taskStrategyMap[actionType](preTaskList, input);
    }
}
