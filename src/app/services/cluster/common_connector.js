import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "recompose";

import { loadDataOnMount } from "app/services/data-load/hoc";
import * as rawDataLoadActions from "app/services/data-load/actions";
import { withPageLoading, withClusterSidebar } from "app/components";

import * as clusterActions from "./actions";

const mapStateToProps = state => ({
  cluster: state.cluster,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(clusterActions, dispatch),
  dataLoadActions: bindActionCreators(rawDataLoadActions, dispatch),
});

const withClusterState = connect(mapStateToProps, mapDispatchToProps);

const withClusterDataLoad = loadDataOnMount(({ clusterName }) => ({
  reloadCluster: {
    specificator: clusterName,
    start: clusterActions.syncClusterData(clusterName),
    stop: clusterActions.syncClusterDataStop(),
  },
}));

const withLoadingState = withPageLoading(
  ({ cluster }) => cluster.ui.initialLoading.status !== "none",
  ({ cluster, clusterName }) => ({
    loadingMsg: `Loading data for cluster: ${clusterName}`,
    isError: cluster.ui.initialLoading.status === "error",
    errorMsg: cluster.ui.initialLoading.errorMsg.message,
    // TODO retry does not work
    retry: () => clusterActions.syncClusterData(clusterName),
  }),
  withClusterSidebar,
);

const routableClusterConnect = compose(
  withClusterState,
  withClusterDataLoad,
  withLoadingState,
);

export default routableClusterConnect;
