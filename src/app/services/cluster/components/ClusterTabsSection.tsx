import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { PageSection, Tab, Tabs } from "@patternfly/react-core";

type ClusterSection = "overview"|"nodes"|"resources"|"fenceDevices";

interface TabSetting {
  url: string,
  label: string,
}

type TABS = "overview"|"nodes"|"resources"|"fenceDevices";

const createTabUrlMap = (
  clusterUrlName: string,
) => (): Record<TABS, TabSetting> => ({
  overview: {
    url: `/cluster/${clusterUrlName}`,
    label: "Overview",
  },
  nodes: {
    url: `/cluster/${clusterUrlName}/nodes`,
    label: "Nodes",
  },
  resources: {
    url: `/cluster/${clusterUrlName}/resources`,
    label: "Resources",
  },
  fenceDevices: {
    url: `/cluster/${clusterUrlName}/fence-devices`,
    label: "Fence Devices",
  },
});

const ClusterTabsSection = (
  { clusterUrlName, currentTab, children }: React.PropsWithChildren<{
    clusterUrlName: string,
    currentTab: TABS,
  }>,
) => {
  const dispatch = useDispatch();
  const tabSettingsMap = React.useMemo(
    createTabUrlMap(clusterUrlName),
    [clusterUrlName],
  );

  return (
    <PageSection variant="light">
      <Tabs
        activeKey={currentTab}
        onSelect={(e, tabIndex) => {
          const selectedTab = tabIndex as TABS;
          if (tabIndex !== currentTab) {
            dispatch(push(tabSettingsMap[selectedTab].url));
          }
        }}
      >
        {Object.keys(tabSettingsMap).map((key) => {
          const tab = key as TABS;
          if (key === currentTab) {
            return (
              <Tab key={key} eventKey={key} title={tabSettingsMap[tab].label}>
                {children}
              </Tab>
            );
          }
          return (
            <Tab key={key} eventKey={key} title={tabSettingsMap[tab].label} />
          );
        })}
      </Tabs>
    </PageSection>
  );
};

export default ClusterTabsSection;
