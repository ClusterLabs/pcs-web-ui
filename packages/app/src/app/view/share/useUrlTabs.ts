import {useRoute} from "app/view/share/router";

export const useUrlTabs = <TABS extends ReadonlyArray<string>>(
  tabList: TABS,
  defaultTab?: TABS[number],
): {currentTab: TABS[number]; matchedContext: string; tabList: TABS} => {
  const tab = useRoute("/:tab/*");

  let currentTab: TABS[number] = defaultTab ?? tabList[0];
  if (tab !== null && tabList.includes(tab?.params?.tab)) {
    currentTab = tab?.params?.tab as TABS[number];
  }

  return {
    currentTab,
    matchedContext: tab?.matched ?? `/${defaultTab}`,
    tabList,
  };
};
