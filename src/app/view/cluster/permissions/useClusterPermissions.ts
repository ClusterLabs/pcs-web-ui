import { useSelector } from "react-redux";

import { selectors } from "app/store";
import { useSelectedClusterName } from "app/view/share";

const { getClusterPermissions } = selectors;
export type ClusterPermissions = selectors.ExtractClusterSelector<
  typeof getClusterPermissions
>;

export const useClusterPermissions = () => {
  const clusterName = useSelectedClusterName();
  const clusterPermissions = useSelector(getClusterPermissions(clusterName));
  return {
    clusterPermissions,
  };
};
