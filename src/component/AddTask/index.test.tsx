import {render, screen} from '@testing-library/react';
import React from 'react';
import AddTaskComponent from "./index";
import {Provider} from "react-redux";
import {store} from "../../store/Store";

describe('AddTask Test', () => {
    test('should render add button and input', () => {

        render(<Provider store={store}><AddTaskComponent/></Provider>);

        expect(screen.getByRole('button', {name: 'Add Task'})).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();

    });
});

