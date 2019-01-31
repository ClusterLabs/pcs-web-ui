import { connect } from "react-redux";
import { compose } from "recompose";

import withDataSyncStartOnMount from "app/services/data-load/hoc";
import { withViewForNoData, withClusterSidebar } from "app/components";

/* eslint-disable no-shadow */
import { syncClusterData, syncClusterDataStop } from "./actions";
import * as selectors from "./reducer";

const withClusterState = connect(
  state => ({
    cluster: selectors.getCluster(state),
    dataFetch: selectors.getClusterDataFetch(state),
  }),
  { syncClusterData },
);

const withDataFetch = withDataSyncStartOnMount(({ clusterName }) => ({
  reloadCluster: {
    specificator: clusterName,
    // Pure actions (without dispatch binding) here. Start/Stop should be
    // plain objects because they are used in saga.
    start: syncClusterData(clusterName),
    stop: syncClusterDataStop(),
  },
}));

const withViewForNoClusterData = withViewForNoData(
  ({ dataFetch, clusterName, syncClusterData }) => ({
    isSuccess: dataFetch.isSuccess,
    loadingMessage: `Loading data for cluster: ${clusterName}`,
    isError: dataFetch.isError,
    errorMessage: dataFetch.errorMessage,
    // TODO retry does not work
    retry: () => syncClusterData(clusterName),
  }),
);

const routableClusterConnect = compose(
  withClusterState,
  withDataFetch,
  withClusterSidebar,
  withViewForNoClusterData,
);

export default routableClusterConnect;
