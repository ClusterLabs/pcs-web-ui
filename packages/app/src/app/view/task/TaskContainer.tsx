import {useSelector} from "react-redux";

import {selectors} from "app/store";

import {taskMap} from "./tasks/taskMap";

export const TaskContainer = () => {
  const currentTask = useSelector(selectors.getCurrentTaskKey);

  if (currentTask !== null && currentTask in taskMap) {
    const Task = taskMap[currentTask as keyof typeof taskMap];
    return <Task />;
  }
  return null;
};
