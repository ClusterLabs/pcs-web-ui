import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import {
  ClusterStatusLabel,
  Router,
  location,
  useLocation,
} from "app/view/share";
import {tools} from "app/store";
import {
  Page,
  PageToolbar,
  UrlTabs,
  useDispatch,
  useUrlTabs,
} from "app/view/share";


export const clusterAppTabList = [
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
const tabNameMap: Partial<Record<(typeof clusterAppTabList)[number], string>> =
  {
    sbd: "SBD",
    acl: "ACL",
  };

export const ClusterAppLayout = ({
  clusterName,
  statusLabel,
  children,
  "data-test": dataTest,
}: {
  clusterName: string;
  statusLabel: React.ComponentProps<typeof ClusterStatusLabel>["status"];
  "data-test"?: string;
  children: (currentTab: (typeof clusterAppTabList)[number]) => React.ReactNode;
}) => {
  const {currentTab, matchedContext} = useUrlTabs(clusterAppTabList);
  const dispatch = useDispatch();
  const {navigate} = useLocation();

  return (
    <Page data-test={dataTest}>
      {notifications => (
        <>
          <PageSection variant="light">
            <Stack hasGutter>
              <PageToolbar
                breadcrumbs={
                  <Breadcrumb data-test="breadcrumb">
                    <BreadcrumbItem
                      to={location.dashboard}
                      component="a"
                      data-test="dashboard"
                      onClick={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        navigate(location.dashboard);
                      }}
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
                        <strong>{clusterName}</strong>
                      </span>
                      <ClusterStatusLabel status={statusLabel} />
                    </BreadcrumbItem>
                  </Breadcrumb>
                }
                notifications={notifications}
              />
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

          <Router base={matchedContext}>{children(currentTab)}</Router>
        </>
      )}
    </Page>
  );
};
