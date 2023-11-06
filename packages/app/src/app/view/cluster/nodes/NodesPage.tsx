import {testMarks} from "app/view/dataTest";
import {ClusterToolbar} from "app/view/share";
import {
  GroupDetailSection,
  GroupDetailView,
  useLoadedCluster,
} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

import {NodeDetailPage} from "./NodeDetailPage";
import {NodeList} from "./NodeList";

const {nodes, nodesToolbar} = testMarks.cluster;
export const NodesPage = () => {
  const {nodeList, clusterName} = useLoadedCluster();
  const openTask = useOpenTask();
  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "add-node",
            run: () =>
              openTask("nodeAdd", {
                type: "NODE.ADD.INIT",
                key: {clusterName},
                payload: {
                  clusterName,
                  isSbdEnabled: nodeList.reduce(
                    (enabled, n) =>
                      enabled
                      || (n.status !== "DATA_NOT_PROVIDED" && n.sbd !== undefined),
                    false,
                  ),
                },
              }),
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
