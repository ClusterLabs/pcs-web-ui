import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {ClusterToolbar} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/cluster/task";

import {PermissionsTable} from "./PermissionsTable";

const {permissionsToolbar} = testMarks.cluster;

export const ClusterPermissionsPage = () => {
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask(clusterName);
  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "create-permission",
            run: () =>
              openTask("permissionEdit", {
                type: "CLUSTER.PERMISSIONS.EDIT",
                key: {clusterName, task: "permissionEdit"},
                payload: {type: "create"},
              }),
            ...permissionsToolbar.createPermission.mark,
          },
        ]}
        {...permissionsToolbar.mark}
      />

      <PageSection {...testMarks.cluster.mark}>
        <PermissionsTable />
      </PageSection>
    </>
  );
};
