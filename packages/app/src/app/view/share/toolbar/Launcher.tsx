import React from "react";

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

  return children(item.run);
};
