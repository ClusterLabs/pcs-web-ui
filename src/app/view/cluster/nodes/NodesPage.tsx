import React from "react";
import { ActionList } from "@patternfly/react-core";

import {
  ActionTaskLauncher,
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";
import { selectors } from "app/store";

import { NodeDetailPage } from "./NodeDetailPage";
import { NodeList } from "./NodeList";
import * as task from "./task";

export const NodesPage: React.FC = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionTaskLauncher
            taskComponent={task.add.NodeAdd}
            useTask={task.add.useTask}
            label="Add node"
            data-test="node-add"
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
