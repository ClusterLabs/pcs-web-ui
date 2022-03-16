import { ActionList, PageSection } from "@patternfly/react-core";

import { ActionTaskLauncher, ClusterSectionToolbar } from "app/view/share";

import * as taskAdd from "./task";
import { PermissionsTable } from "./PermissionsTable";

export const ClusterPermissionsPage = () => {
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionTaskLauncher
            taskComponent={taskAdd.PermissionTask}
            openArgs={[{ type: "create" }]}
            useTask={taskAdd.useTask}
            label="Create permission"
            data-test="permission-create"
          />
        </ActionList>
      </ClusterSectionToolbar>

      <PageSection>
        <PermissionsTable />
      </PageSection>
    </>
  );
};
