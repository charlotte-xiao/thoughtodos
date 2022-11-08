import React, {ChangeEvent, KeyboardEvent} from "react";
import Task from "../../models/Task";
import styled from "styled-components";
import {ACTION_TYPE} from "../../constants/ActionType";
import {connect} from "react-redux";
import {TaskAction, TaskDispatch} from "../../store/Store";
import {Action} from "@reduxjs/toolkit";
import moment from "moment";
import TaskList from "../../models/TaskList";
import {TaskFilterCondition} from "../../constants/TaskFilterCondition";

const Container = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const NowDate = styled.div`
  font-weight: bolder;
  font-size: 2rem;
  color: #495862;
  text-align: left;
`

const ShowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    font-weight: normal;
    font-size: 1.5rem;
    color: darkgray;
    flex: 1;
    text-align: left;
  }
`

const Button = styled.input`
  color: #7f95a3;
  background-color: white;
  font-size: medium;
  font-weight: bolder;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem;
  margin-left: 1rem;
  border: 0;
  border-radius: 1rem;

  &.is_active {
    color: white;
    background-color: #7f95a3;
  }
`;

const Input = styled.input`
  font-size: larger;
  width: 100%;
  height: 2rem;
  border: 0;

  ::-webkit-input-placeholder {
    color: #7f95a3;
  }

  :focus {
    outline: none;
    border-bottom: 0.1rem solid gray;
  }
`;

type AddTaskProps = {
    amount: number
    handleAddTask(taskName: string): void;
    changeTaskFilterCondition(taskFilterCondition: number): void;
}

type AddTaskState = {
    taskName: string,
    taskFilterCondition: number
}

class AddTaskComponent extends React.Component<AddTaskProps, AddTaskState> {

    constructor(props: AddTaskProps) {
        super(props);
        this.state = {
            taskName: '',
            taskFilterCondition: TaskFilterCondition.ALL
        }
    }

    handleAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            this.props.handleAddTask(this.state.taskName);
        }
    }

    handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({taskName: event.target.value})
    }
    handleChangeTaskFilterCondition = (condition: number) => {
        this.setState({...this.state, taskFilterCondition: condition});
        this.props.changeTaskFilterCondition(condition);
    }

    render() {
        return (
            <Container>
                <NowDate>{moment().format('dddd MMMM D YYYY')}</NowDate>
                <ShowBox>
                    <div>{this.props.amount} tasks</div>
                    {
                        Object.entries(TaskFilterCondition).map((condition) => (
                            <Button type="button" value={condition[0]} key={condition[1]}
                                    className={condition[1] === this.state.taskFilterCondition ? 'is_active' : ''}
                                    onClick={() => {
                                        this.handleChangeTaskFilterCondition(condition[1])
                                    }}/>
                        ))
                    }
                </ShowBox>
                <Input type="text" value={this.state.taskName}
                       onKeyDown={this.handleAddTask}
                       onChange={this.handleChangeTaskName}
                       placeholder="Add a new task..."/>
            </Container>);
    }

}

const mapStateToProps = (state: TaskList) => {
    return {
        amount: state.todoList.length + state.completedList.length,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskComponent);
