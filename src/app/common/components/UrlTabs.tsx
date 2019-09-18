import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { Tab, Tabs } from "@patternfly/react-core";

// UrlTabs needs map label -> url. Components that uses UrlTabs sometimes need
// define a map with labels as keys STATICALLY to check types (e.g. keyof typeof
// labelUrlCreateMap). But the url must be built dynamically (e.g. according
// current cluster name). One solution is to create map label -> urlCreator and
// then build label -> url map from it. Intention of this function is help with
// this process a bit. Look at particular places where it is used...
function createLabelUrlMap<T extends Record<string, U>, U>(
  tabUrlCreatorMap: T,
  toUrl: (urlCreator: U) => string,
) {
  return (): Record<keyof T, string> => (Object.keys(tabUrlCreatorMap).reduce(
    (map, key) => ({
      ...map,
      [key]: toUrl(tabUrlCreatorMap[key]),
    }),
    {} as Record<keyof T, string>,
  ));
}

function UrlTabs<T extends {[key:string]: string}>(
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

UrlTabs.createLabelUrlMap = createLabelUrlMap;

export default UrlTabs;
