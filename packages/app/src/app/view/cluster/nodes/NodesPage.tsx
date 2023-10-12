import {testMarks} from "app/view/dataTest";
import {ClusterToolbar} from "app/view/share";
import {
  GroupDetailSection,
  GroupDetailView,
  useLoadedCluster,
} from "app/view/cluster/share";

import {NodeDetailPage} from "./NodeDetailPage";
import {NodeList} from "./NodeList";

const {nodes, nodesToolbar} = testMarks.cluster;
export const NodesPage = () => {
  const {nodeList} = useLoadedCluster();
  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "add-node",
            taskName: "nodeAdd",
            ...nodesToolbar.addNode.mark,
          },
        ]}
        {...nodesToolbar.mark}
      />
      <GroupDetailSection {...testMarks.cluster.mark}>
        <GroupDetailView
          groupCard={<NodeList nodeList={nodeList} />}
          detailCard={<NodeDetailPage />}
          {...nodes.mark}
        />
      </GroupDetailSection>
    </>
  );
};
