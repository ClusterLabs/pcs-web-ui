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
