import React from "react";
import { useRouteMatch } from "react-router";

import { Clone } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import { UrlTabs } from "app/common/components";
import { CloneDetail } from "app/scenes/resource-clone";

import ResourceDetailLayout from "./ResourceDetailLayout";
import ResourceDetailCaption from "./ResourceDetailCaption";

const ResourceDetailGroup = ({ clone, urlPrefix, onClose }: {
  clone: Clone;
  urlPrefix: string;
  onClose: React.ComponentProps<typeof ResourceDetailLayout>["onClose"],
}) => {
  const urlMap = {
    Detail: join(urlPrefix),
  };
  const { tab } = tabRoutes.selectCurrent<keyof typeof urlMap>("Detail", {
    Detail: useRouteMatch({ path: urlMap.Detail, exact: true }),
  });
  return (
    <ResourceDetailLayout
      onClose={onClose}
      caption={<ResourceDetailCaption resourceId={clone.id} type="clone" />}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && (
        <CloneDetail clone={clone} />
      )}
    </ResourceDetailLayout>
  );
};

export default ResourceDetailGroup;
