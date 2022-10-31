import React from "react";
import Task from "../../models/Task";
import styled from "styled-components";
import TaskItem from "../TaskItem";

const Section = styled.div`
  border-style: solid;
  border-width: 0.25rem;
  border-color: rgb(237, 242, 247);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
`

export default class TaskList extends React.Component<any, any> {

    render() {
        return (
            <Section>
                {this.props.taskList.map((task: Task, index: number) => (
                  <TaskItem key={index} task={task}></TaskItem>
                ))}
            </Section>
        )
    }
}
