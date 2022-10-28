import React from "react";
import {TaskListContext} from "./TaskListContext";
import styled from "styled-components";
const Title = styled.title`

`

export default class TodoList extends React.Component<any, any> {

    render() {
        return (
            <div>
                <Title>TodoList Information</Title>
                <TaskListContext.Consumer>
                    {({todoList}) => (
                        todoList.map(((task, index) => (
                            <div key={index}>{task.name}</div>
                        )))
                    )}
                </TaskListContext.Consumer>
                <Title>CompletedList Information</Title>
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

