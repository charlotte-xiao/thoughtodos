import React from "react";
import {TaskContext} from "./TaskContext";
import styled from "styled-components";
import TaskList from "../../component/TaskList";

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
                        <TaskList taskList={todoList}/>
                    )}
                </TaskContext.Consumer>
                <Title><span>· </span>CompletedList Information</Title>
                <TaskContext.Consumer>
                    {({completedList}) => (
                        <TaskList taskList={completedList} />
                    )}
                </TaskContext.Consumer>
            </Content>

        );
    }
}

