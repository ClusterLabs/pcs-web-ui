import type React from "react";
import {testMarks} from "app/view/dataTest";
import {ClusterStatusLabel, ClusterStatusLoadingLabel} from "app/view/share";
import {
  ClusterSourcesProvider,
  useClusterInfo,
  useClusterLoad,
} from "app/view/cluster/share";

import {ClusterPermissionsPage, LoadedPermissionsProvider} from "./permissions";
import {ClusterAppLayout} from "./ClusterAppLayout";
import {ClusterAppBreadcrumbs} from "./ClusterAppBreadcrumbs";
import {ClusterAppLoading} from "./ClusterAppLoading";
import {ClusterAppForbidden} from "./ClusterAppForbidden";
import {NodesPage} from "./nodes";
import {ResourcesPage} from "./resources";
import {FenceDevicePage} from "./fenceDevices";
import {SbdPage} from "./sbd";
import {ConstraintsPage} from "./constraints";
import {ClusterPropertiesPage} from "./properties";
import {AclPage} from "./acl";
import {ClusterOverviewPage} from "./overview";
import {ClusterAppBackendNotFound} from "./ClusterAppBackendNotFound";

const {clusterBreadcrumbs} = testMarks;

export const ClusterApp = ({clusterName}: {clusterName: string}) => {
  useClusterLoad(clusterName);
  const clusterInfo = useClusterInfo(clusterName);

  return (
    <ClusterAppLayout
      breadcrumbs={
        <ClusterAppBreadcrumbs
          clusterName={clusterName}
          status={
            clusterInfo.isRegistered ? (
              <>
                <ClusterStatusLabel
                  status={clusterInfo.clusterStatus.data?.status ?? "unknown"}
                  {...clusterBreadcrumbs.clusterStatus.mark}
                />
                <ClusterStatusLoadingLabel
                  clusterName={clusterName}
                  when={clusterInfo.clusterStatus.load.when}
                  isLoading={clusterInfo.clusterStatus.load.currently}
                />
              </>
            ) : null
          }
        />
      }
    >
      {currentTab => {
        if (!clusterInfo.isRegistered) {
          return <ClusterAppLoading title="Preparing cluster storage" />;
        }

        if (currentTab === "permissions") {
          if (!clusterInfo.permissions) {
            return (
              <ClusterAppLoading title="Loading cluster permission data" />
            );
          }
          return (
            <LoadedPermissionsProvider
              value={{
                clusterName,
                permissions: clusterInfo.permissions,
              }}
            >
              <ClusterPermissionsPage />
            </LoadedPermissionsProvider>
          );
        }

        if (clusterInfo.clusterStatus.isForbidden) {
          return <ClusterAppForbidden />;
        }

        if (clusterInfo.clusterStatus.isBackendNotFoundCase) {
          return <ClusterAppBackendNotFound />;
        }

        if (!clusterInfo.clusterStatus.data) {
          return <ClusterAppLoading title="Loading cluster data" />;
        }

        const tabComponentMap: Record<
          Exclude<typeof currentTab, "permissions">,
          React.FC
        > = {
          overview: ClusterOverviewPage,
          nodes: NodesPage,
          resources: ResourcesPage,
          "fence-devices": FenceDevicePage,
          sbd: SbdPage,
          constraints: ConstraintsPage,
          properties: ClusterPropertiesPage,
          acl: AclPage,
        };

        const TabComponent = tabComponentMap[currentTab];

        return (
          <ClusterSourcesProvider
            value={{
              loadedCluster: clusterInfo.clusterStatus.data,
              pcmkAgents: clusterInfo.pcmkAgents,
            }}
          >
            <TabComponent />
          </ClusterSourcesProvider>
        );
      }}
    </ClusterAppLayout>
  );
};
