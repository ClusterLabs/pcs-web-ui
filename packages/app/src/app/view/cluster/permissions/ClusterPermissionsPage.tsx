import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {ClusterToolbar} from "app/view/share";
import {useOpenTask} from "app/view/cluster/task";

import {useLoadedPermissions} from "./LoadedPermissionsContext";
import {PermissionsTable} from "./PermissionsTable";

const {permissionsToolbar} = testMarks.cluster;

export const ClusterPermissionsPage = () => {
  const {clusterName} = useLoadedPermissions();
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
                payload: {
                  clusterName,
                  type: "create",
                },
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
