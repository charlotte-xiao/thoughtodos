import {render, screen} from '@testing-library/react';
import React from 'react';
import AddTask from "./index";

describe('AddTask Test', () => {
    test('should render add button', () => {

        render(<AddTask toggleTaskList={jest.fn()}></AddTask>);

        expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();

    });
});

