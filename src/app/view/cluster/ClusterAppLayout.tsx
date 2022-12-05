import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import {ClusterStatusLabel, Link, Router, location} from "app/view/share";
import {tools} from "app/store";
import {Page, UrlTabs, useDispatch, useUrlTabs} from "app/view/share";

export const ClusterAppLayout = <TAB_NAME extends string>({
  clusterName,
  statusLabel,
  tabList,
  tabNameMap,
  children,
}: {
  clusterName: string;
  statusLabel: React.ComponentProps<typeof ClusterStatusLabel>["status"];
  tabList: readonly TAB_NAME[];
  tabNameMap: Partial<Record<TAB_NAME, string>>;
  children: (_currentTab: TAB_NAME) => React.ReactNode;
}) => {
  const {currentTab, matchedContext} = useUrlTabs(tabList);
  const dispatch = useDispatch();

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <Breadcrumb data-test="breadcrumb">
              <BreadcrumbItem component="span" data-test="dashboard">
                <Link to={location.dashboard}>Clusters</Link>
              </BreadcrumbItem>
              <BreadcrumbItem
                isActive
                onClick={() =>
                  dispatch({
                    type: "CLUSTER.STATUS.REFRESH",
                    key: {clusterName},
                  })
                }
              >
                <span className="pf-u-mr-sm">
                  <strong>{clusterName}</strong>
                </span>
                <ClusterStatusLabel status={statusLabel} />
              </BreadcrumbItem>
            </Breadcrumb>
          </StackItem>
          <StackItem>
            <UrlTabs
              tabList={tabList}
              currentTab={currentTab}
              data-test="cluster"
              toLabel={name => tabNameMap[name] ?? tools.labelize(name)}
            />
          </StackItem>
        </Stack>
      </PageSection>

      <Router base={matchedContext}>{children(currentTab)}</Router>
    </Page>
  );
};
