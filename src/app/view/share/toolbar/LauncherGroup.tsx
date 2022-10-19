import React from "react";

import { LaunchedConfirm } from "./LaunchedConfirm";
import { LauncherItem } from "./types";
import { LaunchedTask } from "./LaunchedTask";
import { LaunchedDisabled } from "./LaunchedDisabled";
import { LauncherGroupProvider } from "./LauncherGroupContext";

const getLaunchedComponent = (
  launched: LauncherItem | null,
  stopLaunch: () => void,
) => {
  if (!launched) {
    return null;
  }
  if (launched.launchDisable?.isDisabled) {
    return <LaunchedDisabled item={launched} close={stopLaunch} />;
  }
  if ("confirm" in launched) {
    return <LaunchedConfirm item={launched} closeConfirm={stopLaunch} />;
  }
  if ("task" in launched) {
    return <LaunchedTask task={launched.task} stopLaunch={stopLaunch} />;
  }
  return null;
};

export const LauncherGroup = ({
  items = [],
  children,
}: {
  items: LauncherItem[];
  children: React.ReactNode;
}) => {
  const [launched, setLaunched] = React.useState<LauncherItem | null>(null);

  const stopLaunch = React.useCallback(() => setLaunched(null), [setLaunched]);

  if (Object.keys(items).length === 0) {
    return null;
  }

  return (
    <>
      <LauncherGroupProvider value={{ setLaunched }}>
        {children}
      </LauncherGroupProvider>
      {getLaunchedComponent(launched, stopLaunch)}
    </>
  );
};
