import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Action } from "app/actions";

import * as selectors from "./selectors";

const stop: Action = { type: "CLUSTER_DATA.SYNC.STOP" };

const useClusterState = (clusterUrlName: string) => {
  const dispatch = useDispatch();

  const start = React.useMemo<Action>(
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
    dataLoaded: useSelector(selectors.areDataLoaded),
  };
};
export default useClusterState;
