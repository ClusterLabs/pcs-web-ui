import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {ClusterToolbar} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {PermissionsTable} from "./PermissionsTable";

const {permissionsToolbar} = testMarks.cluster;

export const ClusterPermissionsPage = () => {
  const {clusterName} = useLoadedCluster();
  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "create-permission",
            taskName: "permissionEdit",
            taskInitAction: {
              type: "CLUSTER.PERMISSIONS.EDIT",
              key: {clusterName, task: "permissionEdit"},
              payload: {type: "create"},
            },
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
