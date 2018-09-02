import React from 'react';

import ClusterPageContent from "~/components/cluster/PageContent.js"
import ClusterTopMenu from "~/components/cluster/TopMenu.js"

import Properties from "./Properties.js"

export default class Page extends React.Component{
  componentDidMount(){
    this.props.actions.fetchClusterProperties(this.props.match.params.name);
  }
  render(){
    return (
      <React.Fragment>
        <ClusterTopMenu
          clusterName={this.props.clusterProperties.clusterName}
          clusterSection="Cluster properties"
        />

        <ClusterPageContent
          clusterUrlId={this.props.match.params.name}
          clusterName={this.props.clusterProperties.clusterName}
          activeMenu="properties"
        >
          <Properties properties={this.props.clusterProperties.properties} />
        </ClusterPageContent>
      </React.Fragment>
    )
  }
};
