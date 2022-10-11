import React from "react";

import { LaunchedConfirm } from "./LaunchedConfirm";
import { LauncherItem } from "./types";
import { LaunchedTask } from "./LaunchedTask";

type LauncherItemWithModal = Exclude<LauncherItem, { run: unknown }> | null;

export const LauncherGroup = ({
  items = [],
  children,
}: {
  items: LauncherItem[];
  children: (
    _setLaunched: (_item: LauncherItemWithModal) => void,
  ) => React.ReactElement;
}) => {
  const [launched, setLaunched] = React.useState<LauncherItemWithModal>(null);

  const stopLaunch = React.useCallback(() => setLaunched(null), [setLaunched]);

  if (Object.keys(items).length === 0) {
    return null;
  }

  // Haven't managed to put setLaunched to react context because Item<ARGS> is
  // generic, so context should be also generic (and context needs to be created
  // outside this component)
  if (!launched) {
    return children(setLaunched);
  }

  return (
    <>
      {children(setLaunched)}
      {"confirm" in launched ? (
        <LaunchedConfirm item={launched} closeConfirm={stopLaunch} />
      ) : (
        <LaunchedTask task={launched.task} stopLaunch={stopLaunch} />
      )}
    </>
  );
};
