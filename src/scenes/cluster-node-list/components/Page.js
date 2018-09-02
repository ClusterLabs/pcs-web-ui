import React from 'react';
import {Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

import ClusterPageContent from "~/components/cluster/PageContent.js"
import ClusterTopMenu from "~/components/cluster/TopMenu.js"

import NodeList from "./NodeList.js"

const ClusterNodesPage = ({cluster, match}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={cluster.name} clusterSection="Nodes"/>

    <ClusterPageContent
      clusterUrlId={match.params.name}
      clusterName={cluster.name}
      activeMenu="nodes"
    >
      <Menu>
        <Menu.Item name="node-add">
          <Link to={`/cluster/${cluster.name}/node-add`}>Add</Link>
        </Menu.Item>
      </Menu>
      <NodeList
        nodeList={cluster.nodeList}
      />
    </ClusterPageContent>
  </React.Fragment>
);
export default ClusterNodesPage;
