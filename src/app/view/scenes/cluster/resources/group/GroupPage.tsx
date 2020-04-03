import React from "react";
import { useRouteMatch } from "react-router";

import { types } from "app/store";
import { join, tabRoutes } from "app/view/utils";
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
  const urlMap = {
    Detail: join(resourceUrlPrefix),
    Constraints: join(resourceUrlPrefix, "constraints"),
  };
  const { tab } = tabRoutes.selectCurrent<keyof typeof urlMap>("Detail", {
    Detail: useRouteMatch({ path: urlMap.Detail, exact: true }),
    Constraints: useRouteMatch(urlMap.Constraints),
  });
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={group.id} type="group" />}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && <GroupDetail group={group} />}
      {tab === "Constraints" && <ConstraintListResource resource={group} />}
    </DetailLayout>
  );
};
