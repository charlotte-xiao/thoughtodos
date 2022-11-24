import React, { FunctionComponent } from "react";
import styled from "styled-components";
import TaskListComponent from "../../component/TaskList";
import { AddTaskComponent } from "../../component/AddTask";
import { useAppSelector } from "../../store";
import { getTaskList } from "../../store/task/selectors";

const Content = styled.div`
  background-color: white;
  width: 60vh;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 3rem;
  text-align: center;
`;

export const TaskPage: FunctionComponent = () => {
  const taskList = useAppSelector(getTaskList);

  return (
    <Content>
      <AddTaskComponent />
      <TaskListComponent taskList={taskList} />
    </Content>
  );
};
