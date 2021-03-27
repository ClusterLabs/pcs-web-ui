import React from "react";

import { Group } from "app/view/cluster/types";
import {
  DetailLayout,
  NVPairListView,
  ResourceDetailCaption,
  UrlTabs,
  join,
  useGroupDetailViewContext,
  useMatch,
  useRoutesAnalysis,
} from "app/view/share";

import { GroupDetail } from "./GroupDetail";
import { GroupPageToolbar } from "./GroupPageToolbar";

export const GroupPage = ({ group }: { group: Group }) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const resourceUrlPrefix = join(urlPrefix, group.id);
  const { tab, urlMap } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: resourceUrlPrefix, exact: true }),
    Meta: useMatch(join(resourceUrlPrefix, "meta-attributes")),
  });
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={group.id} type="group" />}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
      toolbar={<GroupPageToolbar group={group} />}
      data-test={`resource-detail ${group.id}`}
    >
      {tab === "Detail" && <GroupDetail group={group} />}
      {tab === "Meta" && (
        <NVPairListView nvPairListView={group.metaAttributes} />
      )}
    </DetailLayout>
  );
};
