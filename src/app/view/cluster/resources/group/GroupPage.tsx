import React from "react";

import { Group } from "app/view/cluster/types";
import {
  DetailLayout,
  NVPairListView,
  ResourceDetailCaption,
  Router,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";

import { GroupDetail } from "./GroupDetail";
import { GroupPageToolbar } from "./GroupPageToolbar";

const tabList = ["detail", "meta"] as const;

export const GroupPage = ({ group }: { group: Group }) => {
  const { currentTab, matchedContext } = useUrlTabs(tabList);
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={group.id} type="group" />}
      tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
      toolbar={<GroupPageToolbar group={group} />}
      data-test={`resource-detail ${group.id}`}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && <GroupDetail group={group} />}
        {currentTab === "meta" && (
          <NVPairListView nvPairListView={group.metaAttributes} />
        )}
      </Router>
    </DetailLayout>
  );
};
