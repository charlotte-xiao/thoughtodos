import Task from "./Task";

export default interface TaskList {
    todoList: Array<Task>;
    completedList: Array<Task>;
}
