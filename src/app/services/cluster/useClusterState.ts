import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { SET_UP_DATA_READING } from "app/services/data-load/types";
import { RootState } from "app/core/rootState";

import {
  ClusterActionType,
  ClusterServiceState,
} from "./types";
import { selectors } from "./plugin";

const {
  SYNC_CLUSTER_DATA,
  SYNC_CLUSTER_DATA_STOP,
} = ClusterActionType;

const useClusterState = (clusterUrlName: string) => {
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      dispatch({
        type: SET_UP_DATA_READING,
        payload: {
          reloadCluster: {
            specificator: clusterUrlName,
            start: { type: SYNC_CLUSTER_DATA, payload: { clusterUrlName } },
            stop: { type: SYNC_CLUSTER_DATA_STOP },
          },
        },
      });
    },
    [clusterUrlName, dispatch],
  );
  return {
    cluster: useSelector<RootState, ClusterServiceState>(selectors.getCluster),
    dataLoaded: useSelector<RootState, boolean>(selectors.areDataLoaded),
  };
};
export default useClusterState;
