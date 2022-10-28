import {render, screen} from '@testing-library/react';
import React from 'react';
import TodoList from "./index";
import {TaskListProvider} from "./TaskListContext";

jest.mock("../../default/defaultTaskList.json", () => {
    return {todoList: [{name: "123"}], completedList: []};
});

describe('TodoList Test', () => {
    test('should render todo and completed title', () => {
        render(
            <TaskListProvider>
                <TodoList/>
            </TaskListProvider>
        );
        screen.debug();
        expect(screen.getByText("TodoList Information")).toBeInTheDocument();
        expect(screen.getByText("CompletedList Information")).toBeInTheDocument();
    });
});

