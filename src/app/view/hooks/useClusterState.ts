import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Action, LeafAction } from "app/actions";

import { selectors } from "app/store";

const stop: LeafAction = { type: "CLUSTER_DATA.SYNC.STOP" };

export const useClusterState = (clusterUrlName: string) => {
  const dispatch = useDispatch();

  const start = React.useMemo<LeafAction>(
    () => ({
      type: "CLUSTER_DATA.SYNC",
      payload: { clusterUrlName },
    }),
    [clusterUrlName],
  );

  React.useEffect(
    () => {
      dispatch<Action>({
        type: "DATA_READING.SET_UP",
        payload: {
          reloadCluster: { specificator: clusterUrlName, start, stop },
        },
      });
    },
    [clusterUrlName, start, dispatch],
  );
  return {
    cluster: useSelector(selectors.getCluster),
    dataLoaded: useSelector(selectors.clusterAreDataLoaded),
  };
};
