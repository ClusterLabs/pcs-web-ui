import {PageSection, Stack, StackItem} from "@patternfly/react-core";

import {tools} from "app/store";
import {Router} from "app/view/share";
import {
  Page,
  UrlTabs,
  useSelectedClusterName,
  useUrlTabs,
} from "app/view/share";

import {ClusterAppBreadcrumb} from "./ClusterAppBreadcrumb";
import {ClusterAppTabDetail} from "./ClusterAppTabDetail";
import {clusterAppTabList} from "./clusterAppTabList";

const tabNameMap: Partial<Record<typeof clusterAppTabList[number], string>> = {
  sbd: "SBD",
  acl: "ACL",
};

export const ClusterApp = () => {
  const {currentTab, matchedContext} = useUrlTabs(clusterAppTabList);
  const clusterName = useSelectedClusterName();

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <ClusterAppBreadcrumb clusterName={clusterName} />
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
      <Router base={matchedContext}>
        <ClusterAppTabDetail currentTab={currentTab} />
      </Router>
    </Page>
  );
};
