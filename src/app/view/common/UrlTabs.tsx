import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { Tab, Tabs } from "@patternfly/react-core";

export function UrlTabs<T extends {[key:string]: string}>(
  { tabSettingsMap, currentTab }: {
    tabSettingsMap: T,
    currentTab: keyof T,
  },
) {
  const dispatch = useDispatch();
  return (
    <Tabs
      activeKey={currentTab as string}
      onSelect={(e, tabIndex) => {
        const selectedTab = tabIndex as keyof T;
        if (tabIndex !== currentTab) {
          dispatch(push(tabSettingsMap[selectedTab]));
        }
      }}
    >
      {Object.keys(tabSettingsMap).map(key => (
        <Tab
          key={key}
          eventKey={key}
          title={key}
        />
      ))}
    </Tabs>
  );
}
