import {useSelector} from "react-redux";
import {Icon, Spinner} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

import {selectors} from "app/store";

import {DashboardCluster} from "./DashboardCluster";
import {DashboardClusterLoading} from "./DashboardClusterLoading";
import {DashboardClusterListSorting} from "./DashboardClusterListSorting";

export const DashboardClusterList = ({
  importedClusterNameList,
}: {
  importedClusterNameList: string[];
}) => {
  const clusterInfoList = useSelector(
    selectors.getClusterStoreInfoList(importedClusterNameList),
  );
  return (
    <DashboardClusterListSorting clusterInfoList={clusterInfoList}>
      {sortedClusterInfoList =>
        sortedClusterInfoList.map(clusterInfo => {
          if (clusterInfo.isFetched) {
            return (
              <DashboardCluster
                key={clusterInfo.clusterName}
                cluster={clusterInfo.clusterStatus}
              />
            );
          }
          if (clusterInfo.isForbidden) {
            return (
              <DashboardClusterLoading
                key={clusterInfo.clusterName}
                clusterName={clusterInfo.clusterName}
              >
                <Icon isInline status="danger">
                  <ExclamationCircleIcon />
                </Icon>{" "}
                Forbidden
              </DashboardClusterLoading>
            );
          }
          return (
            <DashboardClusterLoading
              key={clusterInfo.clusterName}
              clusterName={clusterInfo.clusterName}
            >
              <Spinner size="md" />
            </DashboardClusterLoading>
          );
        })
      }
    </DashboardClusterListSorting>
  );
};
