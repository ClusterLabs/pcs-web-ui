import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { RESOURCE_STATUS } from "app/services/cluster/types";
import { mapConstants, compareStrings } from "app/utils";

const statusLabel = mapConstants("Unknown", {
  [RESOURCE_STATUS.RUNNING]: "Running",
  [RESOURCE_STATUS.BLOCKED]: "Blocked",
  [RESOURCE_STATUS.FAILED]: "Failed",
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

export const resourcesToSummaryStatus = StatusIco.itemsToSummaryStatus(
  resource => statusToStatusIco(resource.status),
);

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
