import React from "react";
import { useRouteMatch } from "react-router";

import { Group } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import { UrlTabs } from "app/common/components";
import { GroupDetail } from "app/scenes/resource-group";

import ResourceDetailLayout from "./ResourceDetailLayout";

const ResourceDetailGroup = ({ group, urlPrefix, closeUrl }: {
  group: Group;
  urlPrefix: string;
  closeUrl: string;
}) => {
  const urlMap = {
    Detail: join(urlPrefix),
  };
  const { tab } = tabRoutes.selectCurrent<keyof typeof urlMap>("Detail", {
    Detail: useRouteMatch({ path: urlMap.Detail, exact: true }),
  });
  return (
    <ResourceDetailLayout
      closeUrl={closeUrl}
      caption={(
        <>
          <span>Group </span>
          <strong>{group.id}</strong>
        </>
      )}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && (
        <GroupDetail group={group} />
      )}
    </ResourceDetailLayout>
  );
};

export default ResourceDetailGroup;
