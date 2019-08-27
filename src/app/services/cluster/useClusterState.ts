import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { SET_UP_DATA_READING } from "app/services/data-load/types";
import { SetupDataReading } from "app/services/data-load/actions";

import * as ClusterAction from "./actions";
import * as selectors from "./selectors";

const stop: ClusterAction.SyncClusterDataStop = {
  type: "CLUSTER_DATA.SYNC.STOP",
};

const useClusterState = (clusterUrlName: string) => {
  const dispatch = useDispatch();

  const start = React.useMemo<ClusterAction.SyncClusterData>(
    () => ({
      type: "CLUSTER_DATA.SYNC",
      payload: { clusterUrlName },
    }),
    [clusterUrlName],
  );

  React.useEffect(
    () => {
      dispatch<SetupDataReading>({
        type: SET_UP_DATA_READING,
        payload: {
          reloadCluster: { specificator: clusterUrlName, start, stop },
        },
      });
    },
    [clusterUrlName, start, dispatch],
  );
  return {
    cluster: useSelector(selectors.getCluster),
    dataLoaded: useSelector(selectors.areDataLoaded),
  };
};
export default useClusterState;
