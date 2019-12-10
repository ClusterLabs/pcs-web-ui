import React from "react";
import { useRouteMatch } from "react-router";

import { types } from "app/store";
import { tabRoutes, join } from "app/view/utils";
import {
  UrlTabs,
  DetailLayout,
  ResourceDetailCaption,
} from "app/view/common";
import { ConstraintListResource } from "app/scenes/constraints";

import GroupDetail from "./GroupDetail";

const GroupPage = ({ group, urlPrefix, onClose }: {
  group: types.cluster.Group;
  urlPrefix: string;
  onClose: React.ComponentProps<typeof DetailLayout>["onClose"],
}) => {
  const urlMap = {
    Detail: join(urlPrefix),
    Constraints: join(urlPrefix, "constraints"),
  };
  const { tab } = tabRoutes.selectCurrent<keyof typeof urlMap>("Detail", {
    Detail: useRouteMatch({ path: urlMap.Detail, exact: true }),
    Constraints: useRouteMatch(urlMap.Constraints),
  });
  return (
    <DetailLayout
      onClose={onClose}
      caption={<ResourceDetailCaption resourceId={group.id} type="group" />}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && (
        <GroupDetail group={group} />
      )}
      {tab === "Constraints" && (
        <ConstraintListResource resource={group} />
      )}
    </DetailLayout>
  );
};

export default GroupPage;
