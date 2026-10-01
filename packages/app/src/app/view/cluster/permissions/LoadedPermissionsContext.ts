import React from "react";

import type {getClusterStoreInfo} from "app/store/selectors";

type ClusterInfo = ReturnType<typeof getClusterStoreInfo>;

const LoadedPermissionsContext = React.createContext<
  | {
      clusterName: string;
      permissions: NonNullable<ClusterInfo["permissions"]>;
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
