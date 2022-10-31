import React from "react";

import {LauncherItem} from "./types";

type ItemTask = Extract<LauncherItem, {task: unknown}>;

export const LauncherTask = ({
  item,
  setLaunched,
  children,
}: {
  item: ItemTask;
  children: (_launch: () => void) => React.ReactElement;
  setLaunched: (_item: ItemTask) => void;
}) => {
  const {task} = item;
  const {open} = task.useTask();
  const openTask = () => open(...(task.openArgs || []));
  return children(() => {
    openTask();
    setLaunched(item);
  });
};
