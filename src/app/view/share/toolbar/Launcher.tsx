import React from "react";

import { LauncherItem } from "./types";
import { LauncherTask } from "./LauncherTask";
import { useLauncherGroupContext } from "./LauncherGroupContext";

export const Launcher = ({
  item,
  children,
}: {
  item: LauncherItem;
  children: (_launch: () => void) => React.ReactElement;
}) => {
  const { setLaunched } = useLauncherGroupContext();
  if ("task" in item) {
    return (
      <LauncherTask item={item} setLaunched={setLaunched}>
        {children}
      </LauncherTask>
    );
  }

  if ("confirm" in item) {
    return children(() => setLaunched(item));
  }

  return children(item.run);
};
