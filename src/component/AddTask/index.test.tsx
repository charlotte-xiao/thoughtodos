import {render, screen} from '@testing-library/react';
import React from 'react';
import AddTaskComponent from "./index";
import {Provider} from "react-redux";
import {store} from "../../store/Store";

jest.mock("moment", () => {
    const actualMoment = jest.requireActual("moment");

    const mockMoment: any = (date: string | undefined) =>
        actualMoment(date || "2022-11-01T00:00:00.000Z");

    for (const prop in actualMoment) {
        mockMoment[prop] = actualMoment[prop];
    }
    return mockMoment;
});
describe('AddTask Test', () => {
    test('should render add button and input', () => {

        render(<Provider store={store}><AddTaskComponent/></Provider>);

        expect(screen.getByRole('button', {name: 'Add Task'})).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();

    });

    test('should render current time info correctly', () => {

        render(<Provider store={store}><AddTaskComponent/></Provider>);

        expect(screen.getByText('Tuesday November 1 2022')).toBeInTheDocument();

    });

    test('should calculate current task amounts', () => {

        render(<Provider store={store}><AddTaskComponent/></Provider>);

        expect(screen.getByText('4 tasks')).toBeInTheDocument();

    });
});

