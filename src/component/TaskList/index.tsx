import React from "react";
import Task from "../../models/Task";
import styled from "styled-components";
import TaskItemComponent from "../TaskItem";

const Section = styled.ul`
  border-style: solid;
  border-width: 0.25rem;
  border-color: rgb(237, 242, 247);
  border-radius: 0.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
`

type TaskListProps = {
    taskList: Array<Task>;
}

export default class TaskListComponent extends React.Component<TaskListProps, never> {

    render() {
        return (
            <Section>
                {this.props.taskList.map((task: Task) => (
                  <TaskItemComponent key={task.id} task={task}></TaskItemComponent>
                ))}
            </Section>
        )
    }
}
