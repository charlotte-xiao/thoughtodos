import React from "react";
import TaskList from "../../models/TaskList";
import defaultTaskList from "../../default/defaultTaskList.json"

export const TaskListContext: React.Context<TaskList> = React.createContext({} as TaskList,);

type TaskListProviderProps = {
    children: React.ReactNode;
};

export const TaskListProvider: React.FC<TaskListProviderProps> = ({children}: TaskListProviderProps) => {
    // Todo: GET DATA FROM API
    const initTaskList = defaultTaskList;
    return (
        <TaskListContext.Provider value={initTaskList}>
            {children}
        </TaskListContext.Provider>
    );
};
