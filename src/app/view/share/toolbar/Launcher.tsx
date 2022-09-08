import React from "react";

import { LauncherItem as Item } from "./types";
import { LauncherTask } from "./LauncherTask";

export const Launcher = <ARGS extends unknown[]>({
  item,
  // Haven't managed to put setLaunched to react context because Item<ARGS> is
  // generic, so context should be also generic (and context needs to be created
  // outside this component)
  setLaunched,
  children,
}: {
  item: Item<ARGS>;
  setLaunched: (_item: Item<ARGS>) => void;
  children: (_launch: () => void) => React.ReactElement;
}) => {
  if ("task" in item) {
    return (
      <LauncherTask item={item} setLaunched={setLaunched}>
        {children}
      </LauncherTask>
    );
  }

  return children(() => setLaunched(item));
};
