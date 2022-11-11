import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import TaskListComponent from "../../component/TaskList";
import { AddTaskComponent } from "../../component/AddTask";
import { FILTER_CONDITION } from "../../constants/FilterCondition";
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
    FILTER_CONDITION.ALL
  );

  const changeTaskFilterCondition = (taskFilterCondition: number) => {
    setTaskFilterCondition(taskFilterCondition);
  };

  let filteredTaskList;
  const taskList = useAppSelector(getTaskList);
  switch (taskFilterCondition) {
    case FILTER_CONDITION.ACTIVE:
      filteredTaskList = taskList.taskList.filter((task) => !task.isCompleted);
      break;
    case FILTER_CONDITION.COMPLETED:
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
