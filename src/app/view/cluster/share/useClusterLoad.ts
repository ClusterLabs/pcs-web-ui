import React from "react";

import {ActionLeaf} from "app/store";
import {useDispatch} from "app/view/share";

export const useClusterLoad = (clusterName: string) => {
  const dispatch = useDispatch();

  const start = React.useMemo<ActionLeaf>(
    () => ({
      type: "CLUSTER.STATUS.SYNC",
      key: {clusterName},
    }),
    [clusterName],
  );

  const stop = React.useMemo<ActionLeaf>(
    () => ({
      type: "CLUSTER.STATUS.SYNC.STOP",
      key: {clusterName},
    }),
    [clusterName],
  );

  React.useEffect(() => {
    dispatch({
      type: "DATA_READING.SET_UP",
      payload: [
        {
          specificator: `syncCluster:${clusterName}`,
          start,
          stop,
        },
      ],
    });

    dispatch({
      type: "CLUSTER.PROPERTIES.LOAD",
      key: {clusterName},
    });

    dispatch({
      type: "CLUSTER.PERMISSIONS.LOAD",
      key: {clusterName},
    });

    dispatch({
      type: "RESOURCE_AGENT.LIST.LOAD",
      key: {clusterName},
    });
    dispatch({
      type: "FENCE_AGENT.LIST.LOAD",
      key: {clusterName},
    });
  }, [clusterName, dispatch, start, stop]);
};
