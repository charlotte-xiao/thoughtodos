import React, { FunctionComponent } from "react";
import styled from "styled-components";
import DeleteImageURL from "../../assets/delete.png";
import Task from "../../models/Task";
import { useAppDispatch } from "../../store";
import { TaskEdition } from "../TaskEdition";
import { deleteTodo, updateTodoStatus } from "../../api/todo";

const Item = styled.li`
  height: 4rem;
  line-height: 4rem;
  border-top: 0.1rem solid rgb(237, 242, 247);
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;

  &.is_completed {
    background-color: #effaf6;
    text-decoration: line-through wavy #d8d7d7;

    > input[type="text"] {
      background-color: #effaf6;
    }
  }

  input[type="checkbox"] {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Info = styled.div`
  padding-left: 1.5rem;
  text-align: left;
  flex: 1;
`;

export const Img = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-radius: 2rem;

  :hover {
    background-color: rgb(237, 242, 247);
  }
`;

type TaskProps = {
  task: Task;
};

const TaskItemComponent: FunctionComponent<TaskProps> = ({
  task,
}: TaskProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTodo({ id: task.id } as Task));
  };

  const handleSwitchTaskState = () => {
    dispatch(updateTodoStatus(task));
  };

  return (
    <Item
      data-testid="task-item"
      className={task.isCompleted ? "is_completed" : ""}
    >
      <input
        type="checkbox"
        data-testid="task-item-update"
        defaultChecked={task.isCompleted}
        className="input-checkbox"
        onClick={handleSwitchTaskState}
      />
      <Info>{task.name}</Info>
      <TaskEdition task={task} />
      <Img
        data-testid="task-item-delete"
        src={DeleteImageURL}
        alt="Delete Task"
        onClick={handleDeleteTask}
      />
    </Item>
  );
};

export default TaskItemComponent;
