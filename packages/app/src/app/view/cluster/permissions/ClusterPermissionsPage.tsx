import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {ClusterToolbar, TaskOpenArgs} from "app/view/share";

import * as task from "./task";
import {PermissionsTable} from "./PermissionsTable";

const {permissionsToolbar} = testMarks.cluster;

export const ClusterPermissionsPage = () => {
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
