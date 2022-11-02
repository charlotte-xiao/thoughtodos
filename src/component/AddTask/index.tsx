import React, {ChangeEvent} from "react";
import Task from "../../models/Task";
import styled from "styled-components";
import {ACTION_TYPE} from "../../constants/ActionType";
import TaskContextParams from "../../models/TaskContextParams";
import {TaskContext} from "../../pages/TaskPage/TaskContext";

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

type AddTaskState = {
    taskName: string
}

export default class AddTaskComponent extends React.Component<any, AddTaskState> {

    static contextType: React.Context<TaskContextParams> = TaskContext;
    context!: React.ContextType<typeof TaskContext>;

    constructor(props: never) {
        super(props);
        this.state = {taskName: ''}
    }

    handleAddTask = () => {
        this.context.updateTaskList(ACTION_TYPE.ADD_TASK, {name: this.state.taskName,} as Task);
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
