import type React from "react";
import type {Tabs} from "@patternfly/react-core";

import {useLocation} from "app/view/share/router";
import {useRoute} from "app/view/share/router";

export const useUrlTabs = <TABS extends ReadonlyArray<string>>(
  tabList: TABS,
): {
  currentTab: TABS[number];
  matchedContext: string;
  onSelect: React.ComponentProps<typeof Tabs>["onSelect"];
} => {
  const tab = useRoute("/:tab/*");
  const {navigate} = useLocation();

  let currentTab: TABS[number] = tabList[0];
  if (tab !== null && tabList.includes(tab?.params?.tab)) {
    currentTab = tab?.params?.tab as TABS[number];
  }

  return {
    currentTab,
    matchedContext: tab?.matched ?? `/${tabList[0]}`,
    onSelect: (_e, tabIndex) => {
      if (tabIndex !== currentTab) {
        navigate(`/${tabIndex}`);
      }
    },
  };
};
