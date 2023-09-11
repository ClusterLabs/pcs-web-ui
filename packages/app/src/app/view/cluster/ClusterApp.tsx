import {testMarks} from "app/view/dataTest";
import {ClusterStatusLabel} from "app/view/share";
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
              <ClusterStatusLabel
                clusterName={clusterName}
                status={clusterInfo.clusterStatus.data?.status ?? "unknown"}
                when={clusterInfo.clusterStatus.load.when}
                isLoading={clusterInfo.clusterStatus.load.currently}
                {...clusterBreadcrumbs.clusterStatus.mark}
              />
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
                tasks: clusterInfo.tasks,
              }}
            >
              <ClusterPermissionsPage />
            </LoadedPermissionsProvider>
          );
        }

        if (clusterInfo.clusterStatus.isForbidden) {
          return <ClusterAppForbidden />;
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
              resourceAgentMap: clusterInfo.resourceAgentMap,
              fenceAgentList: clusterInfo.fenceAgentList,
              pcmkAgents: clusterInfo.pcmkAgents,
              tasks: clusterInfo.tasks,
              uiState: clusterInfo.uiState,
            }}
          >
            <TabComponent />
          </ClusterSourcesProvider>
        );
      }}
    </ClusterAppLayout>
  );
};
