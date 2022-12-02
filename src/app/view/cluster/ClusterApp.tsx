import {PageSection} from "@patternfly/react-core";

import {
  ClusterSourcesProvider,
  EmptyStateError,
  PageSectionSpinner,
} from "app/view/share";
import {useClusterInfo, useClusterLoad} from "app/view/cluster/share";

import {ClusterPermissionsPage, LoadedPermissionsProvider} from "./permissions";
import {ClusterAppLayout} from "./ClusterAppLayout";
import {NodesPage} from "./nodes";
import {ResourcesPage} from "./resources";
import {FenceDevicePage} from "./fenceDevices";
import {SbdPage} from "./sbd";
import {ConstraintsPage} from "./constraints";
import {ClusterPropertiesPage} from "./properties";
import {AclPage} from "./acl";
import {ClusterOverviewPage} from "./overview";

export const clusterAppTabList = [
  "overview",
  "nodes",
  "resources",
  "fence-devices",
  "sbd",
  "constraints",
  "properties",
  "acl",
  "permissions",
] as const;

export const ClusterApp = ({clusterName}: {clusterName: string}) => {
  useClusterLoad(clusterName);
  const clusterInfo = useClusterInfo(clusterName);

  return (
    <ClusterAppLayout
      clusterName={clusterName}
      tabList={clusterAppTabList}
      tabNameMap={{sbd: "SBD", acl: "ACL"}}
      statusLabel={clusterInfo.clusterStatus.data?.status ?? "unknown"}
    >
      {currentTab => {
        if (!clusterInfo.isRegistered) {
          return <PageSectionSpinner title="Preparing cluster storage" />;
        }

        if (currentTab === "permissions") {
          if (!clusterInfo.permissions) {
            return (
              <PageSectionSpinner title="Loading cluster permission data" />
            );
          }
          return (
            <LoadedPermissionsProvider value={clusterInfo.permissions}>
              <ClusterPermissionsPage />
            </LoadedPermissionsProvider>
          );
        }

        if (clusterInfo.clusterStatus.isForbidden) {
          return (
            <PageSection>
              <EmptyStateError
                title="Forbidden"
                message="You don't have a read permission for this cluster."
              />
            </PageSection>
          );
        }

        if (!clusterInfo.clusterStatus.data) {
          return <PageSectionSpinner title="Loading cluster data" />;
        }

        const tabComponentMap: Record<
          Exclude<typeof clusterAppTabList[number], "permissions">,
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
