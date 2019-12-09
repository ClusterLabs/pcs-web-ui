import React from "react";

import { Table, StatusSign, NoItemCase } from "app/common/components";
import { compareStatusSeverity } from "app/view/utils";
import { compareStrings, toLabel } from "app/common/utils";
import { types } from "app/store";

type COLUMNS = "NAME"|"STATUS";

const compareByColumn = (
  column: COLUMNS|"",
): (
  (
    a: types.dashboard.ResourceTreeItem,
    b: types.dashboard.ResourceTreeItem,
  ) => number
) => {
  switch (column) {
    case "STATUS": return (a, b) => compareStatusSeverity(
      a.statusSeverity,
      b.statusSeverity,
    );
    default: return (a, b) => compareStrings(a.id, b.id);
  }
};

const SortableTh = Table.SortableTh.bindColumns<COLUMNS>();

const DashboardResourceList = ({ resourceList }: {
  resourceList: types.dashboard.ResourceTreeItem[],
}) => {
  const { sortState, compareItems } = SortableTh.useSorting("NAME");

  if (resourceList.length === 0) {
    return <NoItemCase message="No resource is configured." />;
  }

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
