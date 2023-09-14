import {useSelector} from "react-redux";
import {Icon, Spinner} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

import {testMarks} from "app/view/dataTest";
import {selectors} from "app/store";
import {ClusterStatusLabel, ClusterStatusLoadingLabel} from "app/view/share";

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
                  <>
                    <ClusterStatusLabel
                      status={clusterStatus.data.status}
                      {...status.mark}
                    />
                    <ClusterStatusLoadingLabel
                      clusterName={clusterInfo.clusterName}
                      when={clusterStatus.load.when}
                      isLoading={clusterStatus.load.currently}
                    />
                  </>
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
                  <>
                    <ClusterStatusLabel status="unknown" {...status.mark} />
                    <ClusterStatusLoadingLabel
                      clusterName={clusterInfo.clusterName}
                      when={clusterInfo.clusterStatus.load.when}
                      isLoading={clusterInfo.clusterStatus.load.currently}
                    />
                  </>
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
