import {legacy_createStore as createStore} from 'redux'
import TaskService from "../service/TaskService";
import TaskList from "../models/TaskList";
import defaultTaskLit from "../default/defaultTaskList.json"
import {ACTION_TYPE} from "../constants/ActionType";
import Task from "../models/Task";
import {Action} from "@reduxjs/toolkit";

export type TaskReducer = {
    (state: TaskList | undefined, actionParams: Action<TaskAction>): TaskList
}

export type TaskAction = {
    actionType: ACTION_TYPE,
    task: Task
}

export type TaskDispatch = {
    (actionParams: Action<TaskAction>): void
}

const taskReducer: TaskReducer = (state = defaultTaskLit, actionParams) => {
    const taskService = new TaskService();
    return taskService.executeStrategy(actionParams.type.actionType, state, actionParams.type.task);
};

// Todo: OUT OF DATE API
export const store = createStore(taskReducer);
