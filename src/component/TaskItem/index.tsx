import React from "react";
import styled from "styled-components";
import DeleteImageURL from "../../assets/delete.png"
import {ACTION_TYPE} from "../../constants/ActionType";
import Task from "../../models/Task";
import {TaskAction, TaskDispatch} from "../../store/Store";
import {Action} from "@reduxjs/toolkit";
import {connect} from "react-redux";

const Item = styled.li`
  height: 4rem;
  line-height: 4rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;

  .is_completed {
    color: #E2E8F0;;
    text-decoration: line-through;
  }
`

const Info = styled.div`
  padding-left: 1.5rem;
  text-align: left;
  flex: 1;
`

const Img = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-radius: 2rem;

  :hover {
    background-color: rgb(237, 242, 247);
  }
`

type TaskProps = {
    task: Task;
    handleDeleteTask(id: number): void;
    handleSwitchTaskState(task: Task): void;
}

class TaskItemComponent extends React.Component<TaskProps, never> {

    handleDeleteTask = () => {
        this.props.handleDeleteTask(this.props.task.id);
    }

    handleSwitchTaskState = () => {
        this.props.handleSwitchTaskState(this.props.task);
    }

    render() {
        return (
            <Item data-testid='task-item'>
                <input
                    type="checkbox"
                    defaultChecked={this.props.task.isCompleted}
                    className="input-checkbox"
                    onClick={this.handleSwitchTaskState}
                />
                <Info className={this.props.task.isCompleted ? 'is_completed' : ''}>{this.props.task.name}</Info>
                <Img src={DeleteImageURL} alt="Delete Task" onClick={this.handleDeleteTask}/>
            </Item>

        )
    }

}

const mapDispatchToProps = (dispatch: TaskDispatch) => {
    return {
        handleDeleteTask: (id: number) => {
            const taskAction: Action<TaskAction> = {
                type: {
                    actionType: ACTION_TYPE.DELETE_TASK,
                    task: {id: id,} as Task
                }
            }
            dispatch(taskAction);
        },
        handleSwitchTaskState: (task: Task) => {
            const taskAction: Action<TaskAction> = {
                type: {
                    actionType: ACTION_TYPE.SWITCH_TASK_STATE,
                    task: task
                }
            }
            dispatch(taskAction);
        }
    }
}

export default connect(null, mapDispatchToProps)(TaskItemComponent);
