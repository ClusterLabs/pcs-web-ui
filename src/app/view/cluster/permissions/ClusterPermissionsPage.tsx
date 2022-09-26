import { PageSection } from "@patternfly/react-core";

import { ClusterToolbar, TaskOpenArgs } from "app/view/share";

import * as task from "./task";
import { PermissionsTable } from "./PermissionsTable";

export const ClusterPermissionsPage = () => {
  const addOpenArgs: TaskOpenArgs<typeof task.add.useTask> = [
    { type: "create" },
  ];
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
