import React from "react";

import { LaunchedConfirm } from "./LaunchedConfirm";
import { LauncherItem } from "./types";
import { LaunchedTask } from "./LaunchedTask";

export const LauncherGroup = <ARGS extends unknown[]>({
  items = [],
  children,
}: {
  items: LauncherItem<ARGS>[];
  children: (
    _setLaunched: (_item: LauncherItem<ARGS>) => void,
  ) => React.ReactElement;
}) => {
  const [launched, setLaunched] = React.useState<LauncherItem<ARGS> | null>(
    null,
  );
  const stopLaunch = () => setLaunched(null);

  if (Object.keys(items).length === 0) {
    return null;
  }

  // Haven't managed to put setLaunched to react context because Item<ARGS> is
  // generic, so context should be also generic (and context needs to be created
  // outside this component)
  return (
    <>
      {children(setLaunched)}
      {launched
        && ("confirm" in launched ? (
          <LaunchedConfirm item={launched} closeConfirm={stopLaunch} />
        ) : (
          <LaunchedTask task={launched.task} />
        ))}
    </>
  );
};
