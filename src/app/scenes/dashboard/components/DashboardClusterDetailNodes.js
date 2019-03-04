import React from "react";

import { NODE } from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";
import { StatusSign } from "app/components";

import DashboardClusterDetailItems from "./DashboardClusterDetailItems";

const { STATUS, QUORUM } = NODE;

const getStatusSign = mapConstants(StatusSign.Unknown, {
  [STATUS.ONLINE]: StatusSign.Online,
  [STATUS.OFFLINE]: StatusSign.Offline,
});

const getQuorumSign = mapConstants(StatusSign.Unknown, {
  [QUORUM.YES]: StatusSign.Success,
  [QUORUM.NO]: StatusSign.Error,
});

const compareItems = (a, b) => {
  if (a.status === STATUS.ONLINE && b.status !== STATUS.ONLINE) {
    return 1;
  }

  if (a.status !== STATUS.ONLINE && b.status === STATUS.ONLINE) {
    return -1;
  }

  if (a.quorum === QUORUM.YES && b.quorum !== QUORUM.YES) {
    return 1;
  }

  if (a.quorum !== QUORUM.YES && b.quorum === QUORUM.YES) {
    return -1;
  }

  return a.name.toUpperCase() - b.name.toUpperCase();
};

const DashboardClusterDetailNodes = ({ nodeList }) => (
  <DashboardClusterDetailItems
    columns={["Name", "Status", "Quorum"]}
    itemList={nodeList}
    isItemOk={node => (
      node.status === STATUS.ONLINE
      &&
      node.quorum === QUORUM.YES
    )}
    compareItems={compareItems}
    itemToRow={node => [
      node.name,
      { title: React.createElement(getStatusSign(node.status)) },
      { title: React.createElement(getQuorumSign(node.quorum)) },
    ]}
    itemType="Nodes"
    noItemMessage="No node"
  />
);

export default DashboardClusterDetailNodes;
