import React from "react";

import {
  ActionLeaf,
  selectors,
  useDispatch,
  useSelector,
  utils,
} from "app/store";

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

  const nodeAttrs = (nodeName: string) =>
    clusterState.nodeAttr?.[nodeName] ?? [];
  const nodeUtilization = (nodeName: string) =>
    clusterState.nodesUtilization?.[nodeName] ?? [];

  const isNodeAttrCibTrue = (nodeName: string, attrName: string) =>
    utils.isCibTrue(
      nodeAttrs(nodeName).find(a => a.name === attrName)?.value ?? "",
    );

  return {
    clusterState,
    isNodeAttrCibTrue,
    nodeAttrs,
    nodeUtilization,
    dataLoaded: useSelector(selectors.clusterAreDataLoaded(clusterName)),
  };
};
