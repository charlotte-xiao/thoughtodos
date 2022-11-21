import React, { FunctionComponent } from "react";
import { useModal } from "../../hook/useModal";
import styled from "styled-components";
import EditImageURL from "../../assets/edit.png";
import Task from "../../models/Task";

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
  const modalProps = {
    title: "Update Task",
    id: `modal-edition-${task.id}`,
  };
  const { show, RenderModal } = useModal(modalProps);
  return (
    <>
      <Img src={EditImageURL} alt="Edit Task" onClick={show} />
      <RenderModal>
        <Content>
          <Item>
            <Label> 任务:</Label>
            <Input type="text" value={task.name} />
          </Item>
          <Item>
            <Label> 描述:</Label>
            <Input type="text" value="describe" />
          </Item>
        </Content>
      </RenderModal>
      <div id={modalProps.id} />
    </>
  );
};
