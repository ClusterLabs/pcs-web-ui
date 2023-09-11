import {useSelector} from "react-redux";
import {Icon, Spinner} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

import {testMarks} from "app/view/dataTest";
import {selectors} from "app/store";
import {ClusterStatusLabel} from "app/view/share";

import {DashboardClusterLoaded} from "./DashboardClusterLoaded";
import {DashboardCluster} from "./DashboardCluster";
import {DashboardClusterListSorting} from "./DashboardClusterListSorting";

const {status} = testMarks.dashboard.clusterList.cluster;

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
          if (clusterInfo.isRegistered && clusterInfo.isFetched) {
            const {clusterStatus} = clusterInfo;
            return (
              <DashboardClusterLoaded
                key={clusterInfo.clusterName}
                cluster={clusterStatus.data}
                status={
                  <ClusterStatusLabel
                    clusterName={clusterInfo.clusterName}
                    status={clusterStatus.data.status}
                    when={clusterStatus.load.when}
                    isLoading={clusterStatus.load.currently}
                    {...status.mark}
                  />
                }
              />
            );
          }
          if (clusterInfo.isRegistered) {
            return (
              <DashboardCluster
                key={clusterInfo.clusterName}
                clusterName={clusterInfo.clusterName}
                status={
                  <ClusterStatusLabel
                    clusterName={clusterInfo.clusterName}
                    status="unknown"
                    when={clusterInfo.clusterStatus.load.when}
                    isLoading={clusterInfo.clusterStatus.load.currently}
                    {...status.mark}
                  />
                }
                isLoading
                columns={
                  <td colSpan={4}>
                    {!clusterInfo.isForbidden && <Spinner size="md" />}
                    {clusterInfo.isForbidden && (
                      <>
                        <Icon isInline status="danger">
                          <ExclamationCircleIcon />
                        </Icon>{" "}
                        Forbidden
                      </>
                    )}
                  </td>
                }
              />
            );
          }
          return (
            <DashboardCluster
              key={clusterInfo.clusterName}
              clusterName={clusterInfo.clusterName}
              isLoading
              columns={
                <td colSpan={4}>
                  <Spinner size="md" />
                </td>
              }
            />
          );
        })
      }
    </DashboardClusterListSorting>
  );
};
