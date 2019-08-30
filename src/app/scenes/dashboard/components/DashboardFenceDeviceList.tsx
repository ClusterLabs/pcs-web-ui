import React from "react";

import { Table, StatusIco, StatusSign } from "app/common/components";
import { FENCE_DEVICE_STATUS, FenceDevice } from "app/services/cluster/types";
import { compareStrings } from "app/common/utils";

const statusLabel = (status: FENCE_DEVICE_STATUS) => {
  switch (status) {
    case "RUNNING": return "Running";
    case "BLOCKED": return "Blocked";
    case "FAILED": return "Failed";
    default: return "Unknown";
  }
};

const statusToStatusIco = (
  status: FENCE_DEVICE_STATUS,
): React.ComponentProps<typeof StatusIco>["status"] => {
  switch (status) {
    case "BLOCKED": return "ERROR";
    case "FAILED": return "ERROR";
    case "RUNNING": return "OK";
    default: return "UNKNOWN";
  }
};

type COLUMNS = "NAME"|"STATUS";

const statusSeverity = (status: FENCE_DEVICE_STATUS) => {
  switch (status) {
    case "BLOCKED": return 2;
    case "FAILED": return 3;
    case "RUNNING": return 0;
    default: return 1;
  }
};

const compareByColumn = (column: COLUMNS|"") => {
  switch (column) {
    case "STATUS": return (a: FenceDevice, b: FenceDevice) => (
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

const SortableTh = Table.SortableTh.bindColumns<COLUMNS>();

const DashboardFenceDeviceList = ({ fenceDeviceList }: {
  fenceDeviceList: FenceDevice[],
}) => {
  const { sortState, compareItems } = SortableTh.useSorting("NAME");
  return (
    <Table isCompact isBorderless>
      <thead>
        <tr>
          <SortableTh columnName="NAME" sortState={sortState}>
            Fence device
          </SortableTh>
          <SortableTh columnName="STATUS" sortState={sortState} startDesc>
            Status
          </SortableTh>
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
