import React from "react";
import {PageSection, Stack, StackItem, Tab, Tabs} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Router} from "app/view/share";
import {Page, PageToolbar, useUrlTabs} from "app/view/share";

const {tabs} = testMarks.cluster;

const tabMap = {
  overview: (
    <Tab
      eventKey="overview"
      key="overview"
      title={"Overview"}
      {...tabs.overview.mark}
    />
  ),
  nodes: (
    <Tab eventKey="nodes" key="nodes" title="Nodes" {...tabs.nodes.mark} />
  ),
  resources: (
    <Tab
      eventKey="resources"
      key="resources"
      title="Resources"
      {...tabs.resources.mark}
    />
  ),
  "fence-devices": (
    <Tab
      eventKey="fence-devices"
      key="fence-devices"
      title="Fence devices"
      {...tabs.fenceDevices.mark}
    />
  ),
  sbd: <Tab eventKey="sbd" key="sbd" title="SBD" {...tabs.sbd.mark} />,
  constraints: (
    <Tab
      eventKey="constraints"
      key="constraints"
      title="Constraints"
      {...tabs.constraints.mark}
    />
  ),
  properties: (
    <Tab
      eventKey="properties"
      key="properties"
      title="Properties"
      {...tabs.properties.mark}
    />
  ),
  acl: <Tab eventKey="acl" key="acl" title="ACL" {...tabs.acl.mark} />,
  permissions: (
    <Tab
      eventKey="permissions"
      key="permissions"
      title="Permissions"
      {...tabs.permissions.mark}
    />
  ),
};

type TabName = keyof typeof tabMap;

export const ClusterAppLayout = ({
  breadcrumbs,
  children,
}: {
  breadcrumbs: React.ReactNode;
  children: (currentTab: TabName) => React.ReactNode;
}) => {
  const {currentTab, matchedContext, onSelect} = useUrlTabs(
    Object.keys(tabMap) as TabName[],
  );

  return (
    <Page>
      {notifications => (
        <span {...testMarks.cluster.mark}>
          <PageSection variant="light">
            <Stack hasGutter>
              <PageToolbar
                breadcrumbs={breadcrumbs}
                notifications={notifications}
              />
              <StackItem>
                <Tabs activeKey={currentTab} onSelect={onSelect} {...tabs.mark}>
                  {Object.values(tabMap)}
                </Tabs>
              </StackItem>
            </Stack>
          </PageSection>

          <Router base={matchedContext}>{children(currentTab)}</Router>
        </span>
      )}
    </Page>
  );
};
