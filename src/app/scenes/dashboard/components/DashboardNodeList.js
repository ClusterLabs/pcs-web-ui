import React from "react";

import { Table } from "app/components";
import { NODE } from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";

const { STATUS, QUORUM } = NODE;

const formatStatus = mapConstants("unknown", {
  [STATUS.ONLINE]: "online",
  [STATUS.OFFLINE]: "offline",
});

const formatQuorum = mapConstants("unknown", {
  [QUORUM.YES]: "yes",
  [QUORUM.NO]: "no",
});

const DashboardNodeList = ({ nodeList }) => (
  <Table isCompact isBorderless>
    <thead>
      <tr>
        <th>Node</th>
        <th>Status</th>
        <th>Quorum</th>
      </tr>
    </thead>
    <tbody>
      {nodeList.map(node => (
        <tr key={node.name}>
          <td>{node.name}</td>
          <td>{formatStatus(node.status)}</td>
          <td>{formatQuorum(node.quorum)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DashboardNodeList;
