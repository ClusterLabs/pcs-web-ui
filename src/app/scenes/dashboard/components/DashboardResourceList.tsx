import React from "react";

import { Table, StatusIco, StatusSign } from "app/components";
import { RESOURCE_STATUS, Resource } from "app/services/cluster/types";
import { compareStrings } from "app/utils";

const statusLabel = (status: RESOURCE_STATUS) => {
  switch (status) {
    case "RUNNING": return "Running";
    case "BLOCKED": return "Blocked";
    case "FAILED": return "Failed";
    default: return "Unknown";
  }
};

const statusToStatusIco = (
  status: RESOURCE_STATUS,
): React.ComponentProps<typeof StatusIco>["status"] => {
  switch (status) {
    case "BLOCKED": return "ERROR";
    case "FAILED": return "ERROR";
    case "RUNNING": return "OK";
    default: return "UNKNOWN";
  }
};

const statusSeverity = (status: RESOURCE_STATUS) => {
  switch (status) {
    case "BLOCKED": return 2;
    case "FAILED": return 3;
    case "RUNNING": return 0;
    default: return 1;
  }
};

export const resourcesToSummaryStatus = StatusIco.itemsToSummaryStatus(
  (resource: Resource) => statusToStatusIco(resource.status),
);

enum COLUMNS {
  NAME = "NAME",
  STATUS = "STATUS",
}

const compareByColumn = (column: COLUMNS) => {
  switch (column) {
    case COLUMNS.STATUS: return (a: Resource, b: Resource) => (
      statusSeverity(a.status) - statusSeverity(b.status)
    );
    default: return (a: Resource, b: Resource) => compareStrings(a.id, b.id);
  }
};

const DashboardResourceList = ({ resourceList }: {
  resourceList: Resource[],
}) => {
  const { sortState, compareItems } = Table.SortableTh.useSorting(COLUMNS.NAME);
  return (
    <Table isCompact isBorderless>
      <thead>
        <tr>
          <Table.SortableTh columnName={COLUMNS.NAME} sortState={sortState}>
            Resource
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
