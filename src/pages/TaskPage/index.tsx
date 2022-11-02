import React from "react";
import {TaskContext} from "./TaskContext";
import styled from "styled-components";
import TaskListComponent from "../../component/TaskList";
import AddTaskComponent from "../../component/AddTask";

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
                <TaskContext.Consumer>
                    {({taskList}) => (
                        <>
                            <AddTaskComponent/>
                            <Title><span>· </span>TodoList Information</Title>
                            <TaskListComponent taskList={taskList.todoList}/>
                            <Title><span>· </span>CompletedList Information</Title>
                            <TaskListComponent taskList={taskList.completedList}/>
                        </>
                    )}
                </TaskContext.Consumer>
            </Content>

        );
    }
}

