import {
  ClusterToolbar,
  GroupDetailView,
  useLoadedCluster,
} from "app/view/share";
import {} from "app/view/share";

import {NodeDetailPage} from "./NodeDetailPage";
import {NodeList} from "./NodeList";
import * as task from "./task";

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
          },
        ]}
      />
      <GroupDetailView
        groupCard={<NodeList nodeList={nodeList} />}
        detailCard={<NodeDetailPage />}
      />
    </>
  );
};
