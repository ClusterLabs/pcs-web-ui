import React from "react";

import { Clone } from "app/view/cluster/types";
import {
  DetailLayout,
  NVPairListView,
  ResourceDetailCaption,
  Router,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";

import { CloneDetail } from "./CloneDetail";

const tabList = ["detail", "meta"] as const;

export const ClonePage = ({ clone }: { clone: Clone }) => {
  const { currentTab, matchedContext } = useUrlTabs(tabList);
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={clone.id} type="clone" />}
      tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
      data-test={`resource-detail ${clone.id}`}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && <CloneDetail clone={clone} />}
        {currentTab === "meta" && (
          <NVPairListView nvPairListView={clone.metaAttributes} />
        )}
      </Router>
    </DetailLayout>
  );
};
