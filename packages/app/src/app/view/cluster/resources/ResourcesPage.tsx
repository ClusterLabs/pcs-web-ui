import {testMarks} from "app/view/dataTest";
import {
  ClusterToolbar,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {
  GroupDetailSection,
  GroupDetailView,
  useLoadedCluster,
} from "app/view/cluster/share";
import {useOpenTask} from "app/view/cluster/task";

import {ResourceDetailPage} from "./ResourceDetailPage";
import {ResourceTree} from "./tree/ResourceTree";

const {resources, resourcesToolbar} = testMarks.cluster;

export const ResourcesPage = () => {
  const {resourceTree, clusterName} = useLoadedCluster();
  const openTask = useOpenTask(clusterName);

  const launchDisable = useLauncherDisableClusterNotRunning();

  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "create-resource",
            run: () => openTask("resourceCreate"),
            launchDisable: launchDisable(
              "Cannot create resource on stopped cluster",
            ),
            ...resourcesToolbar.createResource.mark,
          },
          {
            name: "create-group",
            run: () => openTask("resourceGroup"),
            launchDisable: launchDisable(
              "Cannot create resource group on stopped cluster",
            ),
            ...resourcesToolbar.createGroup.mark,
          },
        ]}
        {...resourcesToolbar.mark}
      />
      <GroupDetailSection {...testMarks.cluster.mark}>
        <GroupDetailView
          groupCard={<ResourceTree resourceTree={resourceTree} />}
          detailCard={<ResourceDetailPage />}
          {...resources.mark}
        />
      </GroupDetailSection>
    </>
  );
};
