import {render, screen} from '@testing-library/react';
import React from 'react';
import TaskListComponent from "./index";
import Task from "../../models/Task";

describe('TaskList Test', () => {
    test('should render TaskList', () => {
        const mockTaskList: Array<Task> = [
            {id: 1, name: 'task1', isCompleted: false},
            {id: 2, name: 'task2', isCompleted: false},
        ]

        render(
            <TaskListComponent taskList={mockTaskList}></TaskListComponent>
        );

        mockTaskList.map((task: Task) => {
            expect(screen.getByText(task.name)).toBeInTheDocument();
        })
    });
});

