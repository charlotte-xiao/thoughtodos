import React from "react";
import styled from "styled-components";
import TaskListComponent from "../../component/TaskList";
import AddTaskComponent from "../../component/AddTask";
import { connect } from "react-redux";
import TaskList from "../../models/TaskList";
import { TaskFilterCondition } from "../../constants/TaskFilterCondition";

const Content = styled.div`
  background-color: white;
  width: 60vh;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 3rem;
  text-align: center;
`;

type TaskPageProps = {
  taskList: TaskList;
};

type TaskPageState = {
  taskFilterCondition: number;
};

class TaskPage extends React.Component<TaskPageProps, TaskPageState> {
  constructor(props: TaskPageProps) {
    super(props);
    this.state = {
      taskFilterCondition: TaskFilterCondition.ALL,
    };
  }

  changeTaskFilterCondition = (taskFilterCondition: number) => {
    this.setState({
      taskFilterCondition: taskFilterCondition,
    });
  };

  render() {
    let filteredTaskList;
    const { taskList } = this.props.taskList;
    switch (this.state.taskFilterCondition) {
      case TaskFilterCondition.ACTIVE:
        filteredTaskList = taskList.filter((task) => !task.isCompleted);
        break;
      case TaskFilterCondition.COMPLETED:
        filteredTaskList = taskList.filter((task) => task.isCompleted);
        break;
      default:
        filteredTaskList = [...taskList];
    }
    return (
      <Content>
        <AddTaskComponent
          changeTaskFilterCondition={this.changeTaskFilterCondition}
        />
        <TaskListComponent taskList={filteredTaskList} />
      </Content>
    );
  }
}

const mapStateToProps = (state: TaskList) => {
  return {
    taskList: state,
  };
};

export default connect(mapStateToProps)(TaskPage);
