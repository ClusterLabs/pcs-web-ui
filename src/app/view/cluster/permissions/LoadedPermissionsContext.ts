import React from "react";

import {useCurrentClusterStoreItem} from "app/view/cluster/share";

type ClusterPermissions = NonNullable<
  ReturnType<typeof useCurrentClusterStoreItem>["clusterPermissions"]["data"]
>;

const LoadedPermissionsContext = React.createContext<
  ClusterPermissions | undefined
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
