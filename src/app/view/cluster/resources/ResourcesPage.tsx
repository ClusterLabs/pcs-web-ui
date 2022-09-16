import { selectors } from "app/store";
import {
  ClusterToolbar,
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
      <ClusterToolbar
        toolbarName="resources"
        buttonsItems={[
          {
            name: "create-resource",
            task: {
              component: task.create.ResourceCreate,
              useTask: task.create.useTask,
            },
          },
          {
            name: "create-group",
            task: {
              component: task.createGroup.ResourceCreateGroup,
              useTask: task.createGroup.useTask,
            },
          },
        ]}
      />
      <GroupDetailView
        groupCard={<ResourceTree resourceTree={cluster.resourceTree} />}
        detailCard={<ResourceDetailPage />}
      />
    </>
  );
};
