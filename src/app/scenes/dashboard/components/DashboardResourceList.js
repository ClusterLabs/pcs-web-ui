import React from "react";

import { Table, StatusIco } from "app/components";
import { RESOURCE } from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";

const { STATUS } = RESOURCE;

const formatStatus = mapConstants("unknown", {
  [STATUS.RUNNING]: "running",
  [STATUS.BLOCKED]: "blocked",
  [STATUS.FAILED]: "failed",
});

export const resourcesToSummaryStatus = nodeList => nodeList.reduce(
  (sumStatus, resource) => {
    if (
      sumStatus === StatusIco.STATUS_MAP.ERROR
      ||
      [STATUS.BLOCKED, STATUS.FAILED].includes(resource.status)
    ) {
      return StatusIco.STATUS_MAP.ERROR;
    }
    if (
      sumStatus === StatusIco.STATUS_MAP.UNKNOWN
      ||
      resource.status !== STATUS.RUNNING
    ) {
      return StatusIco.STATUS_MAP.UNKNOWN;
    }
    return StatusIco.STATUS_MAP.OK;
  },
  StatusIco.STATUS_MAP.OK,
);

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
