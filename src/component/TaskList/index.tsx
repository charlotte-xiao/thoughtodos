import React from "react";
import Task from "../../models/Task";

export default class TaskList extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = props.taskList;
    }

    render() {
        return (
            this.state.map((task: Task, index: number) => (
                <div key={index}>{task.name}</div>
            ))
        )
    }
}
