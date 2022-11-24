import React from "react";
import {PageSection} from "@patternfly/react-core";

import {
  EmptyStateError,
  EmptyStateSpinner,
  useSelectedClusterName,
} from "app/view/share";
import {LoadedClusterProvider, useClusterStore} from "app/view/cluster/share";

import {NodesPage} from "./nodes";
import {ResourcesPage} from "./resources";
import {FenceDevicePage} from "./fenceDevices";
import {SbdPage} from "./sbd";
import {ConstraintsPage} from "./constraints";
import {ClusterPropertiesPage} from "./properties";
import {AclPage} from "./acl";
import {ClusterPermissionsPage} from "./permissions";
import {ClusterOverviewPage} from "./overview";
import {clusterAppTabList} from "./clusterAppTabList";

type TabName = typeof clusterAppTabList[number];

export const ClusterAppTabDetail = ({currentTab}: {currentTab: TabName}) => {
  const clusterName = useSelectedClusterName();
  const {clusterInfo} = useClusterStore(clusterName);

  if (currentTab === "permissions") {
    return <ClusterPermissionsPage />;
  }

  if (clusterInfo.state === "cluster-data-forbidden") {
    return (
      <PageSection>
        <EmptyStateError
          title="Forbidden"
          message="You don't have a read permission for this cluster."
        />
      </PageSection>
    );
  }

  if (clusterInfo.state !== "cluster-data-successfully-fetched") {
    return (
      <PageSection>
        <EmptyStateSpinner title="Loading cluster data" />
      </PageSection>
    );
  }

  const tabComponentMap: Record<Exclude<TabName, "permissions">, React.FC> = {
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
    <LoadedClusterProvider value={clusterInfo.cluster}>
      <TabComponent />
    </LoadedClusterProvider>
  );
};
