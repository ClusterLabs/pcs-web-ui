import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "app/store";
import {
  DetailLayout,
  UrlTabs,
  useGroupDetailViewContext,
} from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";
import { analyzeRoutes, join, useMatch } from "app/view/utils";

import { NodeDetailView } from "./NodeDetailView";
import { NodeDoesNotExists } from "./NodeDoesNotExists";

export const NodeDetailPage = () => {
  const { selectedItemUrlName, urlPrefix } = useGroupDetailViewContext();

  const node = useSelector(
    selectors.getSelectedNode(useSelectedClusterName(), selectedItemUrlName),
  );

  const nodeUrlPrefix = join(urlPrefix, selectedItemUrlName);
  const { tab, urlMap } = analyzeRoutes("Detail", {
    Detail: useMatch({ path: nodeUrlPrefix, exact: true }),
  });

  if (!node) {
    return <NodeDoesNotExists nodeUrlName={selectedItemUrlName} />;
  }

  return (
    <DetailLayout
      caption={selectedItemUrlName}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && <NodeDetailView node={node} />}
    </DetailLayout>
  );
};
