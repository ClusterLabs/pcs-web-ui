import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "app/store";
import {
  DetailLayout,
  NVPairListView,
  UrlTabs,
  UtilizationView,
  useGroupDetailViewContext,
} from "app/view";
import { useSelectedClusterName } from "app/scenes";
import { join, useMatch, useRoutesAnalysis } from "app/view/utils";

import { NodeDetailView } from "./NodeDetailView";
import { NodeDoesNotExists } from "./NodeDoesNotExists";

export const NodeDetailPage = () => {
  const { selectedItemUrlName, urlPrefix } = useGroupDetailViewContext();

  const node = useSelector(
    selectors.getSelectedNode(useSelectedClusterName(), selectedItemUrlName),
  );

  const nodeUrlPrefix = join(urlPrefix, selectedItemUrlName);
  const { tab, urlMap } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: nodeUrlPrefix, exact: true }),
    Attributes: useMatch(join(nodeUrlPrefix, "attributes")),
    Utilization: useMatch(join(nodeUrlPrefix, "utilization")),
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
      {tab === "Attributes" && (
        <NVPairListView nvPairListView={node.attributes} />
      )}
      {tab === "Utilization" && (
        <UtilizationView utilizationParams={node.utilization} />
      )}
    </DetailLayout>
  );
};
