import {testMarks} from "app/view/dataTest";
import {ClusterToolbar, GroupDetailView} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {NodeDetailPage} from "./NodeDetailPage";
import {NodeList} from "./NodeList";
import * as task from "./task";

const {nodes, nodesToolbar} = testMarks.cluster;
export const NodesPage = () => {
  const {nodeList} = useLoadedCluster();
  return (
    <>
      <ClusterToolbar
        toolbarName="nodes"
        buttonsItems={[
          {
            name: "add-node",
            task: {
              component: task.add.NodeAdd,
              useTask: task.add.useTask,
            },
            ...nodesToolbar.addNode.mark,
          },
        ]}
        {...nodesToolbar.mark}
      />
      <GroupDetailView
        groupCard={<NodeList nodeList={nodeList} />}
        detailCard={<NodeDetailPage />}
        {...nodes.mark}
      />
    </>
  );
};
