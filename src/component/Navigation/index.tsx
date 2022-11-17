import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { DateBar } from "../DateBar";
import { TaskFilterBox } from "../TaskFilterBox";
import { TaskAddition } from "../TaskAddition";

const Container = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Navigation: FunctionComponent = () => {
  return (
    <Container>
      <DateBar />
      <TaskFilterBox />
      <TaskAddition />
    </Container>
  );
};
