import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { RESOURCE } from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";

const { STATUS } = RESOURCE;

const statusLabel = mapConstants("unknown", {
  [STATUS.RUNNING]: "running",
  [STATUS.BLOCKED]: "blocked",
  [STATUS.FAILED]: "failed",
});

const statusToStatusIco = mapConstants(StatusIco.STATUS_MAP.UNKNOWN, {
  [STATUS.BLOCKED]: StatusIco.STATUS_MAP.ERROR,
  [STATUS.FAILED]: StatusIco.STATUS_MAP.ERROR,
  [STATUS.RUNNING]: StatusIco.STATUS_MAP.OK,
});

export const fenceDeviceToSummaryStatus = StatusIco.itemsToSummaryStatus(
  fenceDevice => statusToStatusIco(fenceDevice.status),
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
          <td>
            <StatusSign
              status={statusToStatusIco(fenceDevice.status)}
              label={statusLabel(fenceDevice.status)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DashboardFenceDeviceList;
