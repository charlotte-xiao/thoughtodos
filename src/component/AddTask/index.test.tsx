import {render, screen} from '@testing-library/react';
import React from 'react';
import AddTaskComponent from "./index";

describe('AddTask Test', () => {
    test('should render add button and input', () => {

        render(<AddTaskComponent/>);

        expect(screen.getByRole('button', {name: 'Add Task'})).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();

    });
});

