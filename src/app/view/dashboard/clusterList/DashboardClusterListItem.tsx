import {Icon, Spinner} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

import {selectors} from "app/store";

import {DashboardCluster} from "./DashboardCluster";
import {DashboardClusterLoading} from "./DashboardClusterLoading";

type ClusterInfo = ReturnType<
  ReturnType<typeof selectors.getClusterInfoList>
>[number];

export const DashboardClusterListItem = ({
  clusterInfo,
}: {
  clusterInfo: ClusterInfo;
}) => {
  if (clusterInfo.state === "cluster-data-successfully-fetched") {
    return <DashboardCluster cluster={clusterInfo.cluster} />;
  }
  if (clusterInfo.state === "cluster-data-forbidden") {
    return (
      <DashboardClusterLoading clusterName={clusterInfo.clusterName}>
        <Icon isInline status="danger">
          <ExclamationCircleIcon />
        </Icon>{" "}
        Forbidden
      </DashboardClusterLoading>
    );
  }
  return (
    <DashboardClusterLoading clusterName={clusterInfo.clusterName}>
      <Spinner size="md" />
    </DashboardClusterLoading>
  );
};
