import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "recompose";

import { loadDataOnMount } from "app/services/data-load/hoc";
import * as rawDataLoadActions from "app/services/data-load/actions";
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
    dataLoadActions: bindActionCreators(rawDataLoadActions, dispatch),
  }),
);

const withDataFetch = loadDataOnMount(({ clusterName }) => ({
  reloadCluster: {
    specificator: clusterName,
    start: clusterActions.syncClusterData(clusterName),
    stop: clusterActions.syncClusterDataStop(),
  },
}));

const withViewForNoClusterData = withViewForNoData(
  ({ dataFetch, clusterName }) => ({
    isSuccess: dataFetch.isSuccess,
    loadingMessage: `Loading data for cluster: ${clusterName}`,
    isError: dataFetch.isError,
    errorMessage: dataFetch.errorMessage,
    // TODO retry does not work
    retry: () => clusterActions.syncClusterData(clusterName),
  }),
  withClusterSidebar,
);

const routableClusterConnect = compose(
  withClusterState,
  withDataFetch,
  withViewForNoClusterData,
);

export default routableClusterConnect;
