import React, { ChangeEvent, FunctionComponent, useState } from "react";
import styled from "styled-components";
import EditImageURL from "../../assets/edit.png";
import Task from "../../models/Task";
import { useAppDispatch } from "../../store";
import { updateTodoName } from "../../api/todo";
import Modal from "../Modal";

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

  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const [taskName, setTaskName] = useState(task.name);

  const handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const modalProps = {
    id: `modal-edition-${task.id}`,
    title: "Update Task",
    isVisible,
    hide,
    commit: () => {
      dispatch(updateTodoName({ ...task, name: taskName }));
      hide();
    },
  };

  return (
    <>
      <Img src={EditImageURL} alt="Edit Task" onClick={show} />
      <Modal
        id={modalProps.id}
        title={modalProps.title}
        isVisible={modalProps.isVisible}
        hide={modalProps.hide}
        commit={modalProps.commit}
      >
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
      </Modal>
      <div id={modalProps.id} />
    </>
  );
};
