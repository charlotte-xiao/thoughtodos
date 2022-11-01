import React from "react";
import defaultTaskList from "../../default/defaultTaskList.json"
import useTaskList from "../../hooks/useTaskList";
import TaskContextParams from "../../models/TaskContextParams";

export const TaskContext: React.Context<TaskContextParams> = React.createContext({} as TaskContextParams,);

type TaskListProviderProps = {
    children: React.ReactNode;
};

export const TaskProvider: React.FC<TaskListProviderProps> = ({children}: TaskListProviderProps) => {
    // Todo: GET DATA FROM API
    const {taskList, updateTaskList} = useTaskList(defaultTaskList);

    return (
        <TaskContext.Provider value={{taskList, updateTaskList}}>
            {children}
        </TaskContext.Provider>
    );
};
