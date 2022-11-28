import {PageSection, Stack, StackItem} from "@patternfly/react-core";
import {useSelector} from "react-redux";

import {selectors, tools} from "app/store";
import {EmptyStateSpinner, Router} from "app/view/share";
import {
  Page,
  UrlTabs,
  useSelectedClusterName,
  useUrlTabs,
} from "app/view/share";
import {
  ClusterStorageItemProvider,
  useClusterLoad,
} from "app/view/cluster/share";

import {ClusterAppBreadcrumb} from "./ClusterAppBreadcrumb";
import {ClusterStatusDetail} from "./ClusterStatusDetail";
import {ClusterPermissionsPage} from "./permissions";
import {clusterAppTabList} from "./clusterAppTabList";

const tabNameMap: Partial<Record<typeof clusterAppTabList[number], string>> = {
  sbd: "SBD",
  acl: "ACL",
};

export const ClusterApp = () => {
  const clusterName = useSelectedClusterName();

  useClusterLoad(clusterName);
  const clusterInfo = useSelector(selectors.getClusterStoreInfo(clusterName));

  const {currentTab, matchedContext} = useUrlTabs(clusterAppTabList);

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <ClusterAppBreadcrumb
              clusterName={clusterName}
              statusLabel={
                clusterInfo.isClusterStatusFetched
                  ? clusterInfo.clusterStatusLabel
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

      {clusterInfo.clusterStoreItem === undefined && (
        <PageSection>
          <EmptyStateSpinner title="Preparing cluster storage" />
        </PageSection>
      )}

      {clusterInfo.clusterStoreItem !== undefined && (
        <Router base={matchedContext}>
          <ClusterStorageItemProvider
            value={{
              clusterName,
              clusterStoreItem: clusterInfo.clusterStoreItem,
            }}
          >
            {currentTab === "permissions" && <ClusterPermissionsPage />}
            {currentTab !== "permissions" && (
              <ClusterStatusDetail currentTab={currentTab} />
            )}
          </ClusterStorageItemProvider>
        </Router>
      )}
    </Page>
  );
};
