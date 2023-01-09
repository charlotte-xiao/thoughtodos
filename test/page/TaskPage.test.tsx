import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { TaskPage } from "../../src/pages/TaskPage";
import store from "../../src/store";
import TaskList from "../mock/TaskList.json";
import { axiosInstance } from "../../src/api/interceptor";

describe("Task Page", () => {
  beforeEach(() => {
    jest.spyOn(axiosInstance, "get").mockResolvedValue({
      data: TaskList,
    });
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue("Bear Token");
  });

  test("should render correct task list and time", async () => {
    render(
      <Provider store={store}>
        <TaskPage />
      </Provider>
    );

    await waitFor(() => {
      const taskItems = screen.getAllByTestId("task-item");
      expect(taskItems).toHaveLength(TaskList.length);
      expect(screen.getByText(`${TaskList.length} tasks`)).toBeInTheDocument();
    });
  });

  test("should add task to todoList when input task name and enter", async () => {
    const mockNewTaskName = "mock new Task";
    jest.spyOn(axiosInstance, "post").mockResolvedValue({
      data: {
        _id: "104298749210384",
        title: mockNewTaskName,
      },
    });

    render(
      <Provider store={store}>
        <TaskPage />
      </Provider>
    );

    fireEvent.input(screen.getByRole("textbox"), mockNewTaskName);
    fireEvent.keyDown(screen.getByRole("textbox"), { code: "Enter" });

    await waitFor(() => {
      const taskItems = screen.getAllByTestId("task-item");
      expect(taskItems).toHaveLength(TaskList.length + 1);
      expect(screen.getByText(mockNewTaskName)).toBeInTheDocument();
      expect(
        screen.getByText(`${TaskList.length + 1} tasks`)
      ).toBeInTheDocument();
    });
  });

  test("should delete task when click delete button", async () => {
    jest.spyOn(axiosInstance, "delete").mockResolvedValue({
      data: { _id: "1" },
    });

    render(
      <Provider store={store}>
        <TaskPage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("task-item-delete")[0]).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByTestId("task-item-delete")[0]);

    await waitFor(() => {
      const taskItems = screen.getAllByTestId("task-item");
      expect(taskItems).toHaveLength(TaskList.length - 1);
      expect(
        screen.getByText(`${TaskList.length - 1} tasks`)
      ).toBeInTheDocument();
      expect(screen.queryByText(TaskList[0].title)).not.toBeInTheDocument();
    });
  });

  test("should update task status when click task checkbox", async () => {
    jest.spyOn(axiosInstance, "put").mockResolvedValue({
      data: {
        _id: TaskList[0]._id,
        title: TaskList[0].title,
        status: TaskList[0].status === "Active" ? "Active" : "COMPLETED",
      },
    });

    render(
      <Provider store={store}>
        <TaskPage />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.queryAllByRole("checkbox", {
          checked: false,
        }).length
      ).toBe(2);
      expect(
        screen.queryAllByRole("checkbox", {
          checked: true,
        }).length
      ).toBe(3);
    });

    fireEvent.click(screen.getAllByTestId("task-item-update")[0]);

    await waitFor(() => {
      const taskItems = screen.getAllByTestId("task-item");
      expect(taskItems).toHaveLength(TaskList.length);
      expect(
        screen.queryAllByRole("checkbox", {
          checked: false,
        }).length
      ).toBe(3);
      expect(
        screen.queryAllByRole("checkbox", {
          checked: true,
        }).length
      ).toBe(2);
    });
  });
});
