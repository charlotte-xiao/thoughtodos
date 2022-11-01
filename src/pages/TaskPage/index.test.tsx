import {render, screen} from '@testing-library/react';
import React from 'react';
import TaskPage from "./index";
import {TaskProvider} from "./TaskContext";
import userEvent from "@testing-library/user-event";

jest.mock("../../default/defaultTaskList.json", () => {
    return {todoList: [{id: 1, name: "123"}], completedList: []};
});

describe('Task Page Test', () => {
    test('should render todo and completed title', () => {
        render(
            <TaskProvider>
                <TaskPage/>
            </TaskProvider>
        );

        expect(screen.getByText("TodoList Information")).toBeInTheDocument();
        expect(screen.getByText("CompletedList Information")).toBeInTheDocument();
    });

    test('should add task to todoList when input task name add click button', () => {
        const mockNewTaskName = 'new Task';

        render(
            <TaskProvider>
                <TaskPage/>
            </TaskProvider>
        );
        userEvent.type(screen.getByRole('textbox'), mockNewTaskName);
        userEvent.click(screen.getByRole('button', {name: 'Add Task'}));

        const taskItems = screen.getAllByTestId('task-item');
        expect(taskItems).toHaveLength(2);
        expect(screen.getByText(mockNewTaskName)).toBeInTheDocument();

    });
});

