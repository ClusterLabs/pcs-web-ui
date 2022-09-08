import React from "react";

import { LauncherItem } from "./types";

type ItemTask<ARGS extends unknown[]> = Extract<
  LauncherItem<ARGS>,
  { task: unknown }
>;

export const LauncherTask = <ARGS extends unknown[]>({
  item,
  setLaunched,
  children,
}: {
  item: ItemTask<ARGS>;
  children: (_launch: () => void) => React.ReactElement;
  setLaunched: (_item: ItemTask<ARGS>) => void;
}) => {
  const { task } = item;
  const { open } = task.useTask();
  const openTask =
    "openArgs" in task
      ? () => open(...(task.openArgs as ARGS))
      : (open as () => void);
  return children(() => {
    openTask();
    setLaunched(item);
  });
};
