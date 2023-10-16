import {useSelector} from "react-redux";

import {selectors} from "app/store";

import {taskMap} from "./taskMap";

export const TaskContainer = () => {
  const currentTask = useSelector(selectors.getCurrentTaskKey);
  console.log(currentTask);

  if (currentTask !== null && currentTask in taskMap) {
    const Task = taskMap[currentTask as keyof typeof taskMap];
    return <Task />;
  }
  return null;
};
