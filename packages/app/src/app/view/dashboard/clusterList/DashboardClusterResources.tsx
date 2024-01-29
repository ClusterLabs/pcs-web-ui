import {Tbody, Td, Thead, Tr} from "@patternfly/react-table";

import {testMarks} from "app/view/dataTest";
import {
  EmptyStateClusterStopped,
  EmptyStateNoItem,
  Link,
  ResourceStatusInfoListSigns,
  Table,
  compareStatusSeverity,
  location,
} from "app/view/share";

import {Cluster, Resource} from "./types";
import {compareStrings} from "./utils";

const columnList = ["NAME", "STATUS"] as const;

const compareByColumn = (
  column: (typeof columnList)[number],
): ((_a: Resource, _b: Resource) => number) => {
  switch (column) {
    case "STATUS":
      return (a, b) =>
        compareStatusSeverity(a.status.maxSeverity, b.status.maxSeverity);

    default:
      return (a, b) => compareStrings(a.id, b.id);
  }
};

const {SortableTh} = Table;

const {resource: resourceMark} = testMarks.dashboard.clusterList.cluster;

export const DashboardClusterResources = ({cluster}: {cluster: Cluster}) => {
  const {sortState, compareItems} = SortableTh.useSorting(columnList);

  if (!cluster.hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title="Cannot get resources from stopped cluster"
        clusterName={cluster.name}
      />
    );
  }

  if (cluster.resourceTree.length === 0) {
    return (
      <EmptyStateNoItem
        title="No resource is configured."
        message="You don't have any configured resources here."
      />
    );
  }

  return (
    <Table isCompact isBorderless>
      <Thead>
        <Tr>
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
        </Tr>
      </Thead>
      <Tbody>
        {cluster.resourceTree
          .sort(compareItems(compareByColumn))
          .map(resource => (
            <Tr key={resource.id} {...resourceMark.mark}>
              <Td>
                <Link
                  to={location.resource({
                    clusterName: cluster.name,
                    resourceId: resource.id,
                  })}
                  {...resourceMark.id.mark}
                />
              </Td>
              <Td {...resourceMark.status.mark}>
                <ResourceStatusInfoListSigns
                  resourceStatusInfoList={resource.status.infoList}
                />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
