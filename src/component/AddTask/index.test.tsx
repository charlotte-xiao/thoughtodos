import {render, screen} from '@testing-library/react';
import React from 'react';
import AddTask from "./index";
import userEvent from "@testing-library/user-event";
import Task from "../../models/Task";

describe('AddTask Test', () => {
    test('should render add button and input', () => {

        render(<AddTask toggleTaskList={jest.fn()}></AddTask>);

        expect(screen.getByRole('button', {name: 'Add Task'})).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();

    });

    test('should execute ToggleTaskList when click add button', () => {
        const mockToggleTaskList = jest.fn();
        const mockNewTask: Task = {
            name: 'new Task',
            isCompleted: false,
        }

        render(<AddTask toggleTaskList={mockToggleTaskList}></AddTask>);
        userEvent.type(screen.getByRole('textbox'), mockNewTask.name);
        userEvent.click(screen.getByRole('button', {name: 'Add Task'}));

        expect(mockToggleTaskList).toHaveBeenLastCalledWith(mockNewTask);
    });
});

