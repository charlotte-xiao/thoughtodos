import TaskList from "./TaskList";
import Task from "./Task";

export default interface TaskListProps {
    taskList: TaskList,
    toggleTaskList: ToggleTaskList
}

interface ToggleTaskList {
    (task: Task): void
}
