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

export const nodePageTabList = ["detail", "attributes", "utilization"] as const;

export const NodeDetailPage = () => {
  const { selectedItemUrlName: nodeName } = useGroupDetailViewContext();

  const [node] = useClusterSelector(selectors.getSelectedNode, nodeName);

  const { currentTab, matchedContext } = useUrlTabs(nodePageTabList);

  const { nodeAttrs, nodeUtilization } = useClusterState(
    useSelectedClusterName(),
  );
  if (!node) {
    return <NodeDoesNotExists nodeName={nodeName} />;
  }

  return (
    <DetailLayout
      caption={nodeName}
      tabs={
        <UrlTabs
          tabList={nodePageTabList}
          currentTab={currentTab}
          data-test="node"
        />
      }
      toolbar={<NodeDetailPageToolbar node={node} />}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && <NodeDetailView node={node} />}
        {currentTab === "attributes" && (
          <NVPairListView nvPairListView={nodeAttrs(node.name)} />
        )}
        {currentTab === "utilization" && (
          <UtilizationView
            utilizationAttrs={nodeUtilization(node.name)}
            owner={{
              type: "node-utilization",
              id: node.name,
            }}
          />
        )}
      </Router>
    </DetailLayout>
  );
};
