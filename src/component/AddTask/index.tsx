import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useState,
} from "react";
import Task from "../../models/Task";
import styled from "styled-components";
import { ACTION_TYPE } from "../../constants/ActionType";
import { FILTER_CONDITION } from "../../constants/FilterCondition";
import { formatDate } from "../../utils/time";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  FilterConditionAction,
  TaskAction,
  updateFilterCondition,
  updateTaskList,
} from "../../store/task/reducer";
import { getAmount, getFilterCondition } from "../../store/task/selectors";

const Container = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const NowDate = styled.div`
  font-weight: bolder;
  font-size: 2rem;
  color: #495862;
  text-align: left;
`;

const ShowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    font-weight: normal;
    font-size: 1.5rem;
    color: darkgray;
    flex: 1;
    text-align: left;
  }
`;

const Button = styled.input`
  color: #7f95a3;
  background-color: white;
  font-size: medium;
  font-weight: bolder;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem;
  margin-left: 1rem;
  border: 0;
  border-radius: 1rem;

  &.is_active {
    color: white;
    background-color: #7f95a3;
  }
`;

const Input = styled.input`
  font-size: larger;
  width: 100%;
  height: 2rem;
  border: 0;

  ::-webkit-input-placeholder {
    color: #7f95a3;
  }

  :focus {
    outline: none;
    border-bottom: 0.1rem solid gray;
  }
`;

export const AddTaskComponent: FunctionComponent = () => {
  const [taskName, setTaskName] = useState("");
  const dispatch = useAppDispatch();
  const amount = useAppSelector(getAmount);
  const filterCondition = useAppSelector(getFilterCondition);

  const dispatchAddTask = (taskName: string) => {
    const taskAction: TaskAction = {
      actionType: ACTION_TYPE.ADD_TASK,
      task: { name: taskName } as Task,
    };
    dispatch(updateTaskList(taskAction));
  };

  const handleAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      dispatchAddTask(taskName);
      setTaskName("");
    }
  };

  const handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleChangeTaskFilterCondition = (condition: number) => {
    const filterConditionAction: FilterConditionAction = {
      filterCondition: condition,
    };
    dispatch(updateFilterCondition(filterConditionAction));
  };

  return (
    <Container>
      <NowDate>
        {formatDate(new Date(), "{dayOfWeek} {month} {day} {year}")}
      </NowDate>
      <ShowBox>
        <div>
          {amount} {amount <= 1 ? "task" : "tasks"}
        </div>
        {Object.entries(FILTER_CONDITION).map((condition) => (
          <Button
            type="button"
            value={condition[0]}
            key={condition[1]}
            className={condition[1] === filterCondition ? "is_active" : ""}
            onClick={() => {
              handleChangeTaskFilterCondition(condition[1]);
            }}
          />
        ))}
      </ShowBox>
      <Input
        type="text"
        value={taskName}
        onKeyDown={handleAddTask}
        onChange={handleChangeTaskName}
        placeholder="Add a new task...(type enter to submit)"
      />
    </Container>
  );
};
