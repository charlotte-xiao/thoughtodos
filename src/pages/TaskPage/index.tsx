import React from "react";
import {TaskContext} from "./TaskContext";
import styled from "styled-components";
const Title = styled.h2`
     text-align: left;
`

const Content = styled.div`
    margin: 2rem 5rem;
`

export default class TaskPage extends React.Component<any, any> {

    render() {
        return (
            <Content>
                <Title><span>· </span>TodoList Information</Title>
                <TaskContext.Consumer>
                    {({todoList}) => (
                        todoList.map(((task, index) => (
                            <div key={index}>{task.name}</div>
                        )))
                    )}
                </TaskContext.Consumer>
                <Title><span>· </span>CompletedList Information</Title>
                <TaskContext.Consumer>
                    {({completedList}) => (
                        completedList.map(((task, index) => (
                            <div key={index}>{task.name}</div>
                        )))
                    )}
                </TaskContext.Consumer>
            </Content>

        );
    }
}

