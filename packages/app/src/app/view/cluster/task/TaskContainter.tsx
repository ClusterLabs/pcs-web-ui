import {useSelector} from "react-redux";

import {selectors} from "app/store";

import {taskMap} from "./taskMap";

export const TaskContainter = ({clusterName}: {clusterName: string}) => {
  const currentTask = useSelector(
    selectors.getCurrentClusterTaskKey(clusterName),
  );

  if (currentTask !== null && currentTask in taskMap) {
    const Task = taskMap[currentTask as keyof typeof taskMap];
    return <Task />;
  }
  return null;
};
