import React from "react";
import TaskList from "../../models/TaskList";

export const TaskListContext: React.Context<TaskList> = React.createContext(
    {} as TaskList,
);

type TaskListProviderProps = {
    children: React.ReactNode;
};

export const TaskListProvider: React.FC<TaskListProviderProps> = ({children}: TaskListProviderProps) => {
    const initTaskList = {
        todoList: [{name: "todoTask1"}, {name: "todoTask2"}],
        completedList: [{name: "completedTask1"}, {name: "completedTask2"}]
    }
    return (
        <TaskListContext.Provider value={initTaskList}>
            {children}
        </TaskListContext.Provider>
    );
};
