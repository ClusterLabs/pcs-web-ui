import React from "react";

import { Table, StatusSign } from "app/common/components";
import { ResourceTreeItem } from "app/services/cluster/types";
import { compareStrings, toLabel, statusSeverity } from "app/common/utils";

type COLUMNS = "NAME"|"STATUS";

const compareByColumn = (
  column: COLUMNS|"",
): (
  (a: ResourceTreeItem, b: ResourceTreeItem) => number
) => {
  switch (column) {
    case "STATUS": return (a, b) => statusSeverity.compare(
      a.statusSeverity,
      b.statusSeverity,
    );
    default: return (a, b) => compareStrings(a.id, b.id);
  }
};

const SortableTh = Table.SortableTh.bindColumns<COLUMNS>();

const DashboardResourceList = ({ resourceList }: {
  resourceList: ResourceTreeItem[],
}) => {
  const { sortState, compareItems } = SortableTh.useSorting("NAME");

  return (
    <Table isCompact isBorderless>
      <thead>
        <tr>
          <SortableTh columnName="NAME" sortState={sortState}>
            Resource
          </SortableTh>
          <SortableTh columnName="STATUS" sortState={sortState} startDesc>
            Status
          </SortableTh>
        </tr>
      </thead>
      <tbody>
        {resourceList.sort(compareItems(compareByColumn)).map(resource => (
          <tr key={resource.id}>
            <td>{resource.id}</td>
            <td>
              <StatusSign
                status={resource.statusSeverity}
                label={toLabel(resource.status)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DashboardResourceList;
