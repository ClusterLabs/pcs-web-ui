import {testMarks} from "app/view/dataTest";
import {LauncherDropdown} from "app/view/share";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";

const {toolbar} = testMarks.cluster.acl.currentRole;
const {dropdown} = toolbar;

export const RoleViewToolbar = ({roleId}: {roleId: string}) => {
  const {clusterName} = useLoadedCluster();

  return (
    <DetailToolbar
      buttonsItems={[
        {
          name: "assign-user",
          taskName: "aclSubjectAssign",
          taskInitAction: {
            type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN",
            key: {clusterName},
            payload: {subjectType: "user", roleId},
          },
          ...toolbar.assignUser.mark,
        },
        {
          name: "add-permissions",
          taskName: "aclRolePermissionAdd",
          ...toolbar.addPermissions.mark,
        },
      ]}
      dropdown={
        <LauncherDropdown
          items={[
            {
              name: "assign-group",
              taskName: "aclSubjectAssign",
              taskInitAction: {
                type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN",
                key: {clusterName},
                payload: {subjectType: "group", roleId},
              },
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
