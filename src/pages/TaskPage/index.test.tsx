import {render, screen} from '@testing-library/react';
import React from 'react';
import TaskPage from "./index";
import {TaskProvider} from "./TaskContext";

jest.mock("../../default/defaultTaskList.json", () => {
    return {todoList: [{name: "123"}], completedList: []};
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
});

