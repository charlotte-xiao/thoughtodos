import { render, screen } from "@testing-library/react";
import React from "react";
import { TaskPage } from "./index";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store";

jest.mock("../../default/defaultTaskList.json", () => {
  return { taskList: [{ id: 1, name: "123" }] };
});

describe("Task Page Test", () => {
  test("should add task to todoList when input task name and enter", () => {
    const mockNewTaskName = "new Task";

    render(
      <Provider store={store}>
        <TaskPage />
      </Provider>
    );
    userEvent.type(screen.getByRole("textbox"), mockNewTaskName);
    userEvent.type(screen.getByRole("textbox"), "{enter}");

    const taskItems = screen.getAllByTestId("task-item");

    expect(taskItems).toHaveLength(2);
    expect(screen.getByText(mockNewTaskName)).toBeInTheDocument();
  });
});
