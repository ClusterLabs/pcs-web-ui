import React from "react";

import { selectors } from "app/store";
import {
  DetailLayout,
  NVPairListView,
  UrlTabs,
  UtilizationView,
  join,
  useClusterSelector,
  useGroupDetailViewContext,
  useMatch,
  useRoutesAnalysis,
} from "app/view";

import { NodeDetailView } from "./NodeDetailView";
import { NodeDoesNotExists } from "./NodeDoesNotExists";
import { NodeDetailPageToolbar } from "./NodeDetailPageToolbar";

export const NodeDetailPage = () => {
  const { selectedItemUrlName, urlPrefix } = useGroupDetailViewContext();

  const [node] = useClusterSelector(
    selectors.getSelectedNode,
    selectedItemUrlName,
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
      toolbar={<NodeDetailPageToolbar node={node} />}
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
