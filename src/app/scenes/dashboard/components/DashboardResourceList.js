import React from "react";

import { Table } from "app/components";
import { RESOURCE } from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";

const { STATUS } = RESOURCE;

const formatStatus = mapConstants("unknown", {
  [STATUS.RUNNING]: "running",
  [STATUS.BLOCKED]: "blocked",
  [STATUS.FAILED]: "failed",
});

const DashboardResourceList = ({ resourceList }) => (
  <Table isCompact isBorderless>
    <thead>
      <tr>
        <th>Resource</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {resourceList.map(resource => (
        <tr key={resource.id}>
          <td>{resource.id}</td>
          <td>{formatStatus(resource.status)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DashboardResourceList;
