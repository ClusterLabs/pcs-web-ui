import React from "react";
import { useRouteMatch } from "react-router";

import { Group } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import {
  UrlTabs,
  DetailLayout,
  ResourceDetailCaption,
} from "app/common/components";
import { ConstraintListResource } from "app/scenes/constraints";

import GroupDetail from "./GroupDetail";

const GroupPage = ({ group, urlPrefix, onClose }: {
  group: Group;
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
