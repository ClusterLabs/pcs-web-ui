import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { RESOURCE } from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";

const { STATUS } = RESOURCE;

const statusLabel = mapConstants("Unknown", {
  [STATUS.RUNNING]: "Running",
  [STATUS.BLOCKED]: "Blocked",
  [STATUS.FAILED]: "Failed",
});

const statusToStatusIco = mapConstants(StatusIco.STATUS_MAP.UNKNOWN, {
  [STATUS.BLOCKED]: StatusIco.STATUS_MAP.ERROR,
  [STATUS.FAILED]: StatusIco.STATUS_MAP.ERROR,
  [STATUS.RUNNING]: StatusIco.STATUS_MAP.OK,
});

export const resourcesToSummaryStatus = StatusIco.itemsToSummaryStatus(
  resource => statusToStatusIco(resource.status),
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
          <td>
            <StatusSign
              status={statusToStatusIco(resource.status)}
              label={statusLabel(resource.status)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DashboardResourceList;
