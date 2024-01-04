import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";

import {Cluster} from "app/view/cluster/types";
import {EmptyStateNoItem, Link, location} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {StatisticsIssueInfo} from "app/view/cluster/overview/StatisticsIssueInfo";

import {ResourceCounts} from "./ResourceCounts";
import {buildStatistics} from "./buildStatistics";
import {ResourceLink} from "./ResourceLink";

export const ResourcesCard = ({
  resourceTree,
}: {
  resourceTree: Cluster["resourceTree"];
}) => {
  const {clusterName} = useLoadedCluster();
  if (resourceTree.length === 0) {
    return (
      <EmptyStateNoItem
        title="No resource is configured."
        message="You don't have any configured resources here."
      />
    );
  }

  const statistics = buildStatistics(resourceTree);

  const createResourceLink = (resourceId: string | string[]) => (
    <ResourceLink resourceIdMixed={resourceId} />
  );

  return (
    <>
      <div className="pf-v5-u-my-sm">
        There {statistics.totalCount > 1 ? "are" : "is"}{" "}
        <strong>{statistics.totalCount}</strong>{" "}
        <Link isInline to={location.resourceList({clusterName})}>
          {statistics.totalCount > 1 ? "resources" : "resource"}
        </Link>{" "}
        in the cluster.
      </div>
      <div className="pf-v5-u-my-sm">
        <ResourceCounts
          resourceIdLists={statistics.plain}
          description={`standalone resource${
            statistics.plain.total.length > 1 ? "s" : ""
          }`}
        />
        <ResourceCounts
          resourceIdLists={statistics.groups}
          description={`group${statistics.groups.total.length > 1 ? "s" : ""}`}
        />
      </div>
      {Object.entries(statistics.issues.errors).map(
        ([label, resourceIdList]) => (
          <StatisticsIssueInfo
            key={label}
            color="red"
            icon={<ExclamationCircleIcon />}
            issueName={label.toLowerCase()}
            itemList={resourceIdList}
            createItemLabel={createResourceLink}
          />
        ),
      )}
      {Object.entries(statistics.issues.warnings).map(
        ([label, resourceIdList]) => (
          <StatisticsIssueInfo
            key={label}
            color="orange"
            icon={<ExclamationTriangleIcon />}
            issueName={label.toLowerCase()}
            itemList={resourceIdList}
            createItemLabel={createResourceLink}
          />
        ),
      )}
    </>
  );
};
