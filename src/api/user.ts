import axios from "axios";

const BASE_URL = "http://127.0.0.1:7700";

const loginGithub = async (code: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/user/login/github?code=${code}`
  );
  return data;
};

export { loginGithub };
