import React from "react";

import { types } from "app/store";
import { analyzeRoutes, join, useMatch } from "app/view/utils";
import {
  DetailLayout,
  ResourceDetailCaption,
  UrlTabs,
  useGroupDetailViewContext,
} from "app/view/common";

import { ConstraintListResource } from "../constraints";
import { GroupDetail } from "./GroupDetail";

export const GroupPage = ({ group }: { group: types.cluster.Group }) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const resourceUrlPrefix = join(urlPrefix, group.id);
  const { tab, urlMap } = analyzeRoutes("Detail", {
    Detail: useMatch({ path: resourceUrlPrefix, exact: true }),
    Constraints: useMatch(join(resourceUrlPrefix, "constraints")),
  });
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={group.id} type="group" />}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
      data-test={`resource-detail ${group.id}`}
    >
      {tab === "Detail" && <GroupDetail group={group} />}
      {tab === "Constraints" && <ConstraintListResource resource={group} />}
    </DetailLayout>
  );
};
