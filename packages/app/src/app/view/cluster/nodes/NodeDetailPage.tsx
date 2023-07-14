import React from "react";

import {testMarks} from "app/view/dataTest";
import {
  DetailLayout,
  Router,
  UrlTabs,
  useGroupDetailViewContext,
  useUrlTabs,
} from "app/view/share";
import {
  NVPairListPage,
  UtilizationView,
  useLoadedCluster,
} from "app/view/cluster/share";

import {NodeDetailPageToolbar} from "./NodeDetailPageToolbar";
import {NodeDetailView} from "./NodeDetailView";
import {NodeDoesNotExists} from "./NodeDoesNotExists";

export const nodePageTabList = ["detail", "attributes", "utilization"] as const;

const {currentNode} = testMarks.clusterDetail.nodes;
export const NodeDetailPage = () => {
  const {selectedItemUrlName: selectedNodeName} = useGroupDetailViewContext();
  const {currentTab, matchedContext} = useUrlTabs(nodePageTabList);
  const {nodeList, nodeAttr, nodesUtilization} = useLoadedCluster();

  const node = React.useMemo(
    () => nodeList.find(n => n.name === selectedNodeName),
    [nodeList, selectedNodeName],
  );

  if (!node) {
    return <NodeDoesNotExists nodeName={selectedNodeName} />;
  }

  return (
    <DetailLayout
      caption={<strong {...currentNode.name.mark}>{selectedNodeName}</strong>}
      tabs={
        <UrlTabs
          tabList={nodePageTabList}
          currentTab={currentTab}
          data-test="node"
        />
      }
      toolbar={<NodeDetailPageToolbar node={node} />}
      {...currentNode.mark}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && <NodeDetailView node={node} />}
        {currentTab === "attributes" && (
          <NVPairListPage
            nvPairList={nodeAttr?.[selectedNodeName] ?? []}
            owner={{
              type: "node-attr",
              id: node.name,
            }}
            createLabel="Create node attribute"
          />
        )}
        {currentTab === "utilization" && (
          <UtilizationView
            utilizationAttrs={nodesUtilization?.[selectedNodeName] ?? []}
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
