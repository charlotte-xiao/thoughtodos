import {render, screen} from '@testing-library/react';
import React from 'react';
import AddTaskComponent from "./index";
import {Provider} from "react-redux";
import {store} from "../../store/Store";

describe('AddTask Test', () => {
    test('should render input', () => {

        render(<Provider store={store}><AddTaskComponent changeTaskFilterCondition={jest.fn()}/></Provider>);

        expect(screen.getByRole('textbox')).toBeInTheDocument();

    });

    test('should calculate current task amounts', () => {

        render(<Provider store={store}><AddTaskComponent changeTaskFilterCondition={jest.fn()}/></Provider>);

        expect(screen.getByText('4 tasks')).toBeInTheDocument();

    });
});

