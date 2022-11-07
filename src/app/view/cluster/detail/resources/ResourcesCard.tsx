import {Badge} from "@patternfly/react-core";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";

import {Cluster} from "app/view/cluster/types";
import {
  EmptyStateNoItem,
  Link,
  location,
  useSelectedClusterName,
} from "app/view/share";
import {StatisticsIsueInfo} from "app/view/cluster/detail/StatisticsIsueInfo";

import {ResourceCounts} from "./ResourceCounts";
import {buildStatistics} from "./buildStatistics";

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

  const statistics = buildStatistics(resourceTree);

  return (
    <>
      <div className="pf-u-my-sm">
        There {resourceTree.length === 1 ? "is" : "are"}
        <Badge isRead>{resourceTree.length}</Badge> {resourceTreeLink} in the
        cluster.
      </div>
      <div className="pf-u-my-sm">
        <ResourceCounts
          resourceIdLists={statistics.plain}
          description="standalone resources"
        />
        <ResourceCounts
          resourceIdLists={statistics.groups}
          description="groups"
        />
      </div>
      {Object.entries(statistics.issues.errors).map(
        ([label, resourceIdList]) => (
          <StatisticsIsueInfo
            key={label}
            color="red"
            icon={<ExclamationCircleIcon />}
            issueName={label.toLowerCase()}
            itemList={resourceIdList}
            createLink={resourceId =>
              location.resource({clusterName, resourceId})
            }
          />
        ),
      )}
      {Object.entries(statistics.issues.errors).map(
        ([label, resourceIdList]) => (
          <StatisticsIsueInfo
            key={label}
            color="orange"
            icon={<ExclamationTriangleIcon />}
            issueName={label.toLowerCase()}
            itemList={resourceIdList}
            createLink={resourceId =>
              location.resource({clusterName, resourceId})
            }
          />
        ),
      )}
    </>
  );
};
