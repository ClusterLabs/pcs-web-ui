import {PageSection, Stack, StackItem} from "@patternfly/react-core";

import {tools} from "app/store";
import {EmptyStateSpinner, Router} from "app/view/share";
import {
  Page,
  UrlTabs,
  useSelectedClusterName,
  useUrlTabs,
} from "app/view/share";
import {
  RegisteredClusterInfoProvider,
  useClusterInfo,
  useClusterLoad,
} from "app/view/cluster/share";

import {ClusterAppBreadcrumb} from "./ClusterAppBreadcrumb";
import {ClusterStatusDetail} from "./ClusterStatusDetail";
import {ClusterPermissionsDetail} from "./permissions";
import {clusterAppTabList} from "./clusterAppTabList";

const tabNameMap: Partial<Record<typeof clusterAppTabList[number], string>> = {
  sbd: "SBD",
  acl: "ACL",
};

export const ClusterApp = () => {
  const clusterName = useSelectedClusterName();

  useClusterLoad(clusterName);
  const clusterInfo = useClusterInfo(clusterName);

  const {currentTab, matchedContext} = useUrlTabs(clusterAppTabList);

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <ClusterAppBreadcrumb
              clusterName={clusterName}
              statusLabel={
                clusterInfo.isRegistered && clusterInfo.clusterStatus.isLoaded
                  ? clusterInfo.clusterStatus.data.status
                  : "unknown"
              }
            />
          </StackItem>
          <StackItem>
            <UrlTabs
              tabList={clusterAppTabList}
              currentTab={currentTab}
              data-test="cluster"
              toLabel={name => tabNameMap[name] ?? tools.labelize(name)}
            />
          </StackItem>
        </Stack>
      </PageSection>

      {!clusterInfo.isRegistered && (
        <PageSection>
          <EmptyStateSpinner title="Preparing cluster storage" />
        </PageSection>
      )}

      {clusterInfo.isRegistered && (
        <Router base={matchedContext}>
          <RegisteredClusterInfoProvider value={clusterInfo}>
            {currentTab === "permissions" && <ClusterPermissionsDetail />}
            {currentTab !== "permissions" && (
              <ClusterStatusDetail currentTab={currentTab} />
            )}
          </RegisteredClusterInfoProvider>
        </Router>
      )}
    </Page>
  );
};
