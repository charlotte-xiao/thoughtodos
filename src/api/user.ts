import { axiosInstance } from "./interceptor";
import { BACKEND_URL } from "../config";

const loginGithub = async (code: string) => {
  const { data } = await axiosInstance.get(
    `${BACKEND_URL}/user/login/github?code=${code}`
  );
  return data;
};

export { loginGithub };
