import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {useSelectedClusterName} from "app/view/share";

export const usePermissions = () => {
  const clusterName = useSelectedClusterName();
  const clusterPermissions = useSelector(
    selectors.getClusterPermissions(clusterName),
  );
  return {
    clusterName,
    permissionList: clusterPermissions?.users_permissions || [],
  };
};
