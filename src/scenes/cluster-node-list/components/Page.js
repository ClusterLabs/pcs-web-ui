import React from 'react';
import {Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

import ClusterDataPage from "~/components/cluster/ClusterDataPage.js"
import ClusterTopMenu from "~/components/cluster/TopMenu.js"

import NodeList from "./NodeList.js"

const ClusterNodesPage = ({cluster, match, actions}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={match.params.name} clusterSection="Nodes"/>

    <ClusterDataPage
      clusterUrlId={match.params.name}
      cluster={cluster}
      activeMenu="nodes"
    >
      <Menu>
        <Menu.Item name="node-add">
          <Link to={`/cluster/${cluster.data.name}/node-add`}>Add</Link>
        </Menu.Item>
      </Menu>
      <NodeList
        nodeList={cluster.data.nodeList}
      />
    </ClusterDataPage>
  </React.Fragment>
);
export default ClusterNodesPage;
