import React from "react";
import {useSelector} from "react-redux";

import {selectors} from "app/store";

export const useClusterInfo = (clusterName: string) =>
  useSelector(selectors.getClusterStoreInfo(clusterName));

type RegisteredClusterInfo = Omit<
  Extract<ReturnType<typeof useClusterInfo>, {isRegistered: true}>,
  "isRegistered"
>;

const RegisteredClusterInfoContext = React.createContext<
  RegisteredClusterInfo | undefined
>(undefined);

export const RegisteredClusterInfoProvider =
  RegisteredClusterInfoContext.Provider;

export const useRegisteredClusterInfo = () => {
  const value = React.useContext(RegisteredClusterInfoContext);
  if (value === undefined) {
    throw new Error(
      "useCurrentClusterStorageItem must be within ClusterStorageItemProvider",
    );
  }

  return value;
};
