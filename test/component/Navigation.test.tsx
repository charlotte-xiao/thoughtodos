import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { Navigation } from "../../src/component/Navigation";
import store from "../../src/store";

describe("AddTask Test", () => {
  test("should render input", () => {
    render(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("should calculate current task amounts", () => {
    render(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );

    expect(screen.getByText("4 tasks")).toBeInTheDocument();
  });
});
