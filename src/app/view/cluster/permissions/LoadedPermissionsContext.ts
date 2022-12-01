import React from "react";

import {Permissions} from "app/view/cluster/types";

const LoadedPermissionsContext = React.createContext<Permissions | undefined>(
  undefined,
);

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
