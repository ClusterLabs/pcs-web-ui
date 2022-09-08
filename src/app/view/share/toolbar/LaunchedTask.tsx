import { LauncherItem } from "./types";

export const LaunchedTask = <ARGS extends unknown[]>({
  task,
}: {
  task: Extract<LauncherItem<ARGS>, { task: unknown }>["task"];
}) => {
  const { useTask, component: TaskComponent } = task;
  const { isOpened } = useTask();
  return isOpened ? <TaskComponent /> : null;
};
