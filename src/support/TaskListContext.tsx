import React from "react";
import TaskList from "../models/TaskList";

export const TaskListContext: React.Context<TaskList> = React.createContext(
    {} as TaskList,
);

type TaskListProviderProps = {
    children: React.ReactNode;
};

export const TaskListProvider: React.FC<TaskListProviderProps> = ({children}: TaskListProviderProps) => {
    const initTaskList = {
        todoList: [{name: "123"}, {name: "test"}],
        completedList: [{name: "123"}, {name: "test"}]
    }
    return (
        <TaskListContext.Provider value={initTaskList}>
            {children}
        </TaskListContext.Provider>
    );
};
