import React from "react";

import {selectors} from "app/store";

type ClusterStoreItem = NonNullable<
  ReturnType<
    ReturnType<typeof selectors.getClusterStoreInfo>
  >["clusterStoreItem"]
>;

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

  const {clusterStoreItem: clusterStorageItem} = value;
  return {
    clusterStatus: clusterStorageItem.clusterStatus,
  };
};
