import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { AddTaskComponent } from "./index";
import store from "../../store";

describe("AddTask Test", () => {
  test("should render input", () => {
    render(
      <Provider store={store}>
        <AddTaskComponent />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("should calculate current task amounts", () => {
    render(
      <Provider store={store}>
        <AddTaskComponent />
      </Provider>
    );

    expect(screen.getByText("4 tasks")).toBeInTheDocument();
  });
});
