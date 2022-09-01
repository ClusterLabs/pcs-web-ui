import { ActionList } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  ActionTaskLauncher,
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";

import { NodeDetailPage } from "./NodeDetailPage";
import { NodeList } from "./NodeList";
import * as task from "./task";

export const NodesPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionTaskLauncher
            taskComponent={task.add.NodeAdd}
            useTask={task.add.useTask}
            label="Add node"
          />
        </ActionList>
      </ClusterSectionToolbar>
      <GroupDetailView
        groupCard={<NodeList nodeList={cluster.nodeList} />}
        detailCard={<NodeDetailPage />}
      />
    </>
  );
};
