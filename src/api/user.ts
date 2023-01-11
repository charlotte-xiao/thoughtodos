import { axiosInstance } from "./interceptor";
import { BASE_URL } from "../constants/Commom";

const loginGithub = async (code: string) => {
  const { data } = await axiosInstance.get(
    `${BASE_URL}/user/login/github?code=${code}`
  );
  return data;
};

export { loginGithub };
