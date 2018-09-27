import React from "react";

import ClusterPageContent from "app/components/cluster/ClusterPageContent";
import ClusterTopMenu from "app/components/cluster/TopMenu";
import DataLoadingPage from "app/components/DataLoadingPage";

import Properties from "./Properties";

export default class Page extends React.Component {
  componentDidMount() {
    const { actions, match } = this.props;
    actions.fetchClusterProperties(match.params.name);
  }

  render() {
    const { clusterProperties, match, actions } = this.props;
    const { initialLoading } = clusterProperties.ui;
    const clusterName = match.params.name;
    return (
      <React.Fragment>
        <ClusterTopMenu
          clusterName={clusterName}
          clusterSection="Cluster properties"
        />

        <DataLoadingPage
          loadingStatus={initialLoading.status}
          loadingMsg={`Loading properties of the cluster '${clusterName}'.`}
          errorHeader={`Cannot load properties of cluster '${clusterName}'`}
          errorMsg={initialLoading.errorMsg}
          retry={() => actions.fetchClusterProperties(clusterName)}
        >
          <ClusterPageContent clusterName={clusterName} activeMenu="properties">
            <Properties properties={clusterProperties.properties} />
          </ClusterPageContent>
        </DataLoadingPage>
      </React.Fragment>
    );
  }
}
