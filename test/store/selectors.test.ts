import { getTaskList } from "../../src/store/task/selectors";
import { FILTER_CONDITION } from "../../src/constants/FilterCondition";

const mockTaskList = [
  {
    id: "1",
    name: "todoTask1",
    isCompleted: false,
  },
  {
    id: "2",
    name: "todoTask2",
    isCompleted: false,
  },
  {
    id: "3",
    name: "completedTask1",
    isCompleted: true,
  },
  {
    id: "4",
    name: "completedTask2",
    isCompleted: true,
  },
];
describe("Task Store", () => {
  describe("getTaskList", () => {
    test("should_get_all_task_list_when_give_all_condition", () => {
      const filteredTaskList = getTaskList({
        taskReducer: {
          taskList: mockTaskList,
          filterCondition: FILTER_CONDITION.ALL,
          isLogin: true,
        },
      });
      expect(filteredTaskList).toHaveLength(4);
    });

    test("should_get_todo_task_list_when_give_active_condition", () => {
      const filteredTaskList = getTaskList({
        taskReducer: {
          taskList: mockTaskList,
          filterCondition: FILTER_CONDITION.ACTIVE,
          isLogin: true,
        },
      });
      filteredTaskList.forEach((task) => {
        expect(task.isCompleted).toBe(false);
      });
      expect(filteredTaskList).toHaveLength(2);
    });
    test("should_get_completed_task_list_when_give_completed_condition", () => {
      const filteredTaskList = getTaskList({
        taskReducer: {
          taskList: mockTaskList,
          filterCondition: FILTER_CONDITION.COMPLETED,
          isLogin: true,
        },
      });
      filteredTaskList.forEach((task) => {
        expect(task.isCompleted).toBe(true);
      });
      expect(filteredTaskList).toHaveLength(2);
    });
  });
});
