import React from "react";
import {Tab, Tabs} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  DetailLayout,
  Router,
  useGroupDetailViewContext,
  useUrlTabs,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {NodeDetailPageToolbar} from "./NodeDetailPageToolbar";
import {NodeDetailView} from "./NodeDetailView";
import {NodeDoesNotExists} from "./NodeDoesNotExists";
import {NodeAttributes} from "./NodeAttributes";
import {NodeUtilization} from "./NodeUtilization";

export const nodePageTabList = ["detail", "attributes", "utilization"] as const;

const {currentNode} = testMarks.cluster.nodes;
const {tabs} = currentNode;
const tabMap = {
  detail: (
    <Tab
      eventKey="detail"
      key="detail"
      title={"Detail"}
      {...tabs.detail.mark}
    />
  ),
  attributes: (
    <Tab
      eventKey="attributes"
      key="attributes"
      title="Attributes"
      {...tabs.attributes.mark}
    />
  ),
  utilization: (
    <Tab
      eventKey="utilization"
      key="utilization"
      title="Utilization"
      {...tabs.utilization.mark}
    />
  ),
};

export const NodeDetailPage = () => {
  const {selectedItemUrlName: selectedNodeName} = useGroupDetailViewContext();
  const {currentTab, matchedContext, onSelect} = useUrlTabs(
    Object.keys(tabMap) as (keyof typeof tabMap)[],
  );
  const {nodeList} = useLoadedCluster();

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
        <Tabs activeKey={currentTab} onSelect={onSelect} {...tabs.mark}>
          {Object.values(tabMap)}
        </Tabs>
      }
      toolbar={<NodeDetailPageToolbar node={node} />}
      {...currentNode.mark}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && <NodeDetailView node={node} />}
        {currentTab === "attributes" && <NodeAttributes nodeName={node.name} />}
        {currentTab === "utilization" && (
          <NodeUtilization nodeName={node.name} />
        )}
      </Router>
    </DetailLayout>
  );
};
