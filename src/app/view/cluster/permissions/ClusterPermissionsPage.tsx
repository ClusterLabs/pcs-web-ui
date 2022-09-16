import { PageSection } from "@patternfly/react-core";

import { ClusterToolbar } from "app/view/share";

import * as task from "./task";
import { PermissionsTable } from "./PermissionsTable";

export const ClusterPermissionsPage = () => {
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
              openArgs: [{ type: "create" }],
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
