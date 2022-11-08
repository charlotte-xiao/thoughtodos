import React from "react";
import styled from "styled-components";
import TaskListComponent from "../../component/TaskList";
import AddTaskComponent from "../../component/AddTask";
import {connect} from "react-redux";
import TaskList from "../../models/TaskList";
import {TaskFilterCondition} from "../../constants/TaskFilterCondition";

const Content = styled.div`
  margin: 2rem 5rem;
`

type TaskPageProps = {
    taskList: TaskList
}

type TaskPageState = {
    taskFilterCondition: number
}

class TaskPage extends React.Component<TaskPageProps, TaskPageState> {

    constructor(props: TaskPageProps) {
        super(props);
        this.state = {
            taskFilterCondition: TaskFilterCondition.ALL
        }
    }

    render() {
        let filteredTaskList;
        const {todoList, completedList} = this.props.taskList;
        switch (this.state.taskFilterCondition) {
            case TaskFilterCondition.ACTIVE:
                filteredTaskList = [... todoList];
                break;
            case TaskFilterCondition.COMPLETED:
                filteredTaskList = [... completedList];
                break
            default:
                filteredTaskList = todoList.concat(completedList);
        }
        return (
            <Content>
                <AddTaskComponent/>
                <TaskListComponent taskList={filteredTaskList}/>
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

