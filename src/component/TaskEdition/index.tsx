import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { useModal } from "../../hook/useModal";
import styled from "styled-components";
import EditImageURL from "../../assets/edit.png";
import Task from "../../models/Task";
import { TaskAction, updateTaskList } from "../../store/task/reducer";
import { ACTION_TYPE } from "../../constants/ActionType";
import { useAppDispatch } from "../../store";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Label = styled.label`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Input = styled.input`
  font-size: larger;
  width: 80%;
  height: 4rem;
  border: 0;
  outline: none;
  border-bottom: 0.1rem solid gray;
`;

const Item = styled.div`
  width: 100%;
  line-height: 4rem;
  display: flex;
  justify-content: space-around;
`;

const Img = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-radius: 2rem;

  :hover {
    background-color: rgb(237, 242, 247);
  }
`;

type TaskEditionProps = {
  task: Task;
};

export const TaskEdition: FunctionComponent<TaskEditionProps> = ({
  task,
}: TaskEditionProps) => {
  const dispatch = useAppDispatch();
  const [taskName, setTaskName] = useState(task.name);

  // todo: 性能问题 - 每次更新信息后要卡顿一下
  const handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const modalProps = {
    title: "Update Task",
    id: `modal-edition-${task.id}`,
    preHandle: () => {
      const taskAction: TaskAction = {
        actionType: ACTION_TYPE.UPDATE_TASK_NAME,
        task: { ...task, name: taskName },
      };
      dispatch(updateTaskList(taskAction));
    },
  };
  const { show, RenderModal } = useModal(modalProps);
  return (
    <>
      <Img src={EditImageURL} alt="Edit Task" onClick={show} />
      <RenderModal>
        <Content>
          <Item>
            <Label> 任务:</Label>
            <Input
              type="text"
              value={taskName}
              onChange={handleChangeTaskName}
            />
          </Item>
          <Item>
            <Label> 描述:</Label>
            <Input type="text" defaultValue="describe" />
          </Item>
        </Content>
      </RenderModal>
      <div id={modalProps.id} />
    </>
  );
};
