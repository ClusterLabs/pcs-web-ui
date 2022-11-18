import {PageSection, Stack, StackItem} from "@patternfly/react-core";

import {tools} from "app/store";
import {Router} from "app/view/share";
import {
  EmptyStateError,
  EmptyStateSpinner,
  Page,
  SelectedClusterProvider,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";
import {useClusterState} from "app/view/share";

/* eslint-disable import/max-dependencies */
import {NodesPage} from "./nodes";
import {ResourcesPage} from "./resources";
import {FenceDevicePage} from "./fenceDevices";
import {SbdPage} from "./sbd";
import {ConstraintsPage} from "./constraints";
import {ClusterPropertiesPage} from "./properties";
import {AclPage} from "./acl";
import {ClusterOverviewPage} from "./overview";
import {ClusterAppBreadcrumb} from "./ClusterAppBreadcrumb";
import {ClusterPermissionsPage} from "./permissions";

export const clusterPageTabList = [
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

const tabNameMap: Record<string, string> = {
  sbd: "SBD",
  acl: "ACL",
};

export const ClusterApp = ({clusterName}: {clusterName: string}) => {
  const {dataLoadState} = useClusterState(clusterName);
  const {currentTab, matchedContext} = useUrlTabs(clusterPageTabList);

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <ClusterAppBreadcrumb clusterName={clusterName} />
          </StackItem>
          <StackItem>
            <UrlTabs
              tabList={clusterPageTabList}
              currentTab={currentTab}
              data-test="cluster"
              toLabel={(tabName: string) =>
                tabNameMap[tabName] ?? tools.labelize(tabName)
              }
            />
          </StackItem>
        </Stack>
      </PageSection>
      {dataLoadState === "cluster-data-successfully-fetched" && (
        <SelectedClusterProvider value={clusterName}>
          <Router base={matchedContext}>
            {currentTab === "overview" && <ClusterOverviewPage />}
            {currentTab === "nodes" && <NodesPage />}
            {currentTab === "resources" && <ResourcesPage />}
            {currentTab === "fence-devices" && <FenceDevicePage />}
            {currentTab === "sbd" && <SbdPage />}
            {currentTab === "constraints" && <ConstraintsPage />}
            {currentTab === "properties" && <ClusterPropertiesPage />}
            {currentTab === "acl" && <AclPage />}
            {currentTab === "permissions" && <ClusterPermissionsPage />}
          </Router>
        </SelectedClusterProvider>
      )}

      {(dataLoadState === "cluster-data-not-fetched"
        || dataLoadState === "cluster-data-forbidden")
        && currentTab === "permissions" && (
          <SelectedClusterProvider value={clusterName}>
            <Router base={matchedContext}>
              <ClusterPermissionsPage />
            </Router>
          </SelectedClusterProvider>
        )}

      {(dataLoadState === "cluster-not-in-storage"
        || (dataLoadState === "cluster-data-not-fetched"
          && currentTab !== "permissions")) && (
        <PageSection>
          <EmptyStateSpinner title="Loading cluster data" />
        </PageSection>
      )}

      {dataLoadState === "cluster-data-forbidden"
        && currentTab !== "permissions" && (
          <PageSection>
            <EmptyStateError
              title="Forbidden"
              message="You don't have a read permission for this cluster."
            />
          </PageSection>
        )}
    </Page>
  );
};
