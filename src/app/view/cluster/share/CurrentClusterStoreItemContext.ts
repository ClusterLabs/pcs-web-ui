import React from "react";

import {ClusterStoreItem} from "app/view/cluster/types";

const ClusterStorageItemContext = React.createContext<
  | {
      clusterName: string;
      clusterStoreItem: ClusterStoreItem;
    }
  | undefined
>(undefined);

export const ClusterStorageItemProvider = ClusterStorageItemContext.Provider;

export const useCurrentClusterStoreItem = () => {
  const value = React.useContext(ClusterStorageItemContext);
  if (value === undefined) {
    throw new Error(
      "useCurrentClusterStorageItem must be within ClusterStorageItemProvider",
    );
  }

  const {clusterStoreItem} = value;
  return {
    clusterStatus: clusterStoreItem.clusterStatus,
    clusterPermissions: clusterStoreItem.clusterPermissions,
  };
};
