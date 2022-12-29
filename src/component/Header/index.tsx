import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import DeleteImageURL from "../../assets/delete.png";
import { Img } from "../TaskItem";
import { useAppDispatch, useAppSelector } from "../../store";
import { getIsLogin } from "../../store/task/selectors";
import { loginGithub } from "../../api/user";

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
  flex: 1;
`;

const UserInfo = styled.div``;

type User = {
  name: string;
  avatar: string;
};

export const HeaderComponent: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const isLogin = useAppSelector(getIsLogin);
  const [user, setUser] = useState({ name: "", avatar: "" });

  useEffect(() => {
    if (
      location.pathname === "/login" &&
      location.search.startsWith("?code=")
    ) {
      const code = location.search.slice("?code=".length);
      dispatch(loginGithub(code));
    }
    if (isLogin) {
      const userCache = localStorage.getItem("thought-user");
      userCache && setUser(JSON.parse(userCache) as User);
    }
  }, [isLogin, location.pathname]);

  const handleLogin = () => {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=bad5d978cbbb678fb88c&redirect_uri=http://localhost:3000/login";
  };

  return (
    <Section>
      <Title>Thoughtodos!</Title>
      <UserInfo>
        {isLogin ? (
          <>
            <div>{user.name}</div>
            <Img src={user.avatar} alt="user.name" />
          </>
        ) : (
          <>
            <div>未登录</div>
            <Img src={DeleteImageURL} alt="登录" onClick={handleLogin} />
          </>
        )}
      </UserInfo>
    </Section>
  );
};
