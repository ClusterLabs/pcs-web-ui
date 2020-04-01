import React from "react";
import { useRouteMatch } from "react-router";

import { types } from "app/store";
import { tabRoutes, join } from "app/view/utils";
import {
  UrlTabs,
  ResourceDetailCaption,
  useGroupDetailViewContext,
  DetailLayout,
} from "app/view/common";

import { ConstraintListResource } from "../constraints";
import { CloneDetail } from "./CloneDetail";

export const ClonePage = ({ clone }: { clone: types.cluster.Clone }) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const resourceUrlPrefix = join(urlPrefix, clone.id);
  const urlMap = {
    Detail: resourceUrlPrefix,
    Constraints: join(resourceUrlPrefix, "constraints"),
  };
  const { tab } = tabRoutes.selectCurrent<keyof typeof urlMap>("Detail", {
    Detail: useRouteMatch({ path: urlMap.Detail, exact: true }),
    Constraints: useRouteMatch(urlMap.Constraints),
  });
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={clone.id} type="clone" />}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && (
        <CloneDetail clone={clone} />
      )}
      {tab === "Constraints" && (
        <ConstraintListResource resource={clone} />
      )}
    </DetailLayout>
  );
};
