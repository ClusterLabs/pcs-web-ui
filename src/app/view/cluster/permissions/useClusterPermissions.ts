import { useSelector } from "react-redux";

import { selectors } from "app/store";

const { getClusterPermissions } = selectors;

export const useClusterPermissions = (clusterName: string) => {
  const clusterPermissions = useSelector(getClusterPermissions(clusterName));
  return {
    clusterPermissions,
  };
};
