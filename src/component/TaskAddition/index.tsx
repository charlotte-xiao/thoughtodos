import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useState,
} from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store";
import { TaskAction, updateTaskList } from "../../store/task/reducer";
import { ACTION_TYPE } from "../../constants/ActionType";
import Task from "../../models/Task";

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
