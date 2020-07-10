import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { types, url, utils } from "app/store";
import { Link, StatusSign, Table } from "app/view";
import { toLabel } from "app/view/utils";

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

export const DashboardClusterResources = ({
  cluster,
}: {
  cluster: types.cluster.ClusterStatus;
}) => {
  const { sortState, compareItems } = SortableTh.useSorting<COLUMNS>("NAME");

  if (cluster.resourceTree.length === 0) {
    return (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon icon={PlusCircleIcon} />
        <Title size="lg" headingLevel="h3">
          {" "}
          No resource is configured.
          {" "}
        </Title>
        <EmptyStateBody>
          You don&apos;t have any configured resources here.
        </EmptyStateBody>
      </EmptyState>
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
                  to={url.cluster.resources(cluster.urlName, resource.id)}
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
