import {testMarks} from "app/view/dataTest";
import {
  ClusterToolbar,
  GroupDetailView,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {ResourceDetailPage} from "./ResourceDetailPage";
import {ResourceTree} from "./tree/ResourceTree";
import * as task from "./task";

const {detail, toolbar} = testMarks.clusterDetail.resources;

export const ResourcesPage = () => {
  const {resourceTree} = useLoadedCluster();

  const launchDisable = useLauncherDisableClusterNotRunning();

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
            launchDisable: launchDisable(
              "Cannot create resource on stopped cluster",
            ),
            ...toolbar.createGroup.mark,
          },
          {
            name: "create-group",
            task: {
              component: task.createGroup.ResourceCreateGroup,
              useTask: task.createGroup.useTask,
            },
            launchDisable: launchDisable(
              "Cannot create resource group on stopped cluster",
            ),
            ...toolbar.createGroup.mark,
          },
        ]}
        {...toolbar.mark}
      />
      <GroupDetailView
        groupCard={<ResourceTree resourceTree={resourceTree} />}
        detailCard={<ResourceDetailPage />}
        {...detail.mark}
      />
    </>
  );
};
