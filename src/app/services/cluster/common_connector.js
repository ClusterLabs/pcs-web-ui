import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "recompose";

import withDataLoadOnMount from "app/services/data-load/hoc";
import { withViewForNoData, withClusterSidebar } from "app/components";

import * as clusterActions from "./actions";
import * as selectors from "./reducer";

const withClusterState = connect(
  state => ({
    cluster: selectors.cluster(state),
    dataFetch: selectors.clusterDataFetch(state),

  }),
  dispatch => ({
    actions: bindActionCreators(clusterActions, dispatch),
  }),
);

const withDataFetch = withDataLoadOnMount(({ clusterName }) => ({
  reloadCluster: {
    specificator: clusterName,
    // Pure actions (without dispatch binding) here. Start/Stop should be
    // plain objects because they are used in saga.
    start: clusterActions.syncClusterData(clusterName),
    stop: clusterActions.syncClusterDataStop(),
  },
}));

const withViewForNoClusterData = withViewForNoData(
  ({ dataFetch, clusterName, actions }) => ({
    isSuccess: dataFetch.isSuccess,
    loadingMessage: `Loading data for cluster: ${clusterName}`,
    isError: dataFetch.isError,
    errorMessage: dataFetch.errorMessage,
    // TODO retry does not work
    retry: () => actions.syncClusterData(clusterName),
  }),
);

const routableClusterConnect = compose(
  withClusterState,
  withDataFetch,
  withClusterSidebar,
  withViewForNoClusterData,
);

export default routableClusterConnect;
