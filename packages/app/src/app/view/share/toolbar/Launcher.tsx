import React from "react";

import {useTaskOpen} from "app/view/cluster/task";

import {LauncherItem} from "./types";
import {LauncherTask} from "./LauncherTask";
import {useLauncherGroupContext} from "./LauncherGroupContext";

export const Launcher = ({
  item,
  children,
}: {
  item: LauncherItem;
  children: (_launch: () => void) => React.ReactElement;
}) => {
  const taskOpen = useTaskOpen();
  const {setLaunched} = useLauncherGroupContext();
  if ("confirm" in item || item.launchDisable?.isDisabled) {
    return children(() => setLaunched(item));
  }
  if ("task" in item) {
    return (
      <LauncherTask item={item} setLaunched={setLaunched}>
        {children}
      </LauncherTask>
    );
  }

  if ("taskName" in item) {
    return children(() => {
      taskOpen(item.taskName, item.taskInitAction);
    });
  }

  return children(item.run);
};
