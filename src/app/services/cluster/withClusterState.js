import React from "react";
import { connect } from "react-redux";

import { setUpDataReading } from "app/services/data-load/actions";

/* eslint-disable no-shadow */
import { syncClusterData, syncClusterDataStop } from "./actions";
import * as selectors from "./reducer";

const setupClusterReading = clusterUrlName => setUpDataReading({
  reloadCluster: {
    specificator: clusterUrlName,
    // Pure actions (without dispatch binding) here. Start/Stop should be
    // plain objects because they are used in saga.
    start: syncClusterData(clusterUrlName),
    stop: syncClusterDataStop(),
  },
});

const useClusterSync = (dispatch, clusterUrlName) => React.useEffect(
  () => {
    dispatch(setupClusterReading(clusterUrlName));
  },
  [clusterUrlName],
);

const withClusterState = connect(
  state => ({
    cluster: selectors.getCluster(state),
    dataLoaded: selectors.getClusterDataFetch(state).isSuccess,
  }),
  dispatch => ({
    useClusterSync: clusterUrlName => useClusterSync(dispatch, clusterUrlName),
  }),
);

export default withClusterState;
