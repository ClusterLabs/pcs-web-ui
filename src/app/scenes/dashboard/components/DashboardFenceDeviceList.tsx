import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { FENCE_DEVICE_STATUS, FenceDevice } from "app/services/cluster/types";
import { compareStrings } from "app/utils";

const statusLabel = (status: FENCE_DEVICE_STATUS) => {
  switch (status) {
    case "RUNNING": return "Running";
    case "BLOCKED": return "Blocked";
    case "FAILED": return "Failed";
    default: return "Unknown";
  }
};

const statusToStatusIco = (status: FENCE_DEVICE_STATUS) => {
  switch (status) {
    case "BLOCKED": return StatusIco.STATUS_MAP.ERROR;
    case "FAILED": return StatusIco.STATUS_MAP.ERROR;
    case "RUNNING": return StatusIco.STATUS_MAP.OK;
    default: return StatusIco.STATUS_MAP.UNKNOWN;
  }
};

enum COLUMNS {
  NAME = "NAME",
  STATUS = "STATUS",
}

const statusSeverity = (status: FENCE_DEVICE_STATUS) => {
  switch (status) {
    case "BLOCKED": return 2;
    case "FAILED": return 3;
    case "RUNNING": return 0;
    default: return 1;
  }
};


const compareByColumn = (column: COLUMNS) => {
  switch (column) {
    case COLUMNS.STATUS: return (a: FenceDevice, b: FenceDevice) => (
      statusSeverity(a.status) - statusSeverity(b.status)
    );
    default: return (
      a: FenceDevice,
      b: FenceDevice,
    ) => compareStrings(a.id, b.id);
  }
};

export const fenceDeviceToSummaryStatus = StatusIco.itemsToSummaryStatus(
  (fenceDevice: FenceDevice) => statusToStatusIco(fenceDevice.status),
);

const DashboardFenceDeviceList = ({ fenceDeviceList }: {
  fenceDeviceList: FenceDevice[],
}) => {
  const { sortState, compareItems } = Table.SortableTh.useSorting(COLUMNS.NAME);

  return (
    <Table isCompact isBorderless>
      <thead>
        <tr>
          <Table.SortableTh columnName={COLUMNS.NAME} sortState={sortState}>
            Fence device
          </Table.SortableTh>
          <Table.SortableTh
            columnName={COLUMNS.STATUS}
            sortState={sortState}
            startDesc
          >
            Status
          </Table.SortableTh>
        </tr>
      </thead>
      <tbody>
        {fenceDeviceList.sort(compareItems(compareByColumn)).map(
          fenceDevice => (
            <tr key={fenceDevice.id}>
              <td>{fenceDevice.id}</td>
              <td>
                <StatusSign
                  status={statusToStatusIco(fenceDevice.status)}
                  label={statusLabel(fenceDevice.status)}
                />
              </td>
            </tr>
          ),
        )}
      </tbody>
    </Table>
  );
};

export default DashboardFenceDeviceList;
