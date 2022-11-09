import React from "react";

import {LauncherItem} from "./types";

const LauncherGroupContext = React.createContext<{
  setLaunched: (_item: LauncherItem | null) => void;
}>({
  setLaunched: (_item: LauncherItem | null) => console.log(),
});

export const LauncherGroupProvider = LauncherGroupContext.Provider;
export const useLauncherGroupContext = () =>
  React.useContext(LauncherGroupContext);
