import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useState,
} from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store";
import Task from "../../models/Task";
import { createTodo } from "../../api/todo";

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

export const TaskAddition: FunctionComponent = () => {
  const [taskName, setTaskName] = useState("");
  const dispatch = useAppDispatch();

  const handleAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      dispatch(createTodo({ name: taskName } as Task));
      setTaskName("");
    }
  };

  const handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  return (
    <>
      <Input
        type="text"
        value={taskName}
        onKeyDown={handleAddTask}
        onChange={handleChangeTaskName}
        placeholder="Add a new task...(type enter to submit)"
      />
    </>
  );
};
