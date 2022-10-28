import React from "react";
import {TaskListContext} from "./TaskListContext";

export default class Index extends React.Component<never, never> {

    render() {
        return (
            <div>
                <h1>TodoList</h1>
                <TaskListContext.Consumer>
                    {({todoList}) => (
                        todoList.map(((task, index) => (
                            <div key={index}>{task.name}</div>
                        )))
                    )}
                </TaskListContext.Consumer>
                <h1>CompletedList</h1>
                <TaskListContext.Consumer>
                    {({completedList}) => (
                        completedList.map(((task, index) => (
                            <div key={index}>{task.name}</div>
                        )))
                    )}
                </TaskListContext.Consumer>
            </div>

        );
    }
}

