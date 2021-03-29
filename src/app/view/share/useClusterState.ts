import React from "react";
import { useSelector } from "react-redux";

import { ActionLeaf, selectors } from "app/store";
import { useDispatch } from "app/view/share/useDispatch";

export const useClusterState = (clusterName: string) => {
  const dispatch = useDispatch();

  const start = React.useMemo<ActionLeaf>(
    () => ({
      type: "CLUSTER.STATUS.SYNC",
      key: { clusterName },
    }),
    [clusterName],
  );

  const stop = React.useMemo<ActionLeaf>(
    () => ({
      type: "CLUSTER.STATUS.SYNC.STOP",
      key: { clusterName },
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
      key: { clusterName },
    });
    dispatch({
      type: "RESOURCE_AGENT.LIST.LOAD",
      key: { clusterName },
    });
  }, [clusterName, dispatch, start, stop]);

  const clusterState = useSelector(selectors.getCluster(clusterName));

  return {
    clusterState,
    nodeAttrs: (nodeName: string) => clusterState.nodeAttr?.[nodeName] ?? [],
    nodeUtilization: (nodeName: string) =>
      clusterState.nodesUtilization?.[nodeName] ?? [],
    dataLoaded: useSelector(selectors.clusterAreDataLoaded(clusterName)),
  };
};
