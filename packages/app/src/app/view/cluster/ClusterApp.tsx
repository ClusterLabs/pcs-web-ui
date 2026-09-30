import type React from "react";
import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {CLUSTER_KEY} from "app/store";
import {testMarks} from "app/view/dataTest";
import {ClusterStatusLabel, ClusterStatusLoadingLabel} from "app/view/share";
import {ClusterSourcesProvider, useClusterLoad} from "app/view/cluster/share";

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

export const ClusterApp = () => {
  useClusterLoad();
  const clusterInfo = useSelector(selectors.getClusterStoreInfo);
  // The displayed cluster name comes from the loaded data (briefly empty during
  // the first load). The storage key itself is the constant CLUSTER_KEY.
  const clusterName = clusterInfo.clusterStatus.data?.clusterName ?? "";

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
                  clusterName={CLUSTER_KEY}
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
                clusterName: CLUSTER_KEY,
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
