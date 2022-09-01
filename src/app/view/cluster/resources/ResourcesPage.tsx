import { ActionList } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  ActionTaskLauncher,
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";

import { ResourceDetailPage } from "./ResourceDetailPage";
import { ResourceTree } from "./tree/ResourceTree";
import * as task from "./task";

export const ResourcesPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionTaskLauncher
            taskComponent={task.create.ResourceCreate}
            useTask={task.create.useTask}
            label="Create Resource"
          />
          <ActionTaskLauncher
            taskComponent={task.createGroup.ResourceCreateGroup}
            useTask={task.createGroup.useTask}
            label="Create group"
            variant="secondary"
          />
        </ActionList>
      </ClusterSectionToolbar>
      <GroupDetailView
        groupCard={<ResourceTree resourceTree={cluster.resourceTree} />}
        detailCard={<ResourceDetailPage />}
      />
    </>
  );
};
