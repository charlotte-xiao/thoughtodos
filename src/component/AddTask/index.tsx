import React from "react";
import Task from "../../models/Task";

export default class AddTask extends React.Component<any, any> {

    addNewTask = () => {
        const tempTask: Task = {
            name: "temp",
            isCompleted: false,
        }
        this.props.toggleTaskList(tempTask);
    }

    render() {
        return ( <input type="button" onClick={this.addNewTask} value = "Add Task"/>);
    }
}
