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

type COLUMNS = "NAME" | "STATUS";

const compareByColumn = (
  column: COLUMNS | "",
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
  const {sortState, compareItems} = SortableTh.useSorting<COLUMNS>("NAME");

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
            <tr key={resource.id} {...resourceMark.mark}>
              <td>
                <Link
                  to={location.resource({
                    clusterName: cluster.name,
                    resourceId: resource.id,
                  })}
                  {...resourceMark.id.mark}
                />
              </td>
              <td {...resourceMark.status.mark}>
                <ResourceStatusInfoListSigns
                  resourceStatusInfoList={resource.status.infoList}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};