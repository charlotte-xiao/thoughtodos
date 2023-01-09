import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginGithub } from "../../api/user";
import { IsLoginAction, setIsLogin } from "../../store/task/reducer";
import { useAppDispatch } from "../../store";
import { TOKEN, USER, CODE_SEARCH_PREFIX } from "../../constants/Commom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.search.startsWith(CODE_SEARCH_PREFIX)) {
      const code = location.search.slice(CODE_SEARCH_PREFIX.length);
      loginGithub(code).then((data) => {
        localStorage.setItem(TOKEN, data.token);
        localStorage.setItem(USER, JSON.stringify(data.user));
        const isLoginAction: IsLoginAction = {
          isLogin: true,
        };
        dispatch(setIsLogin(isLoginAction));
        navigate("/");
      });
    } else {
      // todo: navigate error page
      alert("navigate error page");
    }
  }, []);

  return <></>;
};
