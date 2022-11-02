import React from "react";
import styled from "styled-components";
import DeleteImageURL from "../../assets/delete.png"
import {TaskContext} from "../../pages/TaskPage/TaskContext";
import {ACTION_TYPE} from "../../constants/ActionType";
import TaskContextParams from "../../models/TaskContextParams";
import Task from "../../models/Task";

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
}

export default class TaskItemComponent extends React.Component<TaskProps, never> {

    static contextType: React.Context<TaskContextParams> = TaskContext;
    context!: React.ContextType<typeof TaskContext>;

    handleDeleteTask = () => {
        this.context.updateTaskList(ACTION_TYPE.DELETE_TASK, {id: this.props.task.id} as Task);
    }

    render() {
        return (
            <Item data-testid='task-item'>
                <input
                    type="checkbox"
                    defaultChecked={this.props.task.isCompleted}
                    className="input-checkbox"
                />
                <Info className={this.props.task.isCompleted ? 'is_completed' : ''}>{this.props.task.name}</Info>
                <Img src={DeleteImageURL} alt="Delete Task" onClick={this.handleDeleteTask}/>
            </Item>

        )
    }

}
