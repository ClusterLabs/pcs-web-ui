import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Action, LeafAction } from "app/actions";

import { selectors } from "app/store";

export const useClusterState = (clusterUrlName: string) => {
  const dispatch = useDispatch();

  const start = React.useMemo<LeafAction>(
    () => ({
      type: "CLUSTER_DATA.SYNC",
      payload: { clusterUrlName },
    }),
    [clusterUrlName],
  );

  const stop = React.useMemo<LeafAction>(
    () => ({
      type: "CLUSTER_DATA.SYNC.STOP",
      payload: { clusterUrlName },
    }),
    [clusterUrlName],
  );

  React.useEffect(() => {
    dispatch<Action>({
      type: "DATA_READING.SET_UP",
      payload: [
        {
          specificator: `syncCluster:${clusterUrlName}`,
          start,
          stop,
        },
      ],
    });
    dispatch<Action>({
      type: "CLUSTER_PROPERTIES.LOAD",
      payload: { clusterUrlName },
    });
  }, [clusterUrlName, start, dispatch, stop]);
  return {
    cluster: useSelector(selectors.getCluster(clusterUrlName)),
    dataLoaded: useSelector(selectors.clusterAreDataLoaded(clusterUrlName)),
  };
};
