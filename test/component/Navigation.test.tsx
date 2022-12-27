import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { Navigation } from "../../src/component/Navigation";
import store from "../../src/store";
import * as utils from "../../src/utils/time";

describe("Navigation Component", () => {
  beforeEach(() => {
    jest.spyOn(utils, "formatDate").mockReturnValue("Monday December 22 2022");
  });

  test("should render input, zero amount and data information", () => {
    render(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText(`0 task`)).toBeInTheDocument();
    expect(screen.getByText("Monday December 22 2022")).toBeInTheDocument();
  });
});
