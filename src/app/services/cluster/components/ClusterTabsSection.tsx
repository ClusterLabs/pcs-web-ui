import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { PageSection, Tab, Tabs } from "@patternfly/react-core";

interface TabSetting {
  url: string,
  label: string,
}

export type TABS = "detail"|"nodes"|"resources"|"fenceDevices";

const createTabUrlMap = (
  clusterUrlName: string,
) => (): Record<TABS, TabSetting> => ({
  detail: {
    url: `/cluster/${clusterUrlName}`,
    label: "Detail",
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

const ClusterTabsSection = ({ clusterUrlName, currentTab }: {
  clusterUrlName: string,
  currentTab: TABS,
}) => {
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
        {Object.keys(tabSettingsMap).map(key => (
          <Tab
            key={key}
            eventKey={key}
            title={tabSettingsMap[key as TABS].label}
          />
        ))}
      </Tabs>
    </PageSection>
  );
};

export default ClusterTabsSection;
