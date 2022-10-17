import React from "react";

import { LaunchedConfirm } from "./LaunchedConfirm";
import { LauncherItem } from "./types";
import { LaunchedTask } from "./LaunchedTask";
import { LauncherGroupProvider } from "./LauncherGroupContext";

type LauncherItemWithModal = Exclude<LauncherItem, { run: unknown }> | null;

export const LauncherGroup = ({
  items = [],
  children,
}: {
  items: LauncherItem[];
  children: React.ReactNode;
}) => {
  const [launched, setLaunched] = React.useState<LauncherItemWithModal>(null);

  const stopLaunch = React.useCallback(() => setLaunched(null), [setLaunched]);

  if (Object.keys(items).length === 0) {
    return null;
  }

  if (!launched) {
    return (
      <LauncherGroupProvider value={{ setLaunched }}>
        {children}
      </LauncherGroupProvider>
    );
  }

  return (
    <>
      <LauncherGroupProvider value={{ setLaunched }}>
        {children}
      </LauncherGroupProvider>
      {"confirm" in launched ? (
        <LaunchedConfirm item={launched} closeConfirm={stopLaunch} />
      ) : (
        <LaunchedTask task={launched.task} stopLaunch={stopLaunch} />
      )}
    </>
  );
};
