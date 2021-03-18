import React from "react";

import * as location from "app/scenes/location";
import { types, utils } from "app/store";
import { EmptyStateNoItem, Link, StatusSign, Table, toLabel } from "app/view";

import { compareStrings } from "./utils";

type COLUMNS = "NAME" | "STATUS";

const compareByColumn = (
  column: COLUMNS | "",
): ((
  a: types.cluster.ResourceTreeItem,
  b: types.cluster.ResourceTreeItem,
) => number) => {
  switch (column) {
    case "STATUS":
      return (a, b) =>
        utils.compareStatusSeverity(a.status.maxSeverity, b.status.maxSeverity);
    default:
      return (a, b) => compareStrings(a.id, b.id);
  }
};

const { SortableTh } = Table;

export const DashboardClusterResources: React.FC<{
  cluster: types.cluster.ClusterStatus;
}> = ({ cluster }) => {
  const { sortState, compareItems } = SortableTh.useSorting<COLUMNS>("NAME");

  if (cluster.resourceTree.length === 0) {
    return (
      <EmptyStateNoItem
        title="No resource is configured."
        message="You don't have any configured resources here."
      />
    );
  }

  return (
    <Table isCompact isBorderless data-test="resource-list">
      <thead>
        <tr>
          <SortableTh columnName="NAME" sortState={sortState} data-label="name">
            Resource
          </SortableTh>
          <SortableTh
            columnName="STATUS"
            sortState={sortState}
            startDesc
            data-label="status"
          >
            Status
          </SortableTh>
        </tr>
      </thead>
      <tbody>
        {cluster.resourceTree
          .sort(compareItems(compareByColumn))
          .map(resource => (
            <tr key={resource.id} data-test={`resource ${resource.id}`}>
              <td data-test="name">
                <Link
                  to={location.resource({
                    clusterName: cluster.name,
                    resourceId: resource.id,
                  })}
                />
              </td>
              <td data-label="status">
                {resource.status.infoList.map((status, i) => (
                  /* eslint-disable react/no-array-index-key */
                  <StatusSign
                    key={i}
                    status={status.severity}
                    label={toLabel(status.label)}
                  />
                ))}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
