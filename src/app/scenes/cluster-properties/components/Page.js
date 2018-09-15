import React from 'react';

import ClusterPageContent from "app/components/cluster/ClusterPageContent.js"
import ClusterTopMenu from "app/components/cluster/TopMenu.js"
import DataLoadingPage from "app/components/DataLoadingPage";

import Properties from "./Properties.js"

export default class Page extends React.Component{
  componentDidMount(){
    this.props.actions.fetchClusterProperties(this.props.match.params.name);
  }
  render(){
    const clusterProperties = this.props.clusterProperties;
    const initialLoading = clusterProperties.ui.initialLoading;
    const clusterName = this.props.match.params.name;
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
          retry={() => this.props.actions.fetchClusterProperties(clusterName)}
        >
          <ClusterPageContent clusterName={clusterName} activeMenu="properties">
            <Properties properties={clusterProperties.properties}/>
          </ClusterPageContent>
        </DataLoadingPage>
      </React.Fragment>
    )
  }
};
