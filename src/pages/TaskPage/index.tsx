import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import TaskListComponent from "../../component/TaskList";
import { Navigation } from "../../component/Navigation";
import { useAppDispatch, useAppSelector } from "../../store";
import { getTaskList } from "../../store/task/selectors";
import { getAllTodos } from "../../api/todo";
import Task from "../../models/Task";

const Content = styled.div`
  background-color: white;
  width: 60vh;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 3rem;
  text-align: center;
`;

export const TaskPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const taskList: Task[] = useAppSelector(getTaskList);

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  return (
    <Content>
      <Navigation />
      <TaskListComponent taskList={taskList} />
    </Content>
  );
};
