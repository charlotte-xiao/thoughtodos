import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store";
import { getIsLogin } from "../../store/task/selectors";
import { UserInfo } from "../UserInfo";

const Section = styled.div`
  line-height: 4rem;
  height: 4rem;
  background: #ffffff;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(0.25turn, #c21500, #ffc500);
  -webkit-background-clip: text;
  color: transparent;
  padding-left: 8rem;
  flex: 1;
`;

type User = {
  name: string;
  avatar: string;
};

export const HeaderComponent: FunctionComponent = () => {
  const isLogin = useAppSelector(getIsLogin);
  const [user, setUser] = useState({ name: "", avatar: "" });

  useEffect(() => {
    if (isLogin) {
      const userCache = localStorage.getItem("thought-user");
      userCache && setUser(JSON.parse(userCache) as User);
    }
  }, [isLogin]);

  return (
    <Section>
      <Title>Thoughtodos!</Title>
      <UserInfo isLogin={isLogin} name={user.name} avatar={user.avatar} />
    </Section>
  );
};
