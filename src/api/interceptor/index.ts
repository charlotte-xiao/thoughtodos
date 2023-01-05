import axios from "axios";
import { TOKEN, USER } from "../../constants/Commom";

export const setUnLogin = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER);
};

const axiosInstance = axios.create({
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem(TOKEN) && config.headers) {
      config.headers.Authorization = localStorage.getItem(TOKEN);
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
    if (err.response) {
      switch (err.response.status) {
        case 401:
          alert(err.response.data.message);
          setUnLogin();
          break;
        default:
          console.log("unknown error~");
      }
    }
    return Promise.reject(err);
  }
);

export { axiosInstance };
