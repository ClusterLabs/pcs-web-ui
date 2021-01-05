import React from "react";

import {
  ActionLeaf,
  selectors,
  useDispatch,
  useSelector,
  utils,
} from "app/store";

export const useClusterState = (clusterUrlName: string) => {
  const dispatch = useDispatch();

  const start = React.useMemo<ActionLeaf>(
    () => ({
      type: "CLUSTER.STATUS.SYNC",
      id: { cluster: clusterUrlName },
    }),
    [clusterUrlName],
  );

  const stop = React.useMemo<ActionLeaf>(
    () => ({
      type: "CLUSTER.STATUS.SYNC.STOP",
      id: { cluster: clusterUrlName },
    }),
    [clusterUrlName],
  );

  React.useEffect(() => {
    dispatch({
      type: "DATA_READING.SET_UP",
      payload: [
        {
          specificator: `syncCluster:${clusterUrlName}`,
          start,
          stop,
        },
      ],
    });
    dispatch({
      type: "CLUSTER.PROPERTIES.LOAD",
      id: { cluster: clusterUrlName },
    });
    dispatch({
      type: "RESOURCE_AGENT.LIST.LOAD",
      id: { cluster: clusterUrlName },
    });
  }, [clusterUrlName, dispatch, start, stop]);

  const cluster = useSelector(selectors.getCluster(clusterUrlName));

  const nodeAttrs = (nodeName: string) => cluster.nodeAttr?.[nodeName] ?? [];
  const nodeUtilization = (nodeName: string) =>
    cluster.nodesUtilization?.[nodeName] ?? [];

  const isNodeAttrCibTrue = (nodeName: string, attrName: string) =>
    utils.isCibTrue(
      nodeAttrs(nodeName).find(a => a.name === attrName)?.value ?? "",
    );

  return {
    cluster,
    isNodeAttrCibTrue,
    nodeAttrs,
    nodeUtilization,
    dataLoaded: useSelector(selectors.clusterAreDataLoaded(clusterUrlName)),
  };
};
