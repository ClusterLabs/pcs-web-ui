import React from "react";

import { LauncherItem } from "./types";
import { LauncherTask } from "./LauncherTask";

type LauncherItemWithModal = Exclude<LauncherItem, { run: unknown }> | null;

export const Launcher = ({
  item,
  // Haven't managed to put setLaunched to react context because
  // LauncherItem<ARGS> is generic, so context should be also generic (and
  // context needs to be created outside this component)
  setLaunched,
  children,
}: {
  item: LauncherItem;
  setLaunched: (_item: LauncherItemWithModal) => void;
  children: (_launch: () => void) => React.ReactElement;
}) => {
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
