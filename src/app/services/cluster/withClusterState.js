import React from "react";
import { connect } from "react-redux";

import { setUpDataReading } from "app/services/data-load/actions";

/* eslint-disable no-shadow */
import { syncClusterData, syncClusterDataStop } from "./actions";
import * as selectors from "./reducer";

const setupClusterReading = clusterName => setUpDataReading({
  reloadCluster: {
    specificator: clusterName,
    // Pure actions (without dispatch binding) here. Start/Stop should be
    // plain objects because they are used in saga.
    start: syncClusterData(clusterName),
    stop: syncClusterDataStop(),
  },
});

const useClusterSync = (dispatch, clusterName) => React.useEffect(
  () => {
    dispatch(setupClusterReading(clusterName));
  },
  [clusterName],
);

const withClusterState = connect(
  state => ({
    cluster: selectors.getCluster(state),
    dataLoaded: selectors.getClusterDataFetch(state).isSuccess,
  }),
  dispatch => ({
    useClusterSync: clusterName => useClusterSync(dispatch, clusterName),
  }),
);

export default withClusterState;
