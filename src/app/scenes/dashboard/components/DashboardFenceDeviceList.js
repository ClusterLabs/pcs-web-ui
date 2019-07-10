import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { RESOURCE } from "app/services/cluster/status-constants";
import { mapConstants, compareStrings } from "app/utils";

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

const COLUMNS = {
  NAME: "NAME",
  STATUS: "STATUS",
};

const statusSeverity = mapConstants(1, {
  [STATUS.FAILED]: 3,
  [STATUS.BLOCKED]: 2,
  [STATUS.RUNNING]: 0,
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
