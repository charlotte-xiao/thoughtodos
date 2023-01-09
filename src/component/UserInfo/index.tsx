import { Img } from "../TaskItem";
import React from "react";
import styled from "styled-components";
import LoginOutImg from "../../assets/loginout.png";
import { setUnLogin } from "../../api/interceptor";
import { useDispatch } from "react-redux";
import { IsLoginAction, setIsLogin } from "../../store/task/reducer";

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

const Header = styled(Img)`
  margin: 0.5rem 0;
`;

const Hello = styled.div`
  margin-right: 1rem;
`;

type LoginInfoProps = {
  isLogin: boolean;
  name: string;
  avatar: string;
};

export const UserInfo = ({ isLogin, name, avatar }: LoginInfoProps) => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=bad5d978cbbb678fb88c&redirect_uri=http://www.xiaostudy.cn:3000/login";
  };

  const handleLoginOut = () => {
    setUnLogin();
    const isLoginAction: IsLoginAction = {
      isLogin: false,
    };
    dispatch(setIsLogin(isLoginAction));
  };

  return (
    <>
      {isLogin ? (
        <>
          <Hello>{`Hi,${name} ～`}</Hello>
          <Header src={avatar} alt="header" />
          <Header src={LoginOutImg} alt="login out" onClick={handleLoginOut} />
        </>
      ) : (
        <LoginButton onClick={handleLogin} defaultValue="Github Login" />
      )}
    </>
  );
};
