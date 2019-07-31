import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { RESOURCE_STATUS } from "app/services/cluster/types";
import { mapConstants, compareStrings } from "app/utils";

const statusLabel = mapConstants("unknown", {
  [RESOURCE_STATUS.RUNNING]: "running",
  [RESOURCE_STATUS.BLOCKED]: "blocked",
  [RESOURCE_STATUS.FAILED]: "failed",
});

const statusToStatusIco = mapConstants(StatusIco.STATUS_MAP.UNKNOWN, {
  [RESOURCE_STATUS.BLOCKED]: StatusIco.STATUS_MAP.ERROR,
  [RESOURCE_STATUS.FAILED]: StatusIco.STATUS_MAP.ERROR,
  [RESOURCE_STATUS.RUNNING]: StatusIco.STATUS_MAP.OK,
});

const COLUMNS = {
  NAME: "NAME",
  STATUS: "STATUS",
};

const statusSeverity = mapConstants(1, {
  [RESOURCE_STATUS.FAILED]: 3,
  [RESOURCE_STATUS.BLOCKED]: 2,
  [RESOURCE_STATUS.RUNNING]: 0,
});


const compareByColumn = (column) => {
  switch (column) {
    case COLUMNS.STATUS: return (a, b) => (
      statusSeverity(a.status) - statusSeverity(b.status)
    );
    default: return (a, b) => compareStrings(a.id, b.id);
  }
};

export const fenceDeviceToSummaryStatus = StatusIco.itemsToSummaryStatus(
  fenceDevice => statusToStatusIco(fenceDevice.status),
);

const DashboardFenceDeviceList = ({ fenceDeviceList }) => {
  const {
    compareItems,
    SortableTh,
  } = Table.SortableTh.useSorting(COLUMNS.NAME);

  return (
    <Table isCompact isBorderless>
      <thead>
        <tr>
          <SortableTh columnName={COLUMNS.NAME}>Fence device</SortableTh>
          <SortableTh columnName={COLUMNS.STATUS} startDesc>Status</SortableTh>
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
