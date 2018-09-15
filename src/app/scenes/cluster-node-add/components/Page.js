import React from 'react';
import {Header, Segment} from 'semantic-ui-react'

import ClusterTopMenu from "app/components/cluster/TopMenu.js"
import ClusterDataPage from "app/components/cluster/ClusterDataPage.js"

import ClusterNodeAddForm from "./ClusterNodeAddForm.js"

const ClusterNodesPage = ({cluster, match, actions, clusterNodeAdd}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={match.params.name} clusterSection="Add node"/>

    <ClusterDataPage
      clusterUrlId={match.params.name}
      cluster={cluster}
      activeMenu="nodes"
    >
      <Header as="h2">Add node</Header>
      <Segment>
        <ClusterNodeAddForm
          actions={actions}
          clusterName={cluster.data.name}
          clusterNodeAdd={clusterNodeAdd}
        />
      </Segment>
    </ClusterDataPage>
  </React.Fragment>
);
export default ClusterNodesPage;
