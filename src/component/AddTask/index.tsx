import React, {ChangeEvent} from "react";
import Task from "../../models/Task";
import styled from "styled-components";

const Input = styled.input`
  font-size: larger;
  width: 50%;
  height: 2rem;
  padding: 0.5rem;
`;

const Button = styled.input`
  color: white;
  font-size: larger;
  font-weight: bolder;
  background-color: rgb(29, 161, 242);
  width: 15%;
  height: 3rem;
  padding: 0.5rem;
  margin-left: 1rem;
  border-color: white;
  border-radius: 0.25rem;
`;


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
                <Input type="text" value={this.state.name} onChange={this.toggleTaskName} placeholder="Please Input New Task Name"/>
                <Button type="button" onClick={this.addNewTask} value="Add Task"/>
            </>);
    }

}