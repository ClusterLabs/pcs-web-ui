import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { RESOURCE } from "app/services/cluster/status-constants";
import { mapConstants, compareStrings } from "app/utils";

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

const COLUMNS = {
  NAME: "NAME",
  STATUS: "STATUS",
};

export const resourcesToSummaryStatus = StatusIco.itemsToSummaryStatus(
  resource => statusToStatusIco(resource.status),
);

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

const DashboardResourceList = ({ resourceList }) => {
  const {
    compareItems,
    SortableTh,
  } = Table.SortableTh.useSorting(COLUMNS.NAME);

  return (
    <Table isCompact isBorderless>
      <thead>
        <tr>
          <SortableTh columnName={COLUMNS.NAME}>Resource</SortableTh>
          <SortableTh columnName={COLUMNS.STATUS} startDesc>Status</SortableTh>
        </tr>
      </thead>
      <tbody>
        {resourceList.sort(compareItems(compareByColumn)).map(resource => (
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
};

export default DashboardResourceList;
