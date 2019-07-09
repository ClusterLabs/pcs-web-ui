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

export const fenceDeviceToSummaryStatus = nodeList => nodeList.reduce(
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


const DashboardFenceDeviceList = ({ fenceDeviceList }) => (
  <Table isCompact isBorderless>
    <thead>
      <tr>
        <th>Resource</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {fenceDeviceList.map(fenceDevice => (
        <tr key={fenceDevice.id}>
          <td>{fenceDevice.id}</td>
          <td>{formatStatus(fenceDevice.status)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DashboardFenceDeviceList;
