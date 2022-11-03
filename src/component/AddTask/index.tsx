import React, {ChangeEvent} from "react";
import Task from "../../models/Task";
import styled from "styled-components";
import {ACTION_TYPE} from "../../constants/ActionType";
import {connect} from "react-redux";
import {TaskAction, TaskDispatch} from "../../store/Store";
import {Action} from "@reduxjs/toolkit";

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
    handleAddTask(taskName: string): void;
}

type AddTaskState = {
    taskName: string
}

class AddTaskComponent extends React.Component<AddTaskProps, AddTaskState> {

    constructor(props: AddTaskProps) {
        super(props);
        this.state = {taskName: ''}
    }

    handleAddTask = () => {
        this.props.handleAddTask(this.state.taskName);
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

const mapDispatchToProps = (dispatch: TaskDispatch) => {
    return {
        handleAddTask: (taskName: string) => {
            const taskAction: Action<TaskAction> = {
                type: {
                    actionType: ACTION_TYPE.ADD_TASK,
                    task: {name: taskName,} as Task
                }
            }
            dispatch(taskAction);
        }
    }
}

export default connect(null, mapDispatchToProps)(AddTaskComponent);
