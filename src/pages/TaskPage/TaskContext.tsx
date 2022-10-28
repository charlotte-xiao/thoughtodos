import React from "react";
import TaskList from "../../models/TaskList";
import defaultTaskList from "../../default/defaultTaskList.json"

export const TaskContext: React.Context<TaskList> = React.createContext({} as TaskList,);

type TaskListProviderProps = {
    children: React.ReactNode;
};

export const TaskProvider: React.FC<TaskListProviderProps> = ({children}: TaskListProviderProps) => {
    // Todo: GET DATA FROM API
    const initTaskList = defaultTaskList;
    return (
        <TaskContext.Provider value={initTaskList}>
            {children}
        </TaskContext.Provider>
    );
};
