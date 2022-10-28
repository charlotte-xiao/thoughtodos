import React from "react";
import Task from "../../models/Task";
import styled from "styled-components";

const Section = styled.div`
  border-style: solid;
  border-width: 0.25rem;
  border-color: rgb(237, 242, 247);
  border-radius: 0.5rem;
`

export default class TaskList extends React.Component<any, any> {

    render() {
        return (
            <Section>
                {this.props.taskList.map((task: Task, index: number) => (
                    <div key={index}>
                        <input type="checkbox" defaultChecked={task.isCompleted}/>
                        <div>{task.name}</div>
                    </div>
                ))}
            </Section>
        )
    }
}
