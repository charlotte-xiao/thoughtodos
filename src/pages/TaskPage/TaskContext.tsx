import React, {useState} from "react";
import defaultTaskList from "../../default/defaultTaskList.json"
import Task from "../../models/Task";
import TaskListProps from "../../models/TaskListProps";

export const TaskContext: React.Context<TaskListProps> = React.createContext({} as TaskListProps,);

type TaskListProviderProps = {
    children: React.ReactNode;
};

export const TaskProvider: React.FC<TaskListProviderProps> = ({children}: TaskListProviderProps) => {
    // Todo: GET DATA FROM API
    const [taskList, setTaskList] = useState(defaultTaskList);
    const [taskListParam, setTaskListParam] = useState({
        taskList: taskList,
        toggleTaskList: (task: Task) => {
            taskList.todoList.push(task);
            setTaskList(taskList);
            setTaskListParam({...taskListParam, taskList});
        }
    })

    return (
        <TaskContext.Provider value={taskListParam}>
            {children}
        </TaskContext.Provider>
    );
};
