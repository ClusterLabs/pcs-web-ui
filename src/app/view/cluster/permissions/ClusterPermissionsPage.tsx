import {PageSection} from "@patternfly/react-core";

import {useClusterStore} from "app/view/cluster/share";
import {
  ClusterToolbar,
  EmptyStateSpinner,
  TaskOpenArgs,
  useSelectedClusterName,
} from "app/view/share";

import * as task from "./task";
import {PermissionsTable} from "./PermissionsTable";

export const ClusterPermissionsPage = () => {
  const clusterName = useSelectedClusterName();
  const {clusterStoreInfo} = useClusterStore(clusterName);

  if (clusterStoreInfo.state === "cluster-not-in-storage") {
    return <EmptyStateSpinner title="Loading cluster permission data" />;
  }

  const addOpenArgs: TaskOpenArgs<typeof task.add.useTask> = [{type: "create"}];
  return (
    <>
      <ClusterToolbar
        toolbarName="permissions"
        buttonsItems={[
          {
            name: "create-permission",
            task: {
              component: task.add.PermissionTask,
              useTask: task.add.useTask,
              openArgs: addOpenArgs,
            },
          },
        ]}
      />

      <PageSection>
        <PermissionsTable />
      </PageSection>
    </>
  );
};
