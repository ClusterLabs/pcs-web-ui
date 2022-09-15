import React from "react";

import { LauncherItem } from "./types";

export const LaunchedTask = <ARGS extends unknown[]>({
  task,
  stopLaunch,
}: {
  task: Extract<LauncherItem<ARGS>, { task: unknown }>["task"];
  stopLaunch: () => void;
}) => {
  const { useTask, component: TaskComponent } = task;
  const { isOpened } = useTask();

  React.useEffect(() => {
    if (!isOpened) {
      stopLaunch();
    }
  }, [isOpened, stopLaunch]);

  return isOpened ? <TaskComponent /> : null;
};
