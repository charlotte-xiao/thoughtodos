import { Img } from "../TaskItem";
import React from "react";
import styled from "styled-components";

const LoginButton = styled.input`
  text-align: center;
  color: #7f95a3;
  background-color: white;
  font-size: medium;
  font-weight: bolder;
  height: 3rem;
  width: 8rem;
  line-height: 3rem;
  padding: 0 1rem;
  margin: 0.5rem 2rem 0.5rem 0;
  border: 0;
  border-radius: 1rem;

  :hover {
    color: white;
    background-color: #7f95a3;
  }
`;

type LoginInfoProps = {
  isLogin: boolean;
  name: string;
  avatar: string;
};

export const UserInfo = ({ isLogin, name, avatar }: LoginInfoProps) => {
  const handleLogin = () => {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=bad5d978cbbb678fb88c&redirect_uri=http://localhost:3000/login";
  };

  return (
    <>
      {isLogin ? (
        <>
          <div>{`  欢迎您 ${name}  `}</div>
          <Img src={avatar} alt="header" />
        </>
      ) : (
        <LoginButton onClick={handleLogin} defaultValue="Github Login" />
      )}
    </>
  );
};
