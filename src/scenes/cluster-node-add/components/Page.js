import React from 'react';
import {Header, Segment} from 'semantic-ui-react'

import ClusterTopMenu from "../../../components/cluster/TopMenu.js"
import ClusterPageContent from "../../../components/cluster/PageContent.js"
import ClusterNodeAddForm from "./ClusterNodeAddForm.js"

const ClusterNodesPage = ({cluster, match, nodeAddActions, clusterNodeAdd}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={cluster.name} clusterSection="Add node"/>

    <ClusterPageContent
      clusterUrlId={match.params.name}
      clusterName={cluster.name}
      activeMenu="nodes"
    >
      <Header as="h2">Add node</Header>
      <Segment>
        <ClusterNodeAddForm
          actions={nodeAddActions}
          clusterName={cluster.name}
          clusterNodeAdd={clusterNodeAdd}
        />
      </Segment>
    </ClusterPageContent>
  </React.Fragment>
);
export default ClusterNodesPage;
