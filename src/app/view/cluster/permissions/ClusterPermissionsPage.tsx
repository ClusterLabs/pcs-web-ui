import { ActionList, PageSection } from "@patternfly/react-core";

import { ActionTaskLauncher, ClusterSectionToolbar } from "app/view/share";

import * as task from "./task";
import { PermissionsTable } from "./PermissionsTable";

export const ClusterPermissionsPage = () => {
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionTaskLauncher
            taskComponent={task.add.PermissionTask}
            openArgs={[{ type: "create" }]}
            useTask={task.add.useTask}
            label="Create permission"
          />
        </ActionList>
      </ClusterSectionToolbar>

      <PageSection>
        <PermissionsTable />
      </PageSection>
    </>
  );
};
