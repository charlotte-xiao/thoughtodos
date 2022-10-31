import React from "react";
import styled from "styled-components";

const Item = styled.li`
  height: 4rem;
  line-height: 4rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  list-style:none;
  .is_completed {
    color: #E2E8F0;;
    text-decoration:line-through;
    
  }
`

const Info = styled.div`
  padding-left: 1.5rem;
  text-align: left;
  flex: 1;
`

export default class TaskItem extends React.Component<any, any> {

    render() {
        return (
            <Item>
                <input
                    type="checkbox"
                    defaultChecked={this.props.task.isCompleted}
                    className="input-checkbox"
                />
                <Info className={this.props.task.isCompleted ? 'is_completed' : ''}>{this.props.task.name}</Info>
            </Item>

        )
    }

}
