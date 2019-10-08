import React from "react";
import { useRouteMatch } from "react-router";

import { Clone } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import { UrlTabs } from "app/common/components";

import ResourceDetailLayout from "./ResourceDetailLayout";

const ResourceDetailGroup = ({ clone, urlPrefix, closeUrl }: {
  clone: Clone;
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
          <span>Clone </span>
          <strong>{clone.id}</strong>
        </>
      )}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      Group
    </ResourceDetailLayout>
  );
};

export default ResourceDetailGroup;
