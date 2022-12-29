import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import Task from "../../src/models/Task";
import TaskItemComponent from "../../src/component/TaskItem";
import store from "../../src/store";

describe("TaskItem Component", () => {
  test("should render Todo Task", () => {
    const mockTask: Task = { name: "todo Task", isCompleted: false } as Task;

    render(
      <Provider store={store}>
        <TaskItemComponent task={mockTask} />
      </Provider>
    );

    expect(screen.getByText(mockTask.name)).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { checked: false })
    ).toBeInTheDocument();
  });

  test("should render Completed Task", () => {
    const mockTask: Task = { name: "done Task", isCompleted: true } as Task;

    render(
      <Provider store={store}>
        <TaskItemComponent task={mockTask} />
      </Provider>
    );

    expect(screen.getByText(mockTask.name)).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();
  });
});
