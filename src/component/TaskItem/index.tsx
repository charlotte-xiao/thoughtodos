import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useState,
} from "react";
import styled from "styled-components";
import DeleteImageURL from "../../assets/delete.png";
import { ACTION_TYPE } from "../../constants/ActionType";
import Task from "../../models/Task";
import { TaskAction, updateTaskList } from "../../store/task/reducer";
import { useAppDispatch } from "../../store";

const Item = styled.li`
  height: 4rem;
  line-height: 4rem;
  border-top: 0.1rem solid rgb(237, 242, 247);
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;

  &.is_completed {
    background-color: #effaf6;
    text-decoration: line-through wavy #d8d7d7;

    input[type="text"] {
      background-color: #effaf6;
    }
  }

  input[type="checkbox"] {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Info = styled.input`
  padding-left: 1.5rem;
  text-align: left;
  flex: 1;
  border: 0;
  height: 2rem;

  :focus {
    outline: none;
    border-bottom: 0.1rem solid gray;
  }
`;

const Img = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-radius: 2rem;

  :hover {
    background-color: rgb(237, 242, 247);
  }
`;

type TaskProps = {
  task: Task;
};

const TaskItemComponent: FunctionComponent<TaskProps> = ({
  task,
}: TaskProps) => {
  const dispatch = useAppDispatch();
  const [taskName, setTaskName] = useState(task.name);

  const handleDeleteTask = () => {
    const taskAction: TaskAction = {
      actionType: ACTION_TYPE.DELETE_TASK,
      task: { id: task.id } as Task,
    };
    dispatch(updateTaskList(taskAction));
  };

  const handleSwitchTaskState = () => {
    const taskAction: TaskAction = {
      actionType: ACTION_TYPE.SWITCH_TASK_STATE,
      task: task,
    };
    dispatch(updateTaskList(taskAction));
  };

  const handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleUpdateTaskName = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      const taskAction: TaskAction = {
        actionType: ACTION_TYPE.UPDATE_TASK_NAME,
        task: { ...task, name: taskName },
      };
      dispatch(updateTaskList(taskAction));
      event.currentTarget.blur();
    }
  };

  return (
    <Item
      data-testid="task-item"
      className={task.isCompleted ? "is_completed" : ""}
    >
      <input
        type="checkbox"
        defaultChecked={task.isCompleted}
        className="input-checkbox"
        onClick={handleSwitchTaskState}
      />
      <Info
        type="text"
        value={taskName}
        onKeyDown={handleUpdateTaskName}
        onChange={handleChangeTaskName}
      />
      <Img src={DeleteImageURL} alt="Delete Task" onClick={handleDeleteTask} />
    </Item>
  );
};

export default TaskItemComponent;
