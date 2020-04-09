import React from "react";
import {
  DetailLayout,
  UrlTabs,
  useGroupDetailViewContext,
} from "app/view/common";
import { analyzeRoutes, join, useMatch } from "app/view/utils";

export const NodeDetailPage = () => {
  const { selectedItemUrlName, urlPrefix } = useGroupDetailViewContext();

  const nodeUrlPrefix = join(urlPrefix, selectedItemUrlName);

  const { tab, urlMap } = analyzeRoutes("Detail", {
    Detail: useMatch({ path: nodeUrlPrefix, exact: true }),
  });

  return (
    <DetailLayout
      caption={selectedItemUrlName}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    />
  );
};
