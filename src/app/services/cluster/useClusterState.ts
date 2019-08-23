import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { SET_UP_DATA_READING } from "app/services/data-load/types";
import { SetupDataReading } from "app/services/data-load/actions";

import { ClusterActionType } from "./types";
import * as selectors from "./selectors";

const useClusterState = (clusterUrlName: string) => {
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      dispatch<SetupDataReading>({
        type: SET_UP_DATA_READING,
        payload: {
          reloadCluster: {
            specificator: clusterUrlName,
            start: {
              type: ClusterActionType.SYNC_CLUSTER_DATA,
              payload: { clusterUrlName },
            },
            stop: { type: ClusterActionType.SYNC_CLUSTER_DATA_STOP },
          },
        },
      });
    },
    [clusterUrlName, dispatch],
  );
  return {
    cluster: useSelector(selectors.getCluster),
    dataLoaded: useSelector(selectors.areDataLoaded),
  };
};
export default useClusterState;
