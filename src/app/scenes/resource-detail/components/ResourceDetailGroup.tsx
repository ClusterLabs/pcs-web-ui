import React from "react";
import { useRouteMatch } from "react-router";

import { Group } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import {
  UrlTabs,
  DetailLayout,
  ResourceDetailCaption,
} from "app/common/components";
import { GroupDetail } from "app/scenes/resource-group";

const ResourceDetailGroup = ({ group, urlPrefix, onClose }: {
  group: Group;
  urlPrefix: string;
  onClose: React.ComponentProps<typeof DetailLayout>["onClose"],
}) => {
  const urlMap = {
    Detail: join(urlPrefix),
  };
  const { tab } = tabRoutes.selectCurrent<keyof typeof urlMap>("Detail", {
    Detail: useRouteMatch({ path: urlMap.Detail, exact: true }),
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
    </DetailLayout>
  );
};

export default ResourceDetailGroup;
