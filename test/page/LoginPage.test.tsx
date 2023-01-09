import React from "react";
import { Provider } from "react-redux";
import store from "../../src/store";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { LoginPage } from "../../src/pages/LoginPage";
import { render, waitFor } from "@testing-library/react";
import { axiosInstance } from "../../src/api/interceptor";
import { TOKEN, USER } from "../../src/constants/Commom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => {
    return mockedUsedNavigate;
  },
}));

describe("Login Page", () => {
  beforeEach(() => {
    const data = {
      [TOKEN]: "Bearer 123",
      [USER]:
        '{"id":"123","name":"charlotte-xiao","avatar":"https://avatars.githubusercontent.com/u/63084824?v=4"}',
    };
    jest.spyOn(axiosInstance, "get").mockResolvedValue({
      data: data,
    });
    jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
    jest.spyOn(window, "alert").mockImplementation(() => {
      return "fake";
    });
  });

  test("should handle github login redirect url with auth code", async () => {
    const loginUrl = "/login?code=123";
    window.location.assign(loginUrl);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledWith("/");
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    });
  });

  test("should not handle github login redirect url without auth code", async () => {
    const loginUrl = "/login";
    window.location.assign(loginUrl);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledTimes(0);
    });
  });
});
