import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { Tab, Tabs } from "@patternfly/react-core";

export function UrlTabs<T extends {[key:string]: string}>(
  { tabSettingsMap, currentTab, label="" }: {
    tabSettingsMap: T,
    currentTab: keyof T,
    label?: string,
  },
) {
  const dispatch = useDispatch();
  const rest: Record<string, string> = {}
  if (label.length > 0) {
    rest["aria-label"] = label;
  }
  return (
    <Tabs
      activeKey={currentTab as string}
      onSelect={(e, tabIndex) => {
        const selectedTab = tabIndex as keyof T;
        if (tabIndex !== currentTab) {
          dispatch(push(tabSettingsMap[selectedTab]));
        }
      }}
      {...rest}
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
