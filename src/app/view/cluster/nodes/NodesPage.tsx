import {selectors} from "app/store";
import {
  ClusterToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";

import {NodeDetailPage} from "./NodeDetailPage";
import {NodeList} from "./NodeList";
import * as task from "./task";

export const NodesPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
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
          },
        ]}
      />
      <GroupDetailView
        groupCard={<NodeList nodeList={cluster.nodeList} />}
        detailCard={<NodeDetailPage />}
      />
    </>
  );
};
