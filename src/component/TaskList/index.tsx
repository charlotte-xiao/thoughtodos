import React from "react";
import styled from "styled-components";
import TaskItemComponent from "../TaskItem";
import Task from "../../models/Task";

const Section = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

type TaskListProps = {
  taskList: Task[];
};

export default class TaskListComponent extends React.Component<
  TaskListProps,
  never
> {
  render() {
    return (
      <Section>
        {this.props.taskList.map((task: Task) => (
          <TaskItemComponent key={task.id} task={task}></TaskItemComponent>
        ))}
      </Section>
    );
  }
}
