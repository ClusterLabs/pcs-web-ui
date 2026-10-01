import React from "react";

import {CLUSTER_KEY} from "app/store";
import {useDispatch} from "app/view/share";

export const useClusterLoad = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: "CLUSTER.STATUS.SYNC",
      key: {clusterName: CLUSTER_KEY},
    });

    dispatch({
      type: "CLUSTER.PROPERTIES.LOAD",
      key: {clusterName: CLUSTER_KEY},
    });

    dispatch({
      type: "CLUSTER.PERMISSIONS.LOAD",
      key: {clusterName: CLUSTER_KEY},
    });

    dispatch({
      type: "RESOURCE_AGENT.LIST.LOAD",
      key: {clusterName: CLUSTER_KEY},
    });
    dispatch({
      type: "FENCE_AGENT.LIST.LOAD",
      key: {clusterName: CLUSTER_KEY},
    });
  }, [dispatch]);
};
