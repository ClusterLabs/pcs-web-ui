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
import {useClusterStore} from "app/view/cluster/share";

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
  const {clusterInfo} = useClusterStore(clusterName);
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
      <SelectedClusterProvider value={clusterName}>
        <Router base={matchedContext}>
          {clusterInfo.state === "cluster-data-successfully-fetched"
            && currentTab !== "permissions" && (
              <>
                {currentTab === "overview" && <ClusterOverviewPage />}
                {currentTab === "nodes" && <NodesPage />}
                {currentTab === "resources" && <ResourcesPage />}
                {currentTab === "fence-devices" && <FenceDevicePage />}
                {currentTab === "sbd" && <SbdPage />}
                {currentTab === "constraints" && <ConstraintsPage />}
                {currentTab === "properties" && <ClusterPropertiesPage />}
                {currentTab === "acl" && <AclPage />}
              </>
            )}

          {(clusterInfo.state === "cluster-data-not-fetched"
            || clusterInfo.state === "cluster-data-forbidden"
            || clusterInfo.state === "cluster-data-successfully-fetched")
            && currentTab === "permissions" && <ClusterPermissionsPage />}

          {(clusterInfo.state === "cluster-not-in-storage"
            || (clusterInfo.state === "cluster-data-not-fetched"
              && currentTab !== "permissions")) && (
            <PageSection>
              <EmptyStateSpinner title="Loading cluster data" />
            </PageSection>
          )}

          {clusterInfo.state === "cluster-data-forbidden"
            && currentTab !== "permissions" && (
              <PageSection>
                <EmptyStateError
                  title="Forbidden"
                  message="You don't have a read permission for this cluster."
                />
              </PageSection>
            )}
        </Router>
      </SelectedClusterProvider>
    </Page>
  );
};
