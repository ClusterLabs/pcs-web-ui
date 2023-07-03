import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  Stack,
  StackItem,
  Tab,
  Tabs,
} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  ClusterStatusLabel,
  Router,
  location,
  useLocation,
} from "app/view/share";
import {Page, PageToolbar, useDispatch, useUrlTabs} from "app/view/share";

const {clusterDetail} = testMarks;
const {tabs} = clusterDetail;

const tabMap = {
  overview: (
    <Tab eventKey="overview" title={"Overview"} {...tabs.overview.mark} />
  ),
  nodes: <Tab eventKey="nodes" title="Nodes" {...tabs.nodes.mark} />,
  resources: (
    <Tab eventKey="resources" title="Resources" {...tabs.resources.mark} />
  ),
  "fence-devices": (
    <Tab
      eventKey="fence-devices"
      title="Fence devices"
      {...tabs.fenceDevices.mark}
    />
  ),
  sbd: <Tab eventKey="sbd" title="SBD" {...tabs.sbd.mark} />,
  constraints: (
    <Tab
      eventKey="constraints"
      title="Constraints"
      {...tabs.constraints.mark}
    />
  ),
  properties: (
    <Tab eventKey="properties" title="Properties" {...tabs.properties.mark} />
  ),
  acl: <Tab eventKey="acl" title="ACL" {...tabs.acl.mark} />,
  permissions: (
    <Tab
      eventKey="permissions"
      title="Permissions"
      {...tabs.permissions.mark}
    />
  ),
};

type TabName = keyof typeof tabMap;

export const ClusterAppLayout = ({
  clusterName,
  statusLabel,
  children,
}: {
  clusterName: string;
  statusLabel: React.ComponentProps<typeof ClusterStatusLabel>["status"];
  children: (currentTab: TabName) => React.ReactNode;
}) => {
  const {currentTab, matchedContext, onSelect} = useUrlTabs(
    Object.keys(tabMap) as TabName[],
  );
  const dispatch = useDispatch();
  const {navigate} = useLocation();

  return (
    <Page {...clusterDetail.mark}>
      {notifications => (
        <>
          <PageSection variant="light">
            <Stack hasGutter>
              <PageToolbar
                breadcrumbs={
                  <Breadcrumb {...clusterDetail.breadcrumbs.mark}>
                    <BreadcrumbItem
                      to={location.dashboard}
                      component="a"
                      onClick={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        navigate(location.dashboard);
                      }}
                      {...clusterDetail.breadcrumbs.dashboard.mark}
                    >
                      Clusters
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
                        <strong {...clusterDetail.breadcrumbs.clusterName.mark}>
                          {clusterName}
                        </strong>
                      </span>
                      <ClusterStatusLabel status={statusLabel} />
                    </BreadcrumbItem>
                  </Breadcrumb>
                }
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
        </>
      )}
    </Page>
  );
};
