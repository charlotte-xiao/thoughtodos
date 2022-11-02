import {render, screen} from '@testing-library/react';
import React from 'react';
import Task from "../../models/Task";
import TaskItemComponent from "./index";

describe('TaskItem Test', () => {
    test('should render Todo Task', () => {
        const mockTask: Task = {name: 'todo Task', isCompleted: false} as Task;

        render(<TaskItemComponent task={mockTask}></TaskItemComponent>);

        expect(screen.getByText(mockTask.name)).toBeInTheDocument();
        expect(screen.getByRole('checkbox', {checked: false})).toBeInTheDocument();

    });

    test('should render Completed Task', () => {
        const mockTask: Task = {name: 'completed Task', isCompleted: true} as Task;

        render(<TaskItemComponent task={mockTask}></TaskItemComponent>);

        expect(screen.getByText(mockTask.name)).toBeInTheDocument();
        expect(screen.getByRole('checkbox', {checked: true})).toBeInTheDocument();

    });
});

