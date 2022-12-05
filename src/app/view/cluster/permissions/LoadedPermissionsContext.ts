import React from "react";

import {useClusterInfo} from "app/view/cluster/share";

type ClusterInfo = ReturnType<typeof useClusterInfo>;

const LoadedPermissionsContext = React.createContext<
  | {
      clusterName: string;
      permissions: NonNullable<ClusterInfo["permissions"]>;
      tasks: NonNullable<ClusterInfo["tasks"]>;
    }
  | undefined
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
