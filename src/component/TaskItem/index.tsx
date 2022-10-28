import React from "react";
import styled from "styled-components";

const Item = styled.div`
  line-height: 4rem;
  padding: 0rem 1rem;
  display: flex;
  flex-direction: row;

  .is_completed {
    color: #E2E8F0;;
    text-decoration:line-through;
    
  }
  
`
export default class TaskItem extends React.Component<any, any> {

    render() {
        return (
            <Item>
                <div className={this.props.task.isCompleted ? 'is_completed' : ''}>{this.props.task.name}</div>
            </Item>

        )
    }

}
