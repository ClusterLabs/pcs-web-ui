import {Tab, Tabs} from "@patternfly/react-core";

import {tools} from "app/store";

import {useUrlTabs} from "./useUrlTabs";

export function UrlTabs<T extends string>({
  tabList,
  currentTab,
  "data-test": dataTest,
  toLabel,
}: {
  tabList: ReadonlyArray<T>; // {tabLabel: urlParamName}
  currentTab: T;
  toLabel?: (_tab: T) => string;
  ["data-test"]?: string;
}) {
  const {onSelect} = useUrlTabs(tabList);
  const paramToLabel = toLabel ?? tools.labelize;
  return (
    <Tabs
      activeKey={currentTab as string}
      onSelect={onSelect}
      data-test={`tabs ${dataTest}`}
    >
      {tabList.map(tab => (
        <Tab
          key={tab}
          eventKey={tab}
          title={paramToLabel(tab)}
          data-test={tab}
        />
      ))}
    </Tabs>
  );
}
