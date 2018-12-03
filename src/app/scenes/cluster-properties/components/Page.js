import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, lifecycle } from "recompose";

import {
  Page,
  ClusterPage,
  withClusterSidebar,
  withPageLoading,
} from "app/components";

import * as clusterPropertiesActions from "../actions";
import Properties from "./Properties";

const withClusterPropertiesState = connect(
  state => ({
    clusterProperties: state.clusterProperties,
  }),
  dispatch => ({
    actions: bindActionCreators(clusterPropertiesActions, dispatch),
  }),
);

const withClusterPropertiesDataLoad = lifecycle({
  componentDidMount() {
    const { actions, clusterName } = this.props;
    actions.fetchClusterProperties(clusterName);
  },
});

const withLoadingState = withPageLoading(
  ({ clusterProperties }) => clusterProperties.ui.initialLoading.status !== "none",
  ({ clusterName, clusterProperties, actions }) => ({
    loadingMsg: `Loading properties for cluster: ${clusterName}`,
    isError: clusterProperties.ui.initialLoading.status === "error",
    errorMsg: clusterProperties.ui.initialLoading.errorMsg.message,
    // TODO retry does not work
    retry: () => actions.syncClusterData(clusterName),
  }),
  withClusterSidebar,
);

const ClusterPropertiesPage = ({ clusterProperties, clusterName }) => (
  <ClusterPage clusterName={clusterName}>
    <Page.Section>
      <Page.Title size="xl">Cluster properties</Page.Title>
      <Properties properties={clusterProperties.properties} />
    </Page.Section>
  </ClusterPage>
);

export default compose(
  withClusterPropertiesState,
  withClusterPropertiesDataLoad,
  withLoadingState,
)(ClusterPropertiesPage);
