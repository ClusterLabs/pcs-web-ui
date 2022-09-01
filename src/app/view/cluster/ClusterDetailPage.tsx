import { PageSection, Stack, StackItem } from "@patternfly/react-core";

import { Router } from "app/view/share";
import {
  EmptyStateSpinner,
  Page,
  SelectedClusterProvider,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";
import { useClusterState } from "app/view/share";

/* eslint-disable import/max-dependencies */
import { NodesPage } from "./nodes";
import { ResourcesPage } from "./resources";
import { FenceDevicePage } from "./fenceDevices";
import { SbdPage } from "./sbd";
import { ConstraintsPage } from "./constraints";
import { ClusterPropertiesPage } from "./properties";
import { AclPage } from "./acl";
import { ClusterDetail } from "./ClusterDetail";
import { ClusterDetailBreadcrumb } from "./ClusterDetailBreadcrumb";
import { ClusterPermissionsPage } from "./permissions";

export const clusterPageTabList = [
  "detail",
  "nodes",
  "resources",
  "fence-devices",
  "SBD",
  "constraints",
  "properties",
  "ACL",
  "permissions",
] as const;

export const ClusterDetailPage = ({ clusterName }: { clusterName: string }) => {
  const { dataLoaded } = useClusterState(clusterName);
  const { currentTab, matchedContext } = useUrlTabs(clusterPageTabList);

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <ClusterDetailBreadcrumb clusterName={clusterName} />
          </StackItem>
          <StackItem>
            <UrlTabs
              tabList={clusterPageTabList}
              currentTab={currentTab}
              data-test="cluster"
            />
          </StackItem>
        </Stack>
      </PageSection>
      {dataLoaded && (
        <SelectedClusterProvider value={clusterName}>
          <Router base={matchedContext}>
            {currentTab === "detail" && <ClusterDetail />}
            {currentTab === "nodes" && <NodesPage />}
            {currentTab === "resources" && <ResourcesPage />}
            {currentTab === "fence-devices" && <FenceDevicePage />}
            {currentTab === "SBD" && <SbdPage />}
            {currentTab === "constraints" && (
              <ConstraintsPage clusterName={clusterName} />
            )}
            {currentTab === "properties" && <ClusterPropertiesPage />}
            {currentTab === "ACL" && <AclPage />}
            {currentTab === "permissions" && <ClusterPermissionsPage />}
          </Router>
        </SelectedClusterProvider>
      )}
      {!dataLoaded && (
        <PageSection>
          <EmptyStateSpinner title="Loading cluster data" />
        </PageSection>
      )}
    </Page>
  );
};
