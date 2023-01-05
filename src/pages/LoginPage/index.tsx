import React, { useEffect } from "react";
import { loginGithub } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { IsLoginAction, setIsLogin } from "../../store/task/reducer";
import { useAppDispatch } from "../../store";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const code = location.search.slice("?code=".length);
    loginGithub(code).then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("thought-user", JSON.stringify(data.user));
      const isLoginAction: IsLoginAction = {
        isLogin: true,
      };
      dispatch(setIsLogin(isLoginAction));
      navigate("/");
    });
  }, []);

  return <></>;
};
