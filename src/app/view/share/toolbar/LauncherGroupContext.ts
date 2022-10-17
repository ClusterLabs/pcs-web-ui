import React from "react";

import { LauncherItem } from "./types";

type LauncherItemWithModal = Exclude<LauncherItem, { run: unknown }> | null;
const LauncherGroupContext = React.createContext<{
  setLaunched: (_item: LauncherItemWithModal) => void;
}>({
  setLaunched: (_item: LauncherItemWithModal) => console.log(),
});

export const LauncherGroupProvider = LauncherGroupContext.Provider;
export const useLauncherGroupContext = () =>
  React.useContext(LauncherGroupContext);
