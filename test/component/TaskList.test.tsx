import { render, screen } from "@testing-library/react";
import React from "react";
import TaskListComponent from "../../src/component/TaskList";
import Task from "../../src/models/Task";
import { Provider } from "react-redux";
import store from "../../src/store";

describe("TaskList Test", () => {
  test("should render TaskList", () => {
    const mockTaskList: Task[] = [
      { id: 1, name: "task1", isCompleted: false },
      { id: 2, name: "task2", isCompleted: false },
    ];

    render(
      <Provider store={store}>
        <TaskListComponent taskList={mockTaskList}></TaskListComponent>
      </Provider>
    );

    mockTaskList.map((task: Task) => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
    });
  });
});
