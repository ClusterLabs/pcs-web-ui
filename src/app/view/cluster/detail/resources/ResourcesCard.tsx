import {Badge} from "@patternfly/react-core";

import {Cluster} from "app/view/cluster/types";
import {
  EmptyStateNoItem,
  Link,
  location,
  useSelectedClusterName,
} from "app/view/share";

import {ResourceCounts} from "./ResourceCounts";

export const ResourcesCard = ({
  resourceTree,
}: {
  resourceTree: Cluster["resourceTree"];
}) => {
  const clusterName = useSelectedClusterName();
  if (resourceTree.length === 0) {
    return (
      <EmptyStateNoItem
        title="No resource is configured."
        message="You don't have any configured resources here."
      />
    );
  }

  const resourceTreeLink = (
    <Link isInline to={location.resourceList({clusterName})}>
      resources
    </Link>
  );

  const statistics = resourceTree.reduce(
    (statistics, resource) => {
      const newStatistics = {...statistics};
      if (resource.itemType === "primitive") {
        newStatistics.plain.total.push(resource.id);
      }
      if (resource.itemType === "group") {
        newStatistics.groups.total.push(resource.id);
      }
      if (resource.itemType === "clone") {
        if (resource.member.itemType === "primitive") {
          newStatistics.plain.clone.push(resource.id);
          newStatistics.plain.total.push(resource.id);
        }
        if (resource.member.itemType === "group") {
          newStatistics.groups.clone.push(resource.id);
          newStatistics.groups.total.push(resource.id);
        }
      }
      return newStatistics;
    },
    {
      plain: {
        total: [] as string[],
        clone: [] as string[],
      },
      groups: {
        total: [] as string[],
        clone: [] as string[],
      },
    },
  );

  return (
    <>
      <div className="pf-u-my-sm">
        There {resourceTree.length === 1 ? "is" : "are"}
        <Badge isRead>{resourceTree.length}</Badge> {resourceTreeLink} in the
        cluster.
      </div>
      <ResourceCounts
        resourceIdLists={statistics.plain}
        description="standalone resources"
      />
      <ResourceCounts
        resourceIdLists={statistics.groups}
        description="groups"
      />
    </>
  );
};
