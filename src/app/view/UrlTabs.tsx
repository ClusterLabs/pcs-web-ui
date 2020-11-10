import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { Tab, Tabs } from "@patternfly/react-core";

/* eslint-disable react/require-default-props */
export function UrlTabs<T extends { [key: string]: string }>({
  tabSettingsMap,
  currentTab,
  label = "",
}: {
  tabSettingsMap: T;
  currentTab: keyof T;
  label?: string;
}) {
  const dispatch = useDispatch();
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Tabs
      activeKey={currentTab as string}
      onSelect={(_e, tabIndex) => {
        const selectedTab = tabIndex as keyof T;
        if (tabIndex !== currentTab) {
          dispatch(push(tabSettingsMap[selectedTab]));
        }
      }}
      data-test={`tabs ${label}`}
    >
      {Object.keys(tabSettingsMap).map(key => (
        <Tab key={key} eventKey={key} title={key} />
      ))}
    </Tabs>
  );
}
