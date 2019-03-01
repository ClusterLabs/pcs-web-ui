import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, lifecycle } from "recompose";

import {
  Page,
  withClusterSidebar,
  withViewForNoData,
} from "app/components";

import * as clusterPropertiesActions from "../actions";
import * as selectors from "../reducer";
import Properties from "./Properties";

const withClusterPropertiesState = connect(
  state => ({
    clusterProperties: selectors.getClusterProperties(state),
    dataFetch: selectors.getClusterPropertiesDataFetch(state),
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

const withViewForNoPropertiesData = withViewForNoData(
  ({ dataFetch, clusterName }) => ({
    isSuccess: dataFetch.isSuccess,
    loadingMessage: `Loading properties for cluster: ${clusterName}`,
  }),
);

const ClusterPropertiesPage = ({ clusterProperties, sidebarNavigation }) => (
  <Page sidebarNavigation={sidebarNavigation}>
    <Page.Section>
      <Page.Title size="xl">Cluster properties</Page.Title>
      <Properties properties={clusterProperties} />
    </Page.Section>
  </Page>
);

export default compose(
  withClusterPropertiesState,
  withClusterPropertiesDataLoad,
  withClusterSidebar,
  withViewForNoPropertiesData,
)(ClusterPropertiesPage);
