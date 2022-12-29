import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:7700";
const USER_API_PREFIX = {
  LOGIN_GITHUB: "loginGithub",
};
const loginGithub = createAsyncThunk(
  USER_API_PREFIX.LOGIN_GITHUB,
  async (code: string) => {
    const { data } = await axios.get(
      `${BASE_URL}/user/login/github?code=${code}`
    );
    return { ...data };
  }
);

export { loginGithub };
