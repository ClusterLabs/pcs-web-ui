import React from "react";

import {useClusterInfo} from "app/view/cluster/share";

const LoadedPermissionsContext = React.createContext<
  NonNullable<ReturnType<typeof useClusterInfo>["permissions"]> | undefined
>(undefined);

export const LoadedPermissionsProvider = LoadedPermissionsContext.Provider;

export const useLoadedPermissions = () => {
  const cluster = React.useContext(LoadedPermissionsContext);
  if (cluster === undefined) {
    throw new Error(
      "useLoadedPermissions must be within LoadedPermissionsProvider",
    );
  }
  return cluster;
};
