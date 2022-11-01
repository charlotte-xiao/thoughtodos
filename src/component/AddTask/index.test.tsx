import {render, screen} from '@testing-library/react';
import React from 'react';
import AddTask from "./index";
import userEvent from "@testing-library/user-event";
import Task from "../../models/Task";
import {ACTION_TYPE} from "../../constants/ActionType";

describe('AddTask Test', () => {
    test('should render add button and input', () => {

        render(<AddTask updateTaskList={jest.fn()}></AddTask>);

        expect(screen.getByRole('button', {name: 'Add Task'})).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();

    });

    test('should execute updateTaskList when click add button', () => {
        const mockUpdateTaskList = jest.fn();
        const mockNewTask: Task = {
            name: 'new Task',
            isCompleted: false,
        }

        render(<AddTask updateTaskList={mockUpdateTaskList}></AddTask>);
        userEvent.type(screen.getByRole('textbox'), mockNewTask.name);
        userEvent.click(screen.getByRole('button', {name: 'Add Task'}));

        expect(mockUpdateTaskList).toHaveBeenLastCalledWith(ACTION_TYPE.ADD_TASK, mockNewTask);
    });
});

