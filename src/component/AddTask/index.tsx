import React, {ChangeEvent} from "react";
import Task from "../../models/Task";
import styled from "styled-components";
import {ACTION_TYPE} from "../../constants/ActionType";
import {UpdateTaskList} from "../../models/TaskContextParams";

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

type AddTaskProps = {
    updateTaskList: UpdateTaskList
}

type AddTaskState = {
    taskName: string
}

export default class AddTask extends React.Component<AddTaskProps, AddTaskState> {

    constructor(props: AddTaskProps) {
        super(props);
        this.state = {taskName: ''}
    }

    handleAddTask = () => {
        const newTask: Task = {name: this.state.taskName,} as Task;
        this.props.updateTaskList(ACTION_TYPE.ADD_TASK, newTask);
    }

    handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({taskName: event.target.value})
    }

    render() {
        return (
            <>
                <Input type="text" value={this.state.taskName} onChange={this.handleChangeTaskName}
                       placeholder="Please Input New Task Name"/>
                <Button type="button" onClick={this.handleAddTask} value="Add Task"/>
            </>);
    }

}
