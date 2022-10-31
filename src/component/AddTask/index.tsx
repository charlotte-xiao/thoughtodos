import React, {ChangeEvent} from "react";
import Task from "../../models/Task";

export default class AddTask extends React.Component<any, any> {

    constructor(props: never) {
        super(props);
        this.state = {
            name: ''
        }
    }

    addNewTask = () => {
        const newTask: Task = {
            name: this.state.name,
            isCompleted: false,
        }
        this.props.toggleTaskList(newTask);
    }

    toggleTaskName = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        return (
            <>
                <input type="text" value={this.state.name} onChange={this.toggleTaskName}/>
                <input type="button" onClick={this.addNewTask} value="Add Task"/>
            </>);
    }

}
