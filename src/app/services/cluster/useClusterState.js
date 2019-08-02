import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { SET_UP_DATA_READING } from "app/services/data-load/types";

import { syncClusterData, syncClusterDataStop } from "./actions";
import { selectors } from "./plugin";

export default (clusterUrlName) => {
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      dispatch({
        type: SET_UP_DATA_READING,
        payload: {
          reloadCluster: {
            specificator: clusterUrlName,
            // Pure actions (without dispatch binding) here. Start/Stop should
            // be plain objects because they are used in saga.
            start: syncClusterData(clusterUrlName),
            stop: syncClusterDataStop(),
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
