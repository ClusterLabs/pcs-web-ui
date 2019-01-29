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
import * as selectors from "../reducer";
import Properties from "./Properties";

const withClusterPropertiesState = connect(
  state => ({
    clusterProperties: selectors.clusterProperties(state),
    dataFetch: selectors.dataFetch(state),
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

const withViewForNoData = withPageLoading(
  ({ dataFetch }) => !dataFetch.isSuccess,
  ({ dataFetch, clusterName, actions }) => ({
    loadingMsg: `Loading properties for cluster: ${clusterName}`,
    isError: dataFetch.isError,
    errorMessage: dataFetch.errorMessage,
    // TODO retry does not work
    retry: () => actions.syncClusterData(clusterName),
  }),
  withClusterSidebar,
);

const ClusterPropertiesPage = ({ clusterProperties, clusterName }) => (
  <ClusterPage clusterName={clusterName}>
    <Page.Section>
      <Page.Title size="xl">Cluster properties</Page.Title>
      <Properties properties={clusterProperties} />
    </Page.Section>
  </ClusterPage>
);

export default compose(
  withClusterPropertiesState,
  withClusterPropertiesDataLoad,
  withViewForNoData,
)(ClusterPropertiesPage);
