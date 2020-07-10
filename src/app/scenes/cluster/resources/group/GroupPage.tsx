import React from "react";

import { types } from "app/store";
import { DetailLayout, NVPairListView, ResourceDetailCaption,
  UrlTabs,
  join,
  useGroupDetailViewContext,
  useMatch,
  useRoutesAnalysis,
} from "app/view";


import { GroupDetail } from "./GroupDetail";

export const GroupPage = ({ group }: { group: types.cluster.Group }) => {
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
      data-test={`resource-detail ${group.id}`}
    >
      {tab === "Detail" && <GroupDetail group={group} />}
      {tab === "Meta" && (
        <NVPairListView nvPairListView={group.metaAttributes} />
      )}
    </DetailLayout>
  );
};
