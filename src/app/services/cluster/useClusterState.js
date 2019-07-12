import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setUpDataReading } from "app/services/data-load/actions";

import { syncClusterData, syncClusterDataStop } from "./actions";
import { selectors } from "./plugin";

const setupClusterReading = clusterUrlName => setUpDataReading({
  reloadCluster: {
    specificator: clusterUrlName,
    // Pure actions (without dispatch binding) here. Start/Stop should be
    // plain objects because they are used in saga.
    start: syncClusterData(clusterUrlName),
    stop: syncClusterDataStop(),
  },
});

export default (clusterUrlName) => {
  const dispatch = useDispatch();
  React.useEffect(
    () => { dispatch(setupClusterReading(clusterUrlName)); },
    [clusterUrlName, dispatch],
  );
  return {
    cluster: useSelector(selectors.getCluster),
    dataLoaded: useSelector(selectors.areDataLoaded),
  };
};
