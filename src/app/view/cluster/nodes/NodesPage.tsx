import React from "react";
import { ActionList, ActionListItem } from "@patternfly/react-core";

import {
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";
import { selectors } from "app/store";

import { NodeDetailPage } from "./NodeDetailPage";
import { NodeList } from "./NodeList";
import { NodeAddToolbarItem } from "./task";

export const NodesPage: React.FC<{ urlPrefix: string }> = ({ urlPrefix }) => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionListItem>
            <NodeAddToolbarItem />
          </ActionListItem>
        </ActionList>
      </ClusterSectionToolbar>
      <GroupDetailView
        urlPrefix={urlPrefix}
        groupCard={<NodeList nodeList={cluster.nodeList} />}
        detailCard={<NodeDetailPage />}
      />
    </>
  );
};
