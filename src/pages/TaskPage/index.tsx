import React from "react";
import styled from "styled-components";
import TaskListComponent from "../../component/TaskList";
import AddTaskComponent from "../../component/AddTask";
import {connect} from "react-redux";
import TaskList from "../../models/TaskList";

const Title = styled.h2`
  text-align: left;
`

const Content = styled.div`
  margin: 2rem 5rem;
`

type TaskPageProps = {
    taskList: TaskList
}

class TaskPage extends React.Component<TaskPageProps, never> {

    render() {
        return (
            <Content>
                <AddTaskComponent/>
                <Title><span>· </span>TodoList Information</Title>
                <TaskListComponent taskList={this.props.taskList.todoList}/>
                <Title><span>· </span>CompletedList Information</Title>
                <TaskListComponent taskList={this.props.taskList.completedList}/>
            </Content>
        );
    }
}

const mapStateToProps = (state: TaskList) => {
    return {
        taskList: state,
    }
}

export default connect(mapStateToProps)(TaskPage);

