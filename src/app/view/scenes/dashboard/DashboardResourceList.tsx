import React from "react";
import { Link } from "react-router-dom";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { types } from "app/store";
import { Table, StatusSign } from "app/view/common";
import { toLabel } from "app/view/utils";

import { compareStatusSeverity, compareStrings } from "./utils";

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

const { SortableTh } = Table;

export const DashboardResourceList = ({ cluster }: {
  cluster: types.dashboard.ClusterState,
}) => {
  const { sortState, compareItems } = SortableTh.useSorting<COLUMNS>("NAME");

  if (cluster.resourceTree.length === 0) {
    return (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon icon={PlusCircleIcon} />
        <Title size="lg"> No resource is configured. </Title>
        <EmptyStateBody>
          You don&apos;t have any configured resources here.
        </EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <Table isCompact isBorderless aria-label="Cluster resource list">
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
        {cluster.resourceTree.sort(compareItems(compareByColumn)).map(
          (resource) => (
            <tr key={resource.id} aria-label={`Resource ${resource.id}`}>
              <td data-label="name">
                <Link
                  to={`/cluster/${cluster.urlName}/resources/${resource.id}`}
                >
                  {resource.id}
                </Link>
              </td>
              <td data-label="status">
                <StatusSign
                  status={resource.statusSeverity}
                  label={toLabel(resource.status)}
                />
              </td>
            </tr>
          ),
        )}
      </tbody>
    </Table>
  );
};
