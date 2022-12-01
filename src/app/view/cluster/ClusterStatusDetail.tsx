import React from "react";
import {PageSection} from "@patternfly/react-core";

import {EmptyStateError, EmptyStateSpinner} from "app/view/share";
import {
  LoadedClusterProvider,
  useRegisteredClusterInfo,
} from "app/view/cluster/share";

import {NodesPage} from "./nodes";
import {ResourcesPage} from "./resources";
import {FenceDevicePage} from "./fenceDevices";
import {SbdPage} from "./sbd";
import {ConstraintsPage} from "./constraints";
import {ClusterPropertiesPage} from "./properties";
import {AclPage} from "./acl";
import {ClusterOverviewPage} from "./overview";
import {clusterAppTabList} from "./clusterAppTabList";

type TabName = Exclude<typeof clusterAppTabList[number], "permissions">;

export const ClusterStatusDetail = ({currentTab}: {currentTab: TabName}) => {
  const {clusterStatus} = useRegisteredClusterInfo();

  if (clusterStatus.isForbidden) {
    return (
      <PageSection>
        <EmptyStateError
          title="Forbidden"
          message="You don't have a read permission for this cluster."
        />
      </PageSection>
    );
  }

  if (!clusterStatus.isLoaded) {
    return (
      <PageSection>
        <EmptyStateSpinner title="Loading cluster data" />
      </PageSection>
    );
  }

  const tabComponentMap: Record<TabName, React.FC> = {
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
    <LoadedClusterProvider value={clusterStatus.data}>
      <TabComponent />
    </LoadedClusterProvider>
  );
};
