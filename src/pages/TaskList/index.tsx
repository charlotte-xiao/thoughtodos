import React from "react";
import {TaskListContext} from "./TaskListContext";
import styled from "styled-components";
const Title = styled.h2`
     text-align: left;
`

const Content = styled.div`
    margin: 2rem 5rem;
`

export default class TaskList extends React.Component<any, any> {

    render() {
        return (
            <Content>
                <Title>· TodoList Information</Title>
                <TaskListContext.Consumer>
                    {({todoList}) => (
                        todoList.map(((task, index) => (
                            <div key={index}>{task.name}</div>
                        )))
                    )}
                </TaskListContext.Consumer>
                <Title>· CompletedList Information</Title>
                <TaskListContext.Consumer>
                    {({completedList}) => (
                        completedList.map(((task, index) => (
                            <div key={index}>{task.name}</div>
                        )))
                    )}
                </TaskListContext.Consumer>
            </Content>

        );
    }
}

