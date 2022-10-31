import {render, screen} from '@testing-library/react';
import React from 'react';
import TaskList from "./index";
import Task from "../../models/Task";

describe('TaskList Test', () => {
    test('should render TaskList', () => {
        const mockTaskList: Array<Task> = [
            {name: 'task1', isCompleted: false},
            {name: 'task2', isCompleted: false},
        ]

        render(
            <TaskList taskList={mockTaskList}></TaskList>
        );

        mockTaskList.map((task: Task) => {
            expect(screen.getByText(task.name)).toBeInTheDocument();
        })
    });
});

