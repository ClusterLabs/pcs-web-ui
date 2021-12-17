import React from "react";

import { selectors } from "app/store";
import {
  DetailLayout,
  NVPairListView,
  Router,
  UrlTabs,
  UtilizationView,
  useClusterSelector,
  useClusterState,
  useGroupDetailViewContext,
  useSelectedClusterName,
  useUrlTabs,
} from "app/view/share";

import { NodeDetailPageToolbar } from "./NodeDetailPageToolbar";
import { NodeDetailView } from "./NodeDetailView";
import { NodeDoesNotExists } from "./NodeDoesNotExists";

const tabList = ["detail", "attributes", "utilization"] as const;

export const NodeDetailPage: React.FC = () => {
  const { selectedItemUrlName: nodeName } = useGroupDetailViewContext();

  const [node] = useClusterSelector(selectors.getSelectedNode, nodeName);

  const { currentTab, matchedContext } = useUrlTabs(tabList);

  const { nodeAttrs, nodeUtilization } = useClusterState(
    useSelectedClusterName(),
  );
  if (!node) {
    return <NodeDoesNotExists nodeName={nodeName} />;
  }

  return (
    <DetailLayout
      caption={nodeName}
      tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
      toolbar={<NodeDetailPageToolbar node={node} />}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && <NodeDetailView node={node} />}
        {currentTab === "attributes" && (
          <NVPairListView nvPairListView={nodeAttrs(node.name)} />
        )}
        {currentTab === "utilization" && (
          <UtilizationView utilizationParams={nodeUtilization(node.name)} />
        )}
      </Router>
    </DetailLayout>
  );
};
