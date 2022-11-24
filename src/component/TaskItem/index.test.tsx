import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import Task from "../../models/Task";
import TaskItemComponent from "./index";
import store from "../../store";

describe("TaskItem Test", () => {
  test("should render Todo Task", () => {
    const mockTask: Task = { name: "todo Task", isCompleted: false } as Task;

    render(
      <Provider store={store}>
        <TaskItemComponent task={mockTask}></TaskItemComponent>
      </Provider>
    );

    expect(screen.getByText(mockTask.name)).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { checked: false })
    ).toBeInTheDocument();
  });

  test("should render Completed Task", () => {
    const mockTask: Task = {
      name: "completed Task",
      isCompleted: true,
    } as Task;

    render(
      <Provider store={store}>
        <TaskItemComponent task={mockTask}></TaskItemComponent>
      </Provider>
    );

    expect(screen.getByText(mockTask.name)).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();
  });
});
