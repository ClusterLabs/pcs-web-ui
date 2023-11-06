import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {ClusterToolbar} from "app/view/share";
import {useOpenTask} from "app/view/task";

import {useLoadedPermissions} from "./LoadedPermissionsContext";
import {PermissionsTable} from "./PermissionsTable";

const {permissionsToolbar} = testMarks.cluster;

export const ClusterPermissionsPage = () => {
  const {
    clusterName,
    permissions: {users_permissions: currentPermissionList},
  } = useLoadedPermissions();
  const openTask = useOpenTask();
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
                  currentPermissionList,
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
