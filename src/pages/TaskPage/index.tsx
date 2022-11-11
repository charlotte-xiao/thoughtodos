import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import TaskListComponent from "../../component/TaskList";
import { AddTaskComponent } from "../../component/AddTask";
import { FilterCondition } from "../../constants/FilterCondition";
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
  const [taskFilterCondition, setTaskFilterCondition] = useState(
    FilterCondition.ALL
  );

  const changeTaskFilterCondition = (taskFilterCondition: number) => {
    setTaskFilterCondition(taskFilterCondition);
  };

  let filteredTaskList;
  const taskList = useAppSelector(getTaskList);
  switch (taskFilterCondition) {
    case FilterCondition.ACTIVE:
      filteredTaskList = taskList.taskList.filter((task) => !task.isCompleted);
      break;
    case FilterCondition.COMPLETED:
      filteredTaskList = taskList.taskList.filter((task) => task.isCompleted);
      break;
    default:
      filteredTaskList = [...taskList.taskList];
  }

  return (
    <Content>
      <AddTaskComponent changeTaskFilterCondition={changeTaskFilterCondition} />
      <TaskListComponent taskList={filteredTaskList} />
    </Content>
  );
};
