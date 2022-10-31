import React, {useState} from "react";
import defaultTaskList from "../../default/defaultTaskList.json"
import Task from "../../models/Task";
import TaskContextParams from "../../models/TaskContextParams";
import {ACTION_TYPE} from "../../constants/ActionType";
import TaskService from "../../service/TaskService";
import TaskList from "../../models/TaskList";

export const TaskContext: React.Context<TaskContextParams> = React.createContext({} as TaskContextParams,);

type TaskListProviderProps = {
    children: React.ReactNode;
};

const taskService: TaskService = new TaskService();

export const TaskProvider: React.FC<TaskListProviderProps> = ({children}: TaskListProviderProps) => {
    // Todo: GET DATA FROM API
    const [taskList, setTaskList] = useState(defaultTaskList);
    const [taskContextParams, setTaskContextParams] = useState({
        taskList: taskList,
        toggleTaskList: (actionType: ACTION_TYPE, task: Task) => {
            const updatedTaskList: TaskList = taskService.executeStrategy(actionType, taskList, task);
            setTaskList(updatedTaskList);
            setTaskContextParams({...taskContextParams, taskList: updatedTaskList});
        }
    })

    return (
        <TaskContext.Provider value={taskContextParams}>
            {children}
        </TaskContext.Provider>
    );
};
