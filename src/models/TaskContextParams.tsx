import TaskList from "./TaskList";
import Task from "./Task";
import {ACTION_TYPE} from "../constants/ActionType";

export default interface TaskContextParams {
    taskList: TaskList,
    updateTaskList: UpdateTaskList
}

export interface UpdateTaskList {
    (actionType: ACTION_TYPE, task: Task): void
}
