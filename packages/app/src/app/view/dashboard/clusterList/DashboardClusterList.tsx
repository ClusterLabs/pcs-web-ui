import {useSelector} from "react-redux";
import {Icon, Spinner} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

import {selectors} from "app/store";

import {DashboardClusterLoaded} from "./DashboardClusterLoaded";
import {DashboardCluster} from "./DashboardCluster";
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
              <DashboardClusterLoaded
                key={clusterInfo.clusterName}
                cluster={clusterInfo.clusterStatus}
              />
            );
          }
          return (
            <DashboardCluster
              key={clusterInfo.clusterName}
              clusterName={clusterInfo.clusterName}
              status="unknown"
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
        })
      }
    </DashboardClusterListSorting>
  );
};
