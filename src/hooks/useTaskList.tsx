import {useState} from "react";
import TaskList from "../models/TaskList";
import TaskService from "../service/TaskService";
import {ACTION_TYPE} from "../constants/ActionType";
import Task from "../models/Task";

const useTaskList = (defaultTaskList: TaskList) => {
    const [taskList, setTaskList] = useState(defaultTaskList);
    const taskService = new TaskService();

    const updateTaskList = (actionType: ACTION_TYPE, task: Task): void => {
        const updatedTaskList = taskService.executeStrategy(actionType, taskList, task);
        setTaskList(updatedTaskList);
    };

    return {taskList, updateTaskList};
}

export default useTaskList;
