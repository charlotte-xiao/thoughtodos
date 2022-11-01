import React from "react";
import defaultTaskList from "../../default/defaultTaskList.json"
import useTaskList from "../../hooks/useTaskList";
import TaskList from "../../models/TaskList";
import {ACTION_TYPE} from "../../constants/ActionType";
import Task from "../../models/Task";

export const TaskContext: React.Context<TaskContextParams> = React.createContext({} as TaskContextParams,);

type TaskListProviderProps = {
    children: React.ReactNode;
};

type TaskContextParams = {
    taskList: TaskList;
    updateTaskList: UpdateTaskList
}

type UpdateTaskList = {
    (actionType: ACTION_TYPE, task: Task): void
}

export const TaskProvider: React.FC<TaskListProviderProps> = ({children}: TaskListProviderProps) => {
    // Todo: GET DATA FROM API
    const {taskList, updateTaskList} = useTaskList(defaultTaskList);

    return (
        <TaskContext.Provider value={{taskList, updateTaskList}}>
            {children}
        </TaskContext.Provider>
    );
};
