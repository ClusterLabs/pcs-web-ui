import {testMarks} from "app/view/dataTest";
import {LauncherDropdown} from "app/view/share";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/cluster/task";

const {toolbar} = testMarks.cluster.acl.currentRole;
const {dropdown} = toolbar;

export const RoleViewToolbar = ({roleId}: {roleId: string}) => {
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask(clusterName);

  return (
    <DetailToolbar
      buttonsItems={[
        {
          name: "assign-user",
          run: () =>
            openTask("aclSubjectAssign", {
              type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN",
              key: {clusterName},
              payload: {subjectType: "user", roleId},
            }),
          ...toolbar.assignUser.mark,
        },
        {
          name: "add-permissions",
          run: () => openTask("aclRolePermissionAdd"),
          ...toolbar.addPermissions.mark,
        },
      ]}
      dropdown={
        <LauncherDropdown
          items={[
            {
              name: "assign-group",
              run: () =>
                openTask("aclSubjectAssign", {
                  type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN",
                  key: {clusterName},
                  payload: {subjectType: "group", roleId},
                }),
              ...dropdown.assignGroup.mark,
            },
            {
              name: "delete-role",
              confirm: {
                title: "Delete role?",
                description: "This deletes the role",
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: {clusterName},
                  payload: {
                    taskLabel: `delete role "${roleId}"`,
                    call: {
                      name: "acl-remove-role",
                      payload: {role_id: roleId},
                    },
                  },
                },
              },
              ...dropdown.deleteRole.mark,
            },
          ]}
          {...dropdown.mark}
        />
      }
      {...toolbar.mark}
    />
  );
};
