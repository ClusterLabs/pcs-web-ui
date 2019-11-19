import React from "react";
import { useRouteMatch } from "react-router";

import { Clone } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import {
  UrlTabs,
  DetailLayout,
  ResourceDetailCaption,
} from "app/common/components";
import CloneDetail from "./CloneDetail";

const ResourceDetailGroup = ({ clone, urlPrefix, onClose }: {
  clone: Clone;
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
      caption={<ResourceDetailCaption resourceId={clone.id} type="clone" />}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && (
        <CloneDetail clone={clone} />
      )}
    </DetailLayout>
  );
};

export default ResourceDetailGroup;
